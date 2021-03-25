import React from 'react'
import { useArray, useMount } from 'utils'


export const TsReactTest = () => {
  const persons: {name: string, age: number}[] = [
    {name: 'jack', age: 26},
    {name: 'ma', age: 22}
  ]

  const {value, clear, removeIndex, add} = useArray(persons)

  return (
    <div>
      <button onClick={() => add({name: "john", age: 22})}>添加 john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clean</button>
      {
        value.map((person, index) => 
          <div>
            <span style={{color: 'red'}}>{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        )
      }
    </div>
  )
}