import { useState } from 'react'
import styled from 'styled-components'
import Search from './search'
import { initialNodes } from '../constants';

const NavPanel = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 100vh;
  width: 20rem;
  gap: 2rem;
  background-color: lightgrey;
`

const Nodes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  gap: 1rem;
`

let id = 0;
const getId = () => `newpanelnode_${id++}`

const SideNavPanel = () => {
  const [panelNodes, setPanelNodes] = useState(initialNodes)
  const addNode = () => {
    setPanelNodes(prev => [
      ...prev,
      {
        id: getId(),
        type: 'input',
        data: { label: 'New node' },
        style: { border: '1px solid #777', padding: 10, backgroundColor: '#e664e6' },
        position: { x: 0, y: 50 },
        sourcePosition: 'right',
      },
    ])
  }

  const onDragStart = (event, node) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <NavPanel>
      <Search setNodes={setPanelNodes} />
      <button onClick={addNode}>Create new node</button>
      <Nodes>
        {panelNodes.map((node) => (
          <div
            key={node.id}
            style={node.style}
            onDragStart={(event) => onDragStart(event, node)}
            draggable
          >
            {node.data.label}
          </div>
        ))}
      </Nodes>
    </NavPanel>
  )
}

export default SideNavPanel
