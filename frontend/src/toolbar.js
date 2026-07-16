// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='api' label='API'/>
                <DraggableNode type='parser' label='Parser'/>
                <DraggableNode type='condition' label='Condition'/>
                <DraggableNode type='merge' label='Merge'/>
                <DraggableNode type='comment' label='Comment'/>
            </div>
        </div>
    );
};
