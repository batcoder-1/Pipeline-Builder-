// textNode.js

import { useState,useRef,useEffect} from 'react';
import {  Position } from 'reactflow';
import { BaseNode } from './baseNode';
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 80 });
  const textareaRef=useRef(null)
  const [variableHandle,setVariableHandle]=useState([])
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

useEffect(() => {
  const lines = currText.split('\n');
  const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);

  const nextWidth = Math.min(500, Math.max(200, 160 + longestLine * 8));
  const nextHeight = Math.min(400, Math.max(80, 44 + lines.length * 24));

  setNodeSize({ width: nextWidth, height: nextHeight });

  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }
}, [currText]);
useEffect(()=>{
const regex=/\{\{(\w+)\}\}/g
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
},[currText])
  return (
    <BaseNode
    id={id}
    title={"Text"}
    category="annotation"
    handles={variableHandle}
    style={nodeSize}
    >
      <div>
        <label>
          Text:
         <textarea
         ref={textareaRef}
         value={currText}
         onChange={handleTextChange}
         placeholder="Enter text....."
        style={{
       width: '100%',
       height: '100%',
       overflow: 'hidden',
       boxSizing: 'border-box',
       resize: 'none',
        }}
         />
        </label>
      </div>
    </BaseNode>
  );
}
