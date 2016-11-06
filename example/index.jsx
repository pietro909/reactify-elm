import ReactDOM from 'react-dom'
import React from 'react'
import reactify from 'reactify-elm'
import { ElmApp } from './ElmApp'

const ReactComponent = reactify(ElmApp)

const Wrapper = () => (
  <ReactComponent value="CLICK ME!" onClick={() => console.log("BINGO!")}/>
)

ReactDOM.render(
  <Wrapper />,
  document.getElementById('app')
);
