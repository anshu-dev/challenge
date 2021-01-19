import React from 'react'
import ReactDOM from 'react-dom'

//import Hello from './Hello';
import Image from './image'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Image />,
    document.body.appendChild(document.createElement('div'))
  )
})
