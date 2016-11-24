import React, { Component } from 'react'

export default ElmApp =>
  class ElmWrapper extends Component {
    exportingPorts = {}
    receivingPorts = {}

    _initialize = (node) => {
      if (!node) {
        return
      }

      const app = ElmApp.embed(node, this.props)

      Object.keys(this.props).forEach(propName => {
        if (typeof this.props[propName] === 'function') {
          app.ports[propName].subscribe(this.props[propName])
          this.exportingPorts[propName] = true
        } else {
          if (app.ports[propName]) {
            this.receivingPorts[propName] = data => app.ports[propName].send(data)
          }
        }
      })
    }

    _isReceivingPort = (propName) => {
      return !this.exportingPorts[propName]
    }

    shouldComponentUpdate (nextProps) {
      Object.keys(nextProps).forEach(propName => {
        if (this._isReceivingPort(propName)) {
          const value = nextProps[propName]
          const sendToElm = this.receivingPorts[propName]

          if (sendToElm && typeof sendToElm === 'function') {
            sendToElm(value)
          }
        }
      })
      return false
    }

    render () {
      return React.createElement('div', {ref: this._initialize})
    }
  }

