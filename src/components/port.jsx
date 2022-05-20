import { useState } from 'react'
import styled from 'styled-components';
import { Handle } from 'react-flow-renderer'

const Tooltip = styled.div`
  position: absolute;
  left: 105%;
  background: white;
  border-radius: 0.2rem;
  white-space: nowrap;
  padding: 0.2rem;
`

const Port = ({ id, top, label, type, position }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  return (
    <Handle
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      type={type}
      position={position}
      id={id}
      style={{ top }}
      key={id}
      isConnectable
    >
      {isTooltipVisible && label && (<Tooltip>{label}</Tooltip>)}
    </Handle>
  );
}

export default Port;
