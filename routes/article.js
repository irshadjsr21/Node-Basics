const express = require('express');
const router = express.Router();
const Article = require('../models/article');


router.get('/add', (req,res) => {
    res.render('add_article');
});

router.post('/add', (req,res) => {
    let article = {
        title: req.body.title,
        body: req.body.body
    }
    Article.create(article, (error, article)=>{
        if(error){
            console.log(error);
            res.end();
        }
        else{
            res.redirect('/');
        }
    });  
});

router.get('/edit/:id', (req,res) => {
    Article.findById(req.params.id, (error,article) =>{
        if(error){
            console.log(error);
        }
        else{
            res.render('edit_article', {
                article:article
            });
        }
    });
});

router.post('/edit/:id', (req,res)=>{
    let article = {
        title: req.body.title,
        body: req.body.body
    };
    Article.updateOne({_id:req.params.id},article ,(error,article)=>{
        if(error){
            console.log(error);
        }
        else{
            res.redirect('/');
        }
    });
});

router.delete('/:id', (req,res) => {
    Article.deleteOne({_id:req.params.id}, (error,article) => {
        if(error){
            console.log(error);
        }
        else{
            res.redirect('/');
        }
    });
});

router.get('/:id', (req,res) => {
    Article.findById(req.params.id, (error, article) => {
        if(error){
            console.log(error);
        }
        else{
            res.render('article', {
                article: article
            });
        }
    })
});

module.exports = router;