//Importiong Modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Importing Models
const Article = require('./models/article');

//Importing Routes
const articleRoutes = require('./routes/article');

//Initializing Express App
const app = express();

//Connecting to MongoDB
mongoose.connect('mongodb://localhost/basics2', {useNewUrlParser: true});
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected To Database');
});

db.on('error', (error) => {
    console.log(error);
});


//Setting views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

//Routing
app.get('/', (req,res)=>{
    Article.find({}, (error, articles) => {
        if(error){
            console.log(error);
        }
        else{
            res.render('index', {
                articles: articles
            });
        }
    });
});
app.use('/article', articleRoutes);


//Start listening on port
app.listen(3000, () => {
    console.log('Server Started on port 3000')
});