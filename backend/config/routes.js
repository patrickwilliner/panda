'use strict';

module.exports = function(app, passport, models) {
    var api = require('../api/api.js')(models);

    app.get('/', function(req, res){
        res.render('layout/application');
    });

    app.get('/links', function(req, res){
        res.render('layout/application');
    });

    app.get('/configuration', function(req, res){
        res.render('layout/application');
    });

    app.get('/about', function(req, res){
        res.render('layout/application');
    });

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.post('/login', passport.authenticate('local-authorization', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/api/users', function(req, res) {
        api.listUsers(req, res);
    });

    app.get('/api/bundles', function(req, res) {
        api.listBundles(req, res);
    });

    app.get('/api/bundles/:id/links', function(req, res) {
        api.findLinksByBundle(req, res);
    });

    app.post('/api/bundles', function(req, res) {
        api.createBundle(req, res);
    });

    app.put('/api/bundles/:id', function(req, res) {
        api.updateBundle(req, res);
    });

    app.delete('/api/bundles/:id', function(req, res) {
        api.deleteBundle(req, res);
    });

    app.post('/api/bundles/:id/swap', function(req, res) {
        api.swapBundles(req, res);
    });

    app.get('/api/links', function(req, res) {
        api.listLinks(req, res);
    });

    app.get('/api/links/search', function(req, res) {
        api.findLinks(req, res);
    });

    app.post('/api/links', function(req, res) {
        api.createLink(req, res);
    });

    app.put('/api/links/:id', function(req, res) {
        api.updateLink(req, res);
    });

    app.delete('/api/links/:id', function(req, res) {
        api.deleteLink(req, res);
    });

    app.get('/api/tags', function(req, res) {
        api.listTags(req, res);
    });

    app.get('/api/load_page_title', function(req, res) {
        api.loadPageTitle(req, res);
    });
};