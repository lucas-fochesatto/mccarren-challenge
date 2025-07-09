from adapters import n8n

async def exctract_website_info(url, model):
    data = {"url": url, "model": model}
    response = await n8n.trigger_workflow('webhook/company-profile', data)

    return response