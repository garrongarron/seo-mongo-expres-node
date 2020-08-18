import _ from './creator.js'

let nodeElementCache = document.createElement('div')

class Page {
    constructor(node) {
        this.node = _(node)
    }
    getNode() {
        return this.node
    }
    show() {
        document.body.appendChild(this.node)
    }
    hide() {
        nodeElementCache.appendChild(this.node)
    }
}

export default Page