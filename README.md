# Smart-Forestry

Smart-Forestry is a comprehensive platform for forest management and monitoring, featuring a Django backend and a Next.js frontend.

## Features

- **Backend**: Django-based REST API for data management.
- **Frontend**: Modern, responsive interface built with Next.js and Tailwind CSS.
- **Management**: Unified dashboard for admins and users.

## How to Run

To start both the backend and frontend simultaneously, use the provided `run.py` script:

```bash
python run.py
```

### Prerequisites

- Python 3.x
- Node.js & npm

### Development

#### Backend
```bash
cd backend
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm run dev
```

## Deployment

This project is configured for easy deployment on [Render](https://render.com/).

### Option 1: Using Blueprints (Automated)

1. Connect your GitHub repository to Render.
2. Render will automatically detect the `render.yaml` file.
3. Follow the prompts to deploy both the backend and frontend.

### Option 2: Manual Deployment

If you want to deploy services separately:

#### Backend (Django)
- **Service Type**: Web Service
- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python manage.py runserver 0.0.0.0:$PORT` (For production, use `gunicorn`)

#### Frontend (Next.js)
- **Service Type**: Web Service
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

## License

All rights reserved.
