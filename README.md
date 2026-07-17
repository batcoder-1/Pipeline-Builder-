# VectorShift Pipeline Builder

> Technical assessment submission for the VectorShift Pipeline Builder assignment.

An interactive pipeline builder for visually composing directed workflows using **React Flow** and validating them through a lightweight **FastAPI** backend.

The application is divided into two independent parts:

- **Frontend** – React + React Flow based visual pipeline editor
- **Backend** – FastAPI service that validates whether the submitted graph is a Directed Acyclic Graph (DAG)

# Features

### Frontend

- Drag-and-drop pipeline editor
- Interactive graph creation using React Flow
- Custom reusable node abstraction (`BaseNode`)
- Five additional custom node types
- Dynamic handle generation for Text nodes
- Automatic removal of invalid edges when handles disappear
- Dark themed UI

### Backend

- FastAPI REST API
- Request validation using Pydantic
- DAG validation using Kahn's Algorithm
- Returns graph metadata
  - Number of nodes
  - Number of edges
  - DAG status

---

# Architecture

```
                React Flow Canvas
                        │
                        ▼
              Nodes + Edges State
                        │
                        ▼
          POST /pipelines/parse
                        │
                        ▼
                  FastAPI Backend
                        │
                        ▼
             Build Adjacency List
                        │
                        ▼
               Kahn's Algorithm
                        │
                        ▼
                 Validation Result
                        │
                        ▼
               Update Frontend UI
```

The frontend is responsible only for user interaction and graph editing, while the backend owns all graph analysis logic. This separation keeps the UI lightweight and the validation logic independently testable.

---

# BaseNode Abstraction

One of the primary goals of the frontend implementation was eliminating duplicated code across all node components.

A reusable **BaseNode** component was introduced to encapsulate all common functionality.

The BaseNode is responsible for:

- Common layout
- Shared styling
- Dynamic handle creation
- Rendering custom content

Individual nodes simply provide configuration such as:

- Node title
- Styling
- Handle descriptors
- Custom JSX content

This makes creating additional node types straightforward while keeping the codebase maintainable.

---

# Additional Nodes

To demonstrate that the abstraction scales beyond the starter nodes, five additional nodes were implemented.

- API Node
- Parser Node
- Condition Node
- Merge Node
- Comment Node

Each node reuses the same BaseNode abstraction while exposing different layouts and handle configurations.

---

# Dynamic Text Node

The Text node dynamically generates handles whenever variables enclosed inside `{{ }}` are detected.

Example

```text
Hello {{name}}

Your college is {{college}}
```

Automatically creates two input handles:

- `name`
- `college`

Implementation overview:

- Variables are extracted using Regular Expressions.
- Duplicate variables are removed using a Set.
- Handle descriptors are generated dynamically.
- BaseNode renders the new handles automatically.

---

# Edge Pruning

An interesting edge case occurs when a variable is removed from the Text node.

Without additional handling:

- Variable disappears
- Handle disappears
- Edge connected to that handle still exists

This leaves the graph in an inconsistent state.

To solve this, a **pruneEdges()** function was added to the Zustand store.

Whenever valid handles change:

- Invalid handles are detected
- Edges connected to invalid handles are removed automatically

This keeps the graph consistent at all times.

---

# Graph Validation

The backend validates the submitted graph using **Kahn's Algorithm**.

Validation steps:

1. Receive nodes and edges.
2. Build an adjacency list.
3. Compute indegree for every node.
4. Process zero-indegree nodes.
5. Reduce indegrees of adjacent nodes.
6. If every node is processed, the graph is a DAG.

The backend returns:

```json
{
  "num_nodes": 6,
  "num_edges": 5,
  "is_dag": true
}
```

---

# Tech Stack

### Frontend

- React 18
- React Flow
- Zustand

### Backend

- FastAPI
- Pydantic
- Uvicorn

---

# Project Structure

```text
backend/
  main.py         # FastAPI application
  models.py       # Request / Response schemas
  service.py      # DAG validation (Kahn's Algorithm)

frontend/
  src/
    nodes/
      baseNode.js
      inputNode.js
      outputNode.js
      textNode.js
      llmNode.js
      apiNode.js
      parserNode.js
      mergeNode.js
      conditionNode.js
      commentNode.js
    ui.js            # React Flow canvas
    submit.js        # API request
    store.js         # Zustand store
```

---

# Local Setup

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload --port 8000
```

---

## Frontend

```bash
cd frontend

npm install

npm start
```

Open

```
http://localhost:3000
```

---

# API

## GET /

Health Check

Response

```json
{
  "Ping": "Pong"
}
```

---

## POST /pipelines/parse

Validates the submitted pipeline graph.

Example Request

```json
{
  "nodes": [
    {
      "id": "node-1"
    }
  ],
  "edges": [
    {
      "source": "node-1",
      "target": "node-2"
    }
  ]
}
```

Example Response

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

---

# Notes for Reviewers

- Backend accepts requests from `http://localhost:3000`.
- The frontend submits graphs to `POST /pipelines/parse`.
- The implementation intentionally separates UI rendering from graph validation logic.
- Dynamic Text nodes automatically generate and remove handles based on detected variables.
- Invalid edges are automatically pruned to maintain graph consistency.

---
