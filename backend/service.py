from collections import deque
def check_dag(nodes,edges):
    num_nodes=len(nodes)
    num_edges=len(edges)
    adj_list={}
    indegree={}
    queue=deque()
    for node in nodes:
        adj_list[node.id]=[]
        indegree[node.id]=0
    
    for edge in edges:
       adj_list[edge.source].append(edge.target)
       indegree[edge.target]+=1
    
    for node in nodes:
        if indegree[node.id]==0:
            queue.append(node.id)
     
    visited=0
    
    while queue:
        node=queue.popleft()
        visited+=1
        
        for i in adj_list[node]:
            indegree[i]-=1
            if indegree[i]==0:
                queue.append(i) 
                
    is_dag=(visited==num_nodes)
    return{
        "num_nodes":num_nodes,
        "num_edges":num_edges,
        "is_dag":is_dag
    }