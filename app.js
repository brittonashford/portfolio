const express = require('express');
const app = express();
/*const path = '';*/
const data = require('./data.json')

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { data });
});


app.get('/about', (req, res) => {
    res.render('about');
})


app.get('/projects/:id', (req, res, next) => {
    const id = req.params.id;

    if(data.prjects[id]){
        res.render('project', { project: data.projects[id] })
    } else {
        const err = new Error('Project does not exist.');
        err.status = 404;
        next(err);
    }  
})


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
})

