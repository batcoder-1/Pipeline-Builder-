from pydantic import BaseModel

class Node(BaseModel):
    id:str

class Edge(BaseModel):
    source:str
    target:str

class PipelineRequest(BaseModel):
   nodes:list[Node]
   edges:list[Edge]
    
class PipelineResponse(BaseModel):
    num_nodes:int
    num_edges:int
    is_dag:bool