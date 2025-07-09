# McCarren Code Challenge

Welcome! This repository contains the solution to the McCarren code challenge. It includes a full development environment, powered by **Dev Containers**, and an architecture designed for modularity, scalability, and clarity.

---

## Opening the Project in VS Code

To run this project in the same environment as the author:

1. Make sure you have **Docker** and **VS Code** installed.
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
3. Open this repository in VS Code.
4. When prompted, select **"Reopen in Container"**.

This will spin up a ready-to-use environment with everything pre-configured.

---

## Running the Project

Two tasks are available to quickly start the backend and frontend.

### Option 1: Using VS Code tasks

1. Press `Ctrl + Shift + P`
2. Type **"Tasks: Run Task"**
3. Choose:

   * **Run Server API** to start the backend
   * **Run Frontend** to start the frontend

### Option 2: Using the terminal

**To run the backend:**

```bash
cd app
python3 server.py
```

**To run the frontend:**

```bash
cd frontend
npm install
npm run dev
```

---

## Dev Container Architecture

When opening the dev container, the following services are automatically started:

* **dev** – Main development container (Python + Node)
* **n8n** – Workflow automation tool, used to orchestrate scraping and GPT processing
* **Postgres** – Relational database used by n8n
* **pgweb** – Web interface to inspect the database

---

## Project Structure

### `app/`

Contains the entire backend logic.
The entry point is:

* **`server.py`** – Routes incoming HTTP requests, performs basic validation, and delegates business logic to services.

#### `app/adapters/`

Responsible for external service communication.

* **`n8n.py`** – Only file allowed to interact with the n8n server.

#### `app/services/`

Contains all business logic. Services are decoupled from infrastructure and only use adapters to talk to the outside world.

This structure is inspired by the **Plumbing and Intelligence** architecture:
[https://tonylampada.github.io/plumbing-and-intelligence/](https://tonylampada.github.io/plumbing-and-intelligence/)

---

## How It Works

1. The **Frontend** sends a request to the **Backend**.
2. The backend validates it and forwards the request to **n8n**.
3. **n8n**:
   * Uses **GPT** to perform scraping of the requested company.
   * Constructs a company profile card.
4. The result is returned as a JSON response to the **Backend**.
5. The **Backend** passes this result back to the **Frontend**, where it is rendered.