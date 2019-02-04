import React, {useState} from 'react'

export default function Index() {
  const [counter, setCounter] = useState(0)

  return (
    <h1>
      Counter: {counter}{' '}
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </h1>
  )
}
