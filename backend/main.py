from fastapi import FastAPI
from backend.models import PipelineRequest,PipelineResponse
from backend.service import check_dag
app = FastAPI()

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse'
          ,response_model=PipelineResponse)
def parse_pipeline(pipelineRequest:PipelineRequest):
    response=check_dag(pipelineRequest.nodes,pipelineRequest.edges)
    return response
