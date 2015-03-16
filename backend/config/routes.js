'use strict';

module.exports = function(app, passport, models) {
    var api = require('../api/api.js')(models);

    var isAuthenticated = function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.send(401);
      }
    };

    var authenticate = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    };

    app.get('/', authenticate, function(req, res){
        res.render('layout/application');
    });

    app.get('/links', authenticate, function(req, res){
        res.render('layout/application');
    });

    app.get('/configuration', authenticate, function(req, res){
        res.render('layout/application');
    });

    app.get('/guide', authenticate, function(req, res){
        res.render('layout/application');
    });

    app.get('/login', function(req, res) {
        res.render('login/login');
    });

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.get('/api/users', isAuthenticated, function(req, res) {
        api.listUsers(req, res);
    });

    app.post('/api/users', isAuthenticated, function(req, res) {
        api.createUser(req, res);
    });

    app.put('/api/users/:id', isAuthenticated, function(req, res) {
        api.updateUser(req, res);
    });

    app.delete('/api/users/:id', isAuthenticated, function(req, res) {
        api.deleteUser(req, res);
    });

    app.put('/api/users/:id/setpw', isAuthenticated, function(req, res) {
       api.setUserPassword(req, res);
    });

    app.get('/api/bundles/:id', isAuthenticated, function(req, res) {
        api.getBundle(req, res);
    });

    app.get('/api/bundles', isAuthenticated, function(req, res) {
        api.listBundles(req, res);
    });

    app.get('/api/bundles/:id/links', isAuthenticated, function(req, res) {
        api.findLinksByBundle(req, res);
    });

    app.post('/api/bundles', isAuthenticated, function(req, res) {
        api.createBundle(req, res);
    });

    app.put('/api/bundles/:id', isAuthenticated, function(req, res) {
        api.updateBundle(req, res);
    });

    app.delete('/api/bundles/:id', isAuthenticated, function(req, res) {
        api.deleteBundle(req, res);
    });

    app.post('/api/bundles/:id/swap', isAuthenticated, function(req, res) {
        api.swapBundles(req, res);
    });

    app.get('/api/links', isAuthenticated, function(req, res) {
        api.listLinks(req, res);
    });

    app.get('/api/links/search', isAuthenticated, function(req, res) {
        api.findLinks(req, res);
    });

    app.post('/api/links', isAuthenticated, function(req, res) {
        api.createLink(req, res);
    });

    app.put('/api/links/:id', isAuthenticated, function(req, res) {
        api.updateLink(req, res);
    });

    app.delete('/api/links/:id', isAuthenticated, function(req, res) {
        api.deleteLink(req, res);
    });

    app.get('/api/tags', isAuthenticated, function(req, res) {
        api.listTags(req, res);
    });

    app.get('/api/load_page_title', isAuthenticated, function(req, res) {
        api.loadPageTitle(req, res);
    });

    app.get('/api/session', isAuthenticated, function(req, res) {
        api.getSession(req, res);
    });
};