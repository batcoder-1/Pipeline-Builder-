        import { Handle,Position } from "reactflow"

        const CATEGORY_COLORS = {
            input: 'var(--color-input)',
            processing: 'var(--color-processing)',
            control: 'var(--color-control)',
            annotation: 'var(--color-annotation)',
        };
        
        export const BaseNode = ({ id, title, handles, children, style, category = "processing" }) => {
            return(
            <div className="base-node" style={{ '--node-accent': CATEGORY_COLORS[category],...style }}>
                <div>
                    <span className="base-node-title">{title}</span>
                </div>
            {handles.map((handle,idx)=>{
                const same_side=handles.filter(h=>h.position==handle.position)
                const i=same_side.indexOf(handle)
                const top = ((i + 1) / (same_side.length + 1)) * 100;
                return(
                    <div key={`${id}-${handle.id_suffix}`} className="base-node-handle-item">
                        <Handle
                        type={handle.type}
                        position={handle.position}
                        style={{top:`${top}%`}}
                        id={`${id}-${handle.id_suffix}`}
                        />
                        {handle.position === Position.Left ? (
                            <span className="base-node-handle-label" style={{ top: `${top}%` }}>
                                {handle.id_suffix}
                            </span>
                        ) : null}
                    </div>
                )
            })}
            <div className="base-node-body">{children}</div>
            </div>
            );
            }