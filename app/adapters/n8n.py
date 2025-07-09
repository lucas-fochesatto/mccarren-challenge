# Whenever communicating with n8n, it must be done through this adapter
# no other file should know how to communicate with n8n

import httpx
from urllib.parse import urljoin

BASE_URL = "http://n8n:5678"

async def trigger_workflow(path, data: dict = None):
    url = urljoin(BASE_URL, f"/{path}")
    timeout = 120  

    if not isinstance(data, dict):
        raise ValueError("`data` must be a dictionary.")
    
    async with httpx.AsyncClient(timeout=httpx.Timeout(timeout)) as client:
        try:
            response = await client.post(url, json=data)
            response.raise_for_status()  # Levanta erro se a resposta for ruim
            return response.json()  # Retorna a resposta JSON do webhook
        except httpx.RequestError as exc:
            raise Exception(f"Erro na requisição: {exc}")
        except httpx.HTTPStatusError as exc:
            raise Exception(f"Erro de status HTTP: {exc}")