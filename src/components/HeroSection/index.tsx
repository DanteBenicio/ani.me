import React, { useState } from 'react'
import Filter from '../Filter'

export default function HeroSection() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  console.log(selectedFilter)

  return (
    <section className="py-8">
      <Filter 
        setSelectedFilter={setSelectedFilter}
      />
    </section>
  )
}
