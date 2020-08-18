let routes = {}

let setRoutes = (obj) =>{
    routes = obj
}
export default setRoutes

let run = (page) => {
    if(routes[lastPage]) routes[lastPage].hide()
    if(routes[page]) routes[page].show()
    console.log(page);
    lastPage = page 
    // if(!routes[page]) run('/')
}

let goToPage = (newPage) =>{
    let page = decodeURI(newPage)
    history.pushState({ page: page }, 'NspN', page)
    run(page)
}
export {routes, goToPage}

window.onpopstate = (e) =>{
    // console.log(e.state.page);
    run(e.state.page)
}

let lastPage = null



