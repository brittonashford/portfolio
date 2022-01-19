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
    
    if(data.projects[id]){
        res.render('project', { proj : data.projects[id] })
    } else {  //if user types a number in the url that doesn't correspond to a project
        const err = new Error("Project does not exist.");
		err.status = 404;
        err.message = `Error status ${err.status}: The requested project does not exist.`	
		next(err);
    }  
})

//catch all other 404 errors
app.use((req, res, next) => {
	const err = new Error("Page does not exist.");
    err.status = 404;
    err.message = `Error status ${err.status}: The requested page does not exist.`	
	next(err);
});

//catch all other errors
app.use((err, req, res, next) => {
    if(err.status !== 404){
        err.status = 500;
	    err.message = `Error status ${err.status}: Server error.`;
    }
	
	res.locals.error = err;
	res.status(err.status);
	console.error(err.message);

    //render error view
    res.render('error', {err});

});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
})

