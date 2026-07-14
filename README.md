# VectorShift Pipeline Builder

## Structure
- `frontend/` — React + React Flow pipeline builder UI
- `backend/` — FastAPI service for pipeline parsing (DAG validation)

## Setup
## Backend setup
python -m venv venv
source venv/bin/activate      # or venv\Scripts\activate on Windows
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload

## Notes
_TODO: architectural decisions, trade-offs for walkthrough_
