import Navigator from './Navigator.js'
import List from './List.js'
import creator from '../component/creator.js'

let setNavigator = (routes) =>{
    let links = Object.keys(routes).filter(n=>n!=='/').map(link=>link.slice(1))
    let nav = creator(new Navigator(new List(links)))
    document.body.appendChild(nav)
}

export default setNavigator