// submit.js
import { useStore} from "./store"
import { shallow } from 'zustand/shallow'
import {selector} from './ui'
export const SubmitButton = () => {
const {
    nodes,
    edges
}= useStore(selector,shallow)

const handleSubmit =async()=>{
 const response =await fetch('http://localhost:8000/pipelines/parse', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ nodes: nodes, edges: edges }),
})
const data=await response.json()
console.log(data.num_edges)
alert(`
    Node:${data.num_nodes}
    Edges:${data.num_edges}
    Is_DAG:${data.is_dag}
       `)
}
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
