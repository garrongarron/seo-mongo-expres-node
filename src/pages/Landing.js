import Page from '../component/Page.js'

import _ from '../component/creator.js'

let section = _('section', [
    _('h1', 'Que hacemos?'),
    _('p', 'lorem'),
])


let landing = new Page(section)
export default landing
