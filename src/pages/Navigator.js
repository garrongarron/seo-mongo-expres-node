import Props from '../component/Props.js'
import _ from "../component/creator.js"

class Navigator extends Props { 
    render(links) {
        return _(
            'nav',
            links,
            {'class':'nav'}
        )
    }
}
export default Navigator