import Props from '../component/Props.js'
import _ from "../component/creator.js"
import { goToPage } from '../component/Routing.js'

class List extends Props {
    render(a) {
        return _('ul', a.map(link => _('li',
                _('a', link, node => {
                        node.setAttribute('href', link)
                        node.addEventListener('click', (e) => {
                            e.preventDefault()
                            document.head.querySelector('title').innerText = decodeURI(link)
                            goToPage('/'+link)
                        })
                    })
                ),
            ),
            ul => ul.setAttribute('role', 'navigation')
        )
    }
}
export default List