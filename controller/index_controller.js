// getting all the database files required

const mongoose = require('mongoose')

const db = require('../config/mongoose')



const repository = require('../models/repository');

const issue = require('../models/issues');

// creating controllers for routes action

// index routes controller

module.exports.home = function(req,res){


    repository.find({},function(err,repo){
        if(err){
            console.log("Error In Fetching Repositories");
            return;
        }
        res.render('index',{
            arr:repo
        });
    })
}



module.exports.newrepo = function(req,res){
    res.render('newrepo.ejs')
}
// displaying all the repositories and issues on the used route
module.exports.repo = function(req,res){
    
    repository.find({_id:req.query.oid},function(err,repo){
        if(err){
            console.log("Error In Fetching Repositories");
            return;
        }
        
        issue.find({repository:mongoose.Types.ObjectId(req.query.oid)},function(err,issues){
            if(err){
                console.log("Error In Fetching Repositories");
                return;
            }
            res.render('repository',{
                hel:repo,
                arr:issues,
                repoid:req.query.oid
            })
        })
    })
    
}