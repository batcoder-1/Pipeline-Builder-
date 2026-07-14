from fastapi import FastAPI
from backend.models import PipelineRequest,PipelineResponse
from backend.service import check_dag
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET","POST"],
    allow_headers=["*"]
)
@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse'
          ,response_model=PipelineResponse)
def parse_pipeline(pipelineRequest:PipelineRequest):
    response=check_dag(pipelineRequest.nodes,pipelineRequest.edges)
    return response
