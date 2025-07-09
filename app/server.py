from fastapi import FastAPI, Request
from urllib.parse import urlparse
from services import companyprofilesvc

app = FastAPI(
    title="Server",
    description="API for public services",
    version="1.0.0"
)

@app.get("/api/")
async def root():
    return {"message": "Welcome to Server API"}

@app.post("/api/company-profile")
async def company_profile(request: Request):
    data = await request.json()
    website_url = data.get("url")
    model = data.get("model")

    result = urlparse(website_url)
    if not all([result.scheme, result.netloc]):
        return {"status": "Invalid URL"}

    if model not in ["gpt-4.1-mini", "gpt-4.1", "gpt-4o-mini", "o3-mini"]:
        return {"status": "Invalid model"}

    response = await companyprofilesvc.exctract_website_info(website_url, model)

    return response


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8001,
        reload=True
    )
