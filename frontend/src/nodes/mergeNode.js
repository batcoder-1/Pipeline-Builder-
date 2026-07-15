import { Position } from "reactflow";
import { BaseNode } from "./baseNode";
export const MergeNode=(id,data)=>{
return(
<BaseNode
id={id}
title={"Merge"}
handles={
    [
        {
          type:"source",
          position:Position.Right,
          id_suffix:"mergedOuput"  
        },
        {
            type:"target",
            position:Position.Left,
            id_suffix:"input1"
        },
        {
            type:"target",
            position:Position.Left,
            id_suffix:"input2"
        },
        {
            type:"target",
            position:Position.Left,
            id_suffix:"input3"
        } 
    ]
}
/>
)
}