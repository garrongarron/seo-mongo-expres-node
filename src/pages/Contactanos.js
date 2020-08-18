import Page from '../component/Page.js'
import _ from '../component/creator.js'

let section = _('section', [
    _('h1', 'Contactanos'),
    _('p', 'lorem'),
])

let contactUs = new Page(section)
export default contactUs
