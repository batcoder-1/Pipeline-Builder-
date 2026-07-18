// textNode.js

import { useState,useRef,useEffect} from 'react';
import {  Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore as useAppStore } from '../store';
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeSize, setNodeSize] = useState({ width: 320, height: 140 });
  const textareaRef = useRef(null)
  const [variableHandle,setVariableHandle]=useState([])
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
    const measured = textareaRef.current.scrollHeight;
    const nextHeight = Math.min(600, Math.max(120, measured + 40));

    textareaRef.current.style.height = `${nextHeight - 40}px`;
    textareaRef.current.style.overflowY = measured + 40 > 600 ? 'auto' : 'hidden';

    setNodeSize({ width: 320, height: nextHeight });
  }
}, [currText]);
useEffect(()=>{
const regex = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g
const matches=[...currText.matchAll(regex)]
const variables=new Set()
for(const match of matches){
  variables.add(match[1])
}
const variablesArray=[...variables]
const newVarHandles=variablesArray.map(
  v=>
    ({
      type:"target",
      position:Position.Left,
      id_suffix:v
    })
)
const allHandles=[...newVarHandles,{type:"source",position:Position.Right,id_suffix:"output"}]
setVariableHandle(allHandles)
const validHandles=allHandles.map(h=>`${id}-${h.id_suffix}`)
useAppStore.getState().pruneEdges(id, validHandles)
},[currText,id])
  return (
    <BaseNode
    id={id}
    title={"Text"}
    category="annotation"
    handles={variableHandle}
    style={nodeSize}
    >
      <div className="text-node-body">
        <label>
          Text:
         <textarea
         ref={textareaRef}
         value={currText}
         onChange={handleTextChange}
         placeholder="Enter text....."
         rows={5}
         style={{
       width: '100%',
       display: 'block',
       overflow: 'hidden',
       boxSizing: 'border-box',
       resize: 'none',
       whiteSpace: 'pre-wrap',
       overflowWrap: 'anywhere',
        }}
         />
        </label>
      </div>
    </BaseNode>
  );
}
