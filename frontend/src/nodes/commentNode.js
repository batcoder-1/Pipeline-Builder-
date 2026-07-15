import { useState } from "react";
import { BaseNode } from "./baseNode";
export const CommentNode=(id,data)=>{
    const [comment,setComment]=useState("")
    const handleCommentChange=(e)=>{
        setComment(e.target.value)
    }
return(
    <BaseNode
    id={id}
    title="Comment"
    handles={[]}
    >
        <div>
        <textarea
        rows={5}
        value={comment}
        onChange={handleCommentChange}
        placeholder="Enter comments....."
        />
    </div>
    </BaseNode>
)
}