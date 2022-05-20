import { Position } from 'react-flow-renderer'
import Port from '../components/port'

const CustomNode = ({ data, style }) => {
  return (
    <div className="text-updater-node" style={style}>
      {data.ports?.outputs?.map((props) => (
        <Port {...props} type="target" position={Position.Left}  />
      ))}
      <div>
        <label htmlFor="text">{data.label}</label>
      </div>
      {data.ports?.inputs?.map((props) => (
        <Port {...props} type="source" position={Position.Right}  />
      ))}
    </div>
  );
}

export default CustomNode;
