// textNode.js

import { useState } from 'react';
import {  Position } from 'reactflow';
import { BaseNode } from './baseNode';
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
    id={id}
    title={"Text"}
    handles={[{type:"source",position:Position.Right,id_suffix:"output"}]}
    >
      <div>
        <label>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange} 
          />
        </label>
      </div>
    </BaseNode>
  );
}
