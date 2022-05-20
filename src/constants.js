export const initialNodes = [
  {
    id: 'original',
    type: 'customNode',
    data: {
      label: 'An input node',
      ports: { inputs: [{ id: 'a', top: 10, label: ''}], outputs: [] } },
    style: { border: '1px solid #777', padding: 10, backgroundColor: '#e66465' },
    position: { x: 0, y: 50 },
    sourcePosition: 'right',
  },
  {
    id: '2',
    type: 'customNode',
    data: {
      label: 'Input-output',
      ports: {
        inputs: [{ id: 'a', top: 10, label: '' }, { id: 'b', top: 20, label: ''}],
        outputs: [{ id: 'a', top: 10, label: '' }, { id: 'b', top: 20, label: ''}]
      }
    },
    style: { border: '1px solid #777', padding: 10, backgroundColor: '#00e836' },
    position: { x: 300, y: 50 },
    sourcePosition: 'right',
  },
  {
    id: '3',
    type: 'customNode',
    data: {
      label: 'Output A',
      ports: { inputs: [], outputs: [{ id: 'a', top: 10, label: ''}]},
    },
    style: { border: '1px solid #777', padding: 10, backgroundColor: '#3f7bfc' },
    position: { x: 650, y: 25 },
    targetPosition: 'left',
  },
  {
    id: '4',
    type: 'customNode',
    data: {
      label: 'Output B',
      ports: { inputs: [], outputs: [{ id: 'a', top: 10, label: ''}]},
    },
    style: { border: '1px solid #777', padding: 10, backgroundColor: '#f6b73c' },
    position: { x: 650, y: 100 },
    targetPosition: 'left',
  },
]

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#fff' },
  },
  {
    id: 'e2a-3',
    source: '2',
    target: '3',
    sourceHandle: 'a',
    animated: true,
    style: { stroke: '#fff' },
  },
  {
    id: 'e2b-4',
    source: '2',
    target: '4',
    sourceHandle: 'b',
    animated: true,
    style: { stroke: '#fff' },
  },
]
