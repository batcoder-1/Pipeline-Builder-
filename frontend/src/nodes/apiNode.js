import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";
export const ApiNode=({id,data})=>{
    const [currUrl,setCurrUrl]=useState("")
    const [currMethod,setCurrMethod]=useState("GET")

    const handleUrlChange=(e)=>{
        setCurrUrl(e.target.value);
    }
    const handleMethodChange=(e)=>{
        setCurrMethod(e.target.value)
    }
    return(
    <BaseNode
    id={id}
    title={"API"}
    category="processing"
    handles={
    [
        {
            type:"source",
            position:Position.Right,
            id_suffix:"response"
        },
        {
            type:"target",
            position:Position.Left,
            id_suffix:"request"
        }
    ]
    }
    >
        <div>
    <label>
    URL:
    <input
    type="url"
    value={currUrl}
    onChange={handleUrlChange}
    />
    </label>
    <label>
    Method:
    <select value={currMethod} onChange={handleMethodChange}>
    <option value="GET">GET</option>
    <option value="POST">POST</option>
    </select>
    </label>
    </div>
    </BaseNode>
    )
}