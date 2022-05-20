import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Modal = styled.div`
  display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  width: 30rem;
  height: max-content;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background-color: #fff;
`

const Ports = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Column = styled.div`
  width: 48%;
`

const PortInput = styled.input`
  width: 100%;
  margin: 0.3rem 0;
`

const PortsWrapper = styled.div`
  margin: 1rem 0 3rem;
`

const Button = styled.div`
  padding: 0.5rem;
  width: 100%;
  margin: 0.3rem 0;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 5rem;
`

const EditModal = ({ currentNode, isOpen, setIsOpen, setNodes }) => {
  const [nodeLabel, setNodeLabel] = useState('')
  const [nodeBgColor, setNodeBgColor] = useState('')
  const [inputs, setInputs] = useState([])
  const [outputs, setOutputs] = useState([])
  const [inputsLabels, setInputsLabels] = useState({})
  const [outputsLabels, setOutputsLabels] = useState({})

  useEffect(() => {
    if (Object.keys(currentNode).length) {
      setNodeLabel(currentNode?.data?.label)
      setNodeBgColor(currentNode?.style?.backgroundColor)
      setInputs(currentNode?.data?.ports?.inputs)
      setOutputs(currentNode?.data?.ports?.outputs)
    }
  }, [currentNode])

  const addPort = (typePorts, setPorts) => {
    if (typePorts.length < 3) {
      const newIndex = typePorts.length
      const ids = ['a', 'b', 'c']
      const id = ids[newIndex]
      const topPositions = [10, 20, 30]
      const top = topPositions[newIndex]

      setPorts((prev) => ([...prev, { id, top, label: '' }]))
    }
  }

  const updatePorts = (labels) => (prev) => prev.map((port) => (
    {
      ...port,
      label: labels[port.id],
    }
  ));

  const handleSaveClick = () => {
    setInputs(updatePorts(inputsLabels))
    setOutputs(updatePorts(outputsLabels))
    setIsOpen(false)
  }

  const handleLabelChange = (e) => {
    setNodeLabel(e.currentTarget.value)
  }

  const handleColorChange = (e) => {
    setNodeBgColor(e.currentTarget.value)
  }

  const handleRemove = () => {
    setNodes((nodes) => (
      nodes.filter((node) => (node.id !== currentNode.id && node.parentNode !== currentNode.id))
    ))
    setIsOpen(false)
  }

  const handlePortLabelChange = (e, setPorttypeLabels) => {
    setPorttypeLabels((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === currentNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: nodeLabel,
              ports: {
                inputs,
                outputs,
              }
            },
            style: {
              ...node.style,
              backgroundColor: nodeBgColor,
            },
          }
        }

        return node
      })
    )
  }, [isOpen, currentNode.id, setNodes, inputs, nodeBgColor, nodeLabel, outputs])

  const renderPortsList = (type) => {
    const parameters = type === "input" ? {
      entries: inputs,
      labels: inputsLabels,
      setLabels: setInputsLabels,
      addPort: () => addPort(inputs, setInputs),
    } : {
      entries: outputs,
      labels: outputsLabels,
      setLabels: setOutputsLabels,
      addPort: () => addPort(outputs, setOutputs),
    };

    return (
      <PortsWrapper>
        <label>
          {type} ports
        </label>
        {parameters.entries?.map(({ id }) => (
          <PortInput
            name={id}
            type="text"
            value={parameters.labels[id]}
            key={id}
            placeholder={`${type} label`}
            onChange={(e) => handlePortLabelChange(e, parameters.setLabels)}
          />
        ))}
        <Button bgColor="lightblue" onClick={parameters.addPort}>Add port</Button>
      </PortsWrapper>
    )
  }

  return (
    <Modal isOpen={isOpen}>
      <label>
        Choose color
      </label>
      <input
        type="color"
        onChange={handleColorChange}
        value={nodeBgColor}
      />
      <label>
        Label
      </label>
      <input
        type="text"
        onChange={handleLabelChange}
        value={nodeLabel}
      />
      <Ports>
        <Column>
          {renderPortsList("input")}
        </Column>
        <Column>
          {renderPortsList("output")}
        </Column>
      </Ports>
      <ButtonsWrapper>
        <Button onClick={handleRemove} bgColor="pink">Remove node</Button>
        <Button onClick={handleSaveClick} bgColor="lightgreen">Save</Button>
      </ButtonsWrapper>
    </Modal>
  )
}

export default EditModal
