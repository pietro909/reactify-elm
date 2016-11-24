import React, {Component} from 'react'

export default elmApp => class ElmWrapper extends Component {

  constructor (props) {
    super(props)
    this.callbackList = []
    this.data = {}
  }

  initialize (node) {
    if (node === null) {
            // node is unmounting
      return
    }

    const app = elmApp.embed(node, this.props)

    Object.keys(this.props).forEach(propName => {
      if (typeof this.props[propName] === 'function') {
        app.ports[propName].subscribe(this.props[propName])
        this.callbackList.push(propName)
      } else if (app.ports[propName]) {
        this.data[propName] = data => app.ports[propName].send(data)
      }
    })
  }

  shouldComponentUpdate (nextProps) {
    Object.keys(nextProps).forEach(propName => {
      if (!this.callbackList.includes(propName)) {
        const value = nextProps[propName]
        const sendToElm = this.data[propName]
        if (sendToElm && typeof sendToElm === 'function') {
          sendToElm(value)
        }
      }
    })
    return false
  }

  render () {
    return React.createElement('div', {ref: this.initialize.bind(this)})
  }
}
