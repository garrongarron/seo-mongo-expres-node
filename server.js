require('dotenv').config({path:'variables.env'})

const http = require('http');
const app = require('./server/app');

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000;
const server = http.createServer(app);


server.listen(port, () => {
    console.log('Server on '+host+':'+port )
    console.log('Database: '+process.env.DB_URL)
});