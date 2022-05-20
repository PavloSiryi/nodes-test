import { useEffect, useCallback, useState, useRef } from 'react'
import styled from 'styled-components'
import ReactFlow, { ReactFlowProvider, useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'react-flow-renderer'
import Modal from './edit-modal'
import SideNavPanel from './side-nav-panel'
import { initialEdges } from '../constants'

import CustomNode from './custom-node'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`

const Container = styled.div`
  width: 100%;
  height: 100vh;
`

const Button = styled.button`
  display: ${({ isVisible }) => isVisible ? 'block' : 'none'};
  position: absolute;
  top: ${({ top = 2 }) => top}rem;
  left: 2rem;
  padding: 1rem;
  z-index: 10;
`

const GroupTooltip = styled.label`
  position: absolute;
  color: white;
  z-index: 1;
  left: 50%;
`

const initBgColor = '#1A192B'

const connectionLineStyle = { stroke: '#fff' }
const snapGrid = [20, 20]
const nodeTypes = {
  customNode: CustomNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`

let groupId = 0;
const getGroupId = () => `groupnode_${groupId++}`

const CustomNodeFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentNode, setCurrentNode] = useState({})
  const [isGroupButtonVisible, setIsGroupButtonVisible] = useState(false)
  const [selectedNodes, setSelectedNodes] = useState([])

  useEffect(() => {
    setEdges(initialEdges)
  }, [setEdges])


  const onConnect = useCallback(
    (params) => setEdges((eds) =>
      addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    [setEdges]
  );

  const handleClick = (e, node) => {
    setCurrentNode(node)
    setIsModalOpen(true)
  }

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const node = JSON.parse(event.dataTransfer.getData('application/reactflow'))

      if (typeof node === 'undefined' || !node) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode = {
        ...node,
        id: getId(),
        position,
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  const handleSelect = (data) => {
    setIsGroupButtonVisible(Boolean(data.nodes.length > 1))
    setSelectedNodes(data.nodes)
  }

  const addNodesToGroup = () => {
    const selectionRect = document.querySelector('.react-flow__nodesselection-rect')
    const width = selectionRect.offsetWidth + 20
    const height = selectionRect.offsetHeight + 38 + 10
    const top = +window.getComputedStyle(selectionRect).top.slice(0, -2)
    const left = +window.getComputedStyle(selectionRect).left.slice(0, -2)
    const currentGroupId = getGroupId()

    const filterByReference = (prev, selected) => prev.filter(el => {
      return !selected.find(element => {
        return element.id === el.id;
      });
    }) || [];

    setNodes((prevNodes) => (
      [
        ...filterByReference(prevNodes, selectedNodes),
        {
          id: currentGroupId,
          type: 'customNode',
          data: {
            label: 'New group',
            ports: {
              inputs: [{ id: 'a', top: 10, label: '' }],
              outputs: [{ id: 'a', top: 10, label: '' }],
            },
          },
          position: { x: left, y: top },
          style: { backgroundColor: '#f5f3f3', opacity: 0.3, width, height }
        },
        ...selectedNodes.map((node) => (
          {
            ...node,
            parentNode: currentGroupId,
            position: { x: node.position.x - left + 10, y: node.position.y - top + 38 }
          }
        ))
      ]
    ))

    setIsGroupButtonVisible(false)
  }

  const deployToConsole = () => {
    const data = JSON.stringify(nodes);
    console.log(data)
  }

  return (
    <Wrapper>
      <ReactFlowProvider>
        <SideNavPanel />
        <Container ref={reactFlowWrapper}>
          <GroupTooltip>Press "Shift" and then select nodes with mouse to group them</GroupTooltip>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            style={{ background: initBgColor }}
            nodeTypes={nodeTypes}
            connectionLineStyle={connectionLineStyle}
            snapToGrid={true}
            snapGrid={snapGrid}
            defaultZoom={1.5}
            fitView
            attributionPosition="bottom-left"
            onNodeClick={handleClick}            
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={handleSelect}
          >
            <Modal isOpen={isModalOpen} currentNode={currentNode} setIsOpen={setIsModalOpen} setNodes={setNodes} />
            <Button isVisible={isGroupButtonVisible} onClick={addNodesToGroup} type="button" top={6}>
              Add nodes to group
            </Button>
            <Button isVisible={!!nodes.length} top={2} type="button" onClick={deployToConsole}>
              Deploy to console
            </Button>
            <MiniMap />
            <Controls />
          </ReactFlow>
        </Container>
      </ReactFlowProvider>
    </Wrapper>
  )
}

export default CustomNodeFlow
