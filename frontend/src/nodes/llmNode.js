// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
export const LLMNode = ({ id, data }) => {

  return (
<BaseNode
id={id}
title={"LLM"}
handles={
[
{
  type:"target",
  position:Position.Left,
  id_suffix:"system"
},
{
type:"target",
position:Position.Left,
id_suffix:"prompt"
},
{
  type:"source",
  position:Position.Right,
  id_suffix:"response"
}
]
}
> 
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
