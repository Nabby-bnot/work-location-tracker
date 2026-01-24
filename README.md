# Work Location Tracker

## What this project is about

Work Location Tracker is a simple application to record and manage daily work location entries — **WFO (Work From Office)** or **WFH (Work From Home)** — using a clean separation between frontend, backend, and database.

The project is built incrementally, starting with a backend-first approach.

---

## Project Structure

work-location-tracker/
├── backend/
├── frontend/
└── README.md

---

## Backend Setup

### Install dependencies

```bash
cd backend
bun install
```

### Setup environment variables

Create a .env file inside the backend folder:

PORT=4000
DATABASE_URL=postgres://<user>:<password>@localhost:<port>/<database>

### Run backend

bun run dev

## Frontend setup

### Install dependencies

cd frontend
bun install

### Run frontend

bun run dev

---
