import Page from '../component/Page.js'
import _ from '../component/creator.js'

let section = _('section', [
    _('h1', 'Quienes Somos'),
    _('p', 'lorem'),
])

let about = new Page(section)
export default about
