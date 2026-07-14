        import { Handle,Position } from "reactflow"
        
        export const BaseNode = ({ id, title, handles, children }) => {
            return(
            <div style={{width: 200, height: 80, border: '1px solid black'}}>
                <div>
                    <span>{title}</span>
                </div>
            {handles.map((handle,idx)=>{
                const same_side=handles.filter(h=>h.position==handle.position)
                const i=same_side.indexOf(handle)
                const top = ((i + 1) / (same_side.length + 1)) * 100;
                return(
                    <Handle
                    key={`${id}-${handle.id_suffix}`}
                    type={handle.type}
                    position={handle.position}
                    style={{top:`${top}%`}}
                    id={`${id}-${handle.id_suffix}`}
                    />
                )
            })}
            {children}
            </div>
            );
            }