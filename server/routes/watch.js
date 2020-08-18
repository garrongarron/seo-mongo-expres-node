const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/fallback.html', (req, res, next) => {
    res.send('Sin internet <a href="/">Volver<a>');
});

router.get('/bundle/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/layout/' + req.params.id));
});
router.get('/scss/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/layout/' + req.params.id));
});
router.get('/img/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../img/' + req.params.id));
});
router.get('/robots.txt', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../dist/robots.txt'));
})
router.get('/sw.js', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../dist/sw.js'));
})
let host = 'http://'+process.env.HOST+':'+process.env.PORT
router.get('/', (req, res, next) => {
    //DB query 
    res.render('seo', {
        title: 'Home',
        description: 'La mejor descripcion del mundo',
        author:'Juan Perez',
        site: 'EL NOMBRE DEL SITIO',
        image: 'https://miro.medium.com/max/2780/1*2isTmjQSgDPResdCwltijA.png',
        url:host
    })
});

router.get('/:id', (req, res, next) => {
    res.render('seo', {
        title: req.params.id,
        description: 'La mejor descripcion del mundo',
        author:'Juan Perez',
        site: 'EL NOMBRE DEL SITIO',
        image: 'https://miro.medium.com/max/2780/1*2isTmjQSgDPResdCwltijA.png',
        url:host
    })
});

module.exports = router;