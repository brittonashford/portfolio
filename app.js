const express = require('express');
const app = express();
const data = require('./data.json')

app.set('view engine', 'pug');

//Static HTML, CSS, and Images
app.use('/static', express.static('public'));

//path for home page
app.get('/', (req, res) => {
    res.render('index', { data });
});

//path for about page
app.get('/about', (req, res) => {
    res.render('about');
})


//retrieves project or a 404 error
app.get('/projects/:id', (req, res, next) => {
    const { id } = req.params;
    const proj = data.projects[id];

    if(data.projects[id]){
        res.render('project', { proj })
    } else {  //if user types a number in the url that doesn't correspond to a project
        const err = new Error('Project does not exist (404).');
        err.status = 404;
        next(err);
    }  
})

//server error/default error handler
app.use((err, req, res, next) => {
        err.status = 500;
        err.message = 'An error occurred while processing your request (500).'
        console.log(err.message, err.status);
        next(err);
})


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
})

