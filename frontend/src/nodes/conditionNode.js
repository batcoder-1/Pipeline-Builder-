import { Position } from "reactflow";
import { BaseNode } from "./baseNode";
export const ConditionNode=({ id, data })=>{
return(
<BaseNode
id={id}
title={"Condition"}
category="control"
handles={
[
{
    type:"target",
    position:Position.Left,
    id_suffix:"input"
},
{
    type:"source",
    position:Position.Right,
    id_suffix:"outputTrue"
},
{
    type:"source",
    position:Position.Right,
    id_suffix:"ouputFalse"
}
]
}
/>
)
}