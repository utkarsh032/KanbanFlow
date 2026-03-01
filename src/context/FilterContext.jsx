import { useState } from 'react'
import { FilterContext } from './FilterContextValue'

export const FilterProvider = ({ children }) => {
  const [selectedPriority, setSelectedPriority] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const togglePriority = priority => {
    setSelectedPriority(prev => (prev === priority ? null : priority))
  }

  const toggleStatus = status => {
    setSelectedStatus(prev => (prev === status ? null : status))
  }

  const clearFilters = () => {
    setSelectedPriority(null)
    setSelectedStatus(null)
    setSearchQuery('')
  }

  const value = {
    selectedPriority,
    setSelectedPriority,
    togglePriority,
    selectedStatus,
    setSelectedStatus,
    toggleStatus,
    searchQuery,
    setSearchQuery,
    clearFilters
  }

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}
