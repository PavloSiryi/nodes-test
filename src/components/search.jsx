import { useEffect, useState } from 'react'
import { initialNodes } from '../constants'

const Search = ({ setNodes }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    if (value) {
      const filteredNodes = initialNodes.filter((node) => (
        node.data.label.toLowerCase().includes(value.toLowerCase())
      ))
  
      setNodes(filteredNodes)
    } else {
      setNodes(initialNodes)
    }
  }, [value])

  return (
    <input type="text" value={value} onChange={handleChange} placeholder="Search node" />
  )
}

export default Search
