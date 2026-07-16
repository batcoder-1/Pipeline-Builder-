import { useState } from "react";
import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
export const ParserNode=(id,data)=>{
const [outputFormat,setOutputFormat]=useState("text")

const handleOutputFormatChange=(e)=>{
    setOutputFormat(e.target.value)
}
return (
    <BaseNode
    id={id}
    title={"Parser"}
    category="processing"
    handles={
        [
            {
                type:"source",
                position:Position.Right,
                id_suffix:"inputData"
            },
            {
                type:"target",
                position:Position.Left,
                id_suffix:"outputData"
            }
        ]
    }
    >
    <div>
    <label>
    Output Format:
    <select value={outputFormat} onChange={handleOutputFormatChange}>
    <option value="text">Text</option>
    <option value="CSV">CSV</option>
    <option value="JSON">JSON</option>
    </select>
    </label>
    </div>
    </BaseNode>
)
}