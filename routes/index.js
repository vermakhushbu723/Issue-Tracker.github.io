
// routing all the urls using routes in express

// this file contains all the routes

var express = require('express');

var router = express.Router();

const mongoose = require('mongoose');

var ObjectID = require('mongodb').ObjectID;

// getting database files

const db = require('../config/mongoose')

const repository = require('../models/repository');

const issue = require('../models/issues');

router.use(express.urlencoded());

router.use(express.static('assets/images'));

router.use(express.static('assets/css'));

router.use(express.static('views'));

const homePage = require('../controller/index_controller');

router.get('/', homePage.home);

router.get('/new', homePage.newrepo);

router.get('/repository', homePage.repo);

// creating a new repo route

router.post('/newrepo', function (req, res) {
    repository.create({
        author: req.body.authorname,
        description: req.body.description,
        name: req.body.reponame


    }, function (err, newTask) {
        if (err) {
            console.log(err);
            console.log("Error in creating a Repository");
            return;
        }
        repository.find({}, function (err, repo) {
            if (err) {
                console.log("Error In Fetching Repositories");
                return;
            }
            res.render('index', {
                arr: repo,
            });
        })
    });
});


// creating issue route
router.post('/issues', function (req, res) {


    repository.find({ _id: req.body.repoid }, function (err, repo) {
        if (err) {
            console.log("Error In Fetching Repositories");
            return;
        }
        res.render('issues', {
            hel: repo,
            postid: req.body.repoid
        })
    })

    router.post("/newissue", function (req, res) {
        issue.create({
            issuename: req.body.issue,
            tag: req.body.tag,
            name: req.body.authorname,
            repository: req.body.repoid


        }, function (err, newTask) {
            if (err) {
                console.log(err);
                console.log("Error in creating a Issue");
                return;
            }
            issue.find({ repository: mongoose.Types.ObjectId(req.body.repoid) }, function (err, issues) {
                if (err) {
                    console.log("Error In Fetching Issue");
                    return;
                }
                repository.find({ _id: req.body.repoid }, function (err, repo) {
                    if (err) {
                        console.log("Error In Fetching Repositories");
                        return;
                    }
                    res.render('repository', {
                        hel: repo,
                        arr: issues,
                        repoid: req.body.repoid
                    })
                })
            });
        })
    })
})

module.exports = router;