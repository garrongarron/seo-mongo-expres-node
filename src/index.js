import './style.scss'
import setRoutes, { goToPage } from './component/Routing.js'
import landing from './pages/Landing.js'
import aboutUs from './pages/AboutUs.js'
import setNavigator from './pages/Nav.js'
import contactUs from './pages/Contactanos'
import './component/ServiceWorker.js'

let routes = {
    '/': landing,
    '/Que Hacemos': landing,
    '/Quienes Somos': aboutUs,
    '/Contactanos': contactUs,
}

setRoutes(routes)

setNavigator(routes)

goToPage(location.pathname)
