//Importiong Modules
const express = require('express');
const path = require('path');
//Initializing Express App
const app = express();

//Setting views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    res.render('index');
});

//Start listening on port
app.listen(3000, () => {
    console.log('Server Started on port 3000')
});