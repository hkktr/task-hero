# TaskHero.API
## Backend
To run the backend, you'll need to install and start Docker.
With the Docker Engine running, execute the following commands:

1. `cd backend/TaskHero`
2. `docker compose up`

The backend will be available on `https://localhost:7217`.

Make sure your OS/browser trust the cert located in `backend/TaskHero/TaskHero.Api/aspnetapp.pfx`.

## Frontend
To run the frontend, make sure the backend is already running, then execute the following commands:

1. `cd frontend`
2. `npm install`
3. `npm run dev`

The app will be available on `http://localhost:5173`.
