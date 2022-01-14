const express = require('express');
const app = express();
/*const path = '';*/
const data = require('./data.json')

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    app.render('index');
});

//app.get('/', (req, res) => {
//    app.render('index', { projects: data.projects });
//});


app.get('/about', (req, res) => {
    app.render('about');
})


app.get('/projects/:id', (req, res) => {
    app.render('project')
})


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
})

