from fastapi import FastAPI, Request
from urllib.parse import urlparse

app = FastAPI(
    title="Server",
    description="API for internal services",
    version="1.0.0"
)

@app.get("/")
async def root():
    return {"message": "Welcome to Server API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8001,
        reload=True
    )
