[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&repo=lucas-fochesatto%2Fmccarren-challenge&ref=main&devcontainer_path=.devcontainer%2Fdevcontainer.json)

# McCarren Code Challenge

Welcome! This repository contains my solution to the **McCarren Code Challenge**, fully containerized with **Dev Containers** and **Docker Compose**. It features a modular, scalable architecture with a streamlined automation workflow powered by **n8n**.

---

## 🔧 Prerequisites

To run this project, you’ll need either:

* [**GitHub Codespaces**](https://github.com/features/codespaces) (recommended)
  **OR**
* **Docker** (v20+)
* **Visual Studio Code** with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

---

## 🚀 Getting Started in Codespaces

1. Click the **"Open in Codespaces"** badge above.
2. Wait for your Codespace to initialize and build the containers.
3. All necessary ports (8001, 5678, 5173, 80) will be forwarded automatically. Access the app via port **80**.

> 💡 **Tip:** Be sure to add your OpenAI key under
> **Repository → Settings → Secrets → Actions** as `OPENAI_API_KEY`.

---

## 🏠 Running Locally (Dev Container)

If you prefer local development:

1. Clone the repository:

   ```bash
   git clone https://github.com/lucas-fochesatto/mccarren-challenge.git
   cd mccarren-challenge
   ```

2. Create a `.env` file inside the `.devcontainer/` directory using the provided `.env.example` as a template.

3. In VS Code, press `Ctrl + Shift + P`, then select **“Dev Containers: Reopen in Container”**. This will spin up all services.

4. Once inside the container, press `Ctrl + Shift + P` and run:

   * **Run Server API**
   * **Run Frontend**

5. Access the services:

   * **Frontend** → [http://localhost](http://localhost)
   * **Backend API** → [http://localhost/api/](http://localhost/api/)

---

## 🧰 VS Code Tasks

Inside the Dev Container, you can use predefined VS Code tasks to run the app servers:

1. Press `Ctrl + Shift + P` → **Tasks: Run Task**
2. Select one of the following:

   * **Run Server API** → Starts the backend (`python3 server.py`)
   * **Run Frontend** → Launches the frontend (`npm run dev`)

---

## 🏗 Architecture Overview

Services configured via Docker Compose:

| Service    | Description                                             | Port |
| ---------- | ------------------------------------------------------- | ---- |
| `dev`      | Main development container (Python + Node)              | —    |
| `n8n`      | Automation tool for scraping and OpenAI-based workflows | 5678 |
| `postgres` | Database used by n8n                                    | 5432 |
| `pgweb`    | Web UI to inspect PostgreSQL data                       | 8081 |
| `nginx`    | Reverse proxy for routing frontend and API requests     | 80   |

---

## 📁 Project Structure

```
.
├── .devcontainer/       # Dev Container & Codespaces config (incl. Nginx)
├── app/                 # Backend (Python: FastAPI or Flask)
│   ├── server.py        # API entrypoint
│   ├── adapters/        # Interfaces to external systems (e.g. n8n)
│   └── services/        # Core business logic
├── frontend/            # Web client (React + Vite + TailwindCSS)
└── n8n/                 # n8n workflow JSON exports & scripts
```

This project follows the [Plumbing and Intelligence](https://tonylampada.github.io/plumbing-and-intelligence/) architecture pattern, keeping domain logic decoupled from external interfaces.

---

## 🔄 Request Lifecycle

1. The **user** accesses the React frontend.
2. The frontend sends a request to the **backend API** (`/api/company-profile`).
3. The backend forwards the request to **n8n** via its HTTP API.
4. n8n uses your `OPENAI_API_KEY` to gather and generate the company profile.
5. The result is returned to the backend, then served to the frontend as JSON.