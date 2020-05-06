const express = require('express')
const path = require('path');


module.exports = function(main){

       main.get('/',(req,res)=>{
           if(!req.session.userid){
              res.redirect('/login'); }
           else{
             res.redirect('/profile');  }
        })

      
       main.use('/login',(req,res,next)=>{
         if(req.session.userid){
           res.redirect('/profile') }
         else{
           next();
         }
       })
       main.use('/login',express.static('public'));


  main.post('/login',(req,res)=>{
            
            database.query('Select * from login where email =? and password = ? ',[req.body.email,req.body.password],(err,rows)=>{
             
              if(rows.length > 0){
                   req.session.myname =rows[0].Name;
                   req.session.userid=req.body.email;
                   req.session.my_id=rows[0].id
                  res.redirect('/profile'); 
                }
           else{
               res.redirect('/login');
           }
            })})
        };
   
        
