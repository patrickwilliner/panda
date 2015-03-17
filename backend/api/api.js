'use strict';

module.exports = function(models) {
    var http = require('follow-redirects').http;
    var Promise = require('bluebird');
    var ObjectId = require('mongoose').Types.ObjectId;
    var User = models.user;
    var Bundle = models.bundle;
    var Link = models.link;

    Promise.promisifyAll(require('mongoose'));

    function setTimestamps(object) {
        var date = new Date();

        if (!object.createdAt) {
            object.createdAt = date;
        }
        object.modifiedAt = date;
    }

    function normalizeUrl(url) {
        var normalized = new String(url);
        if (normalized) {
            normalized = url.trim().toLowerCase();
            if (normalized.indexOf('http://') < 0 && normalized.indexOf('https://') < 0) {
                normalized = 'http://' + normalized;
            }
        } 
        
        return normalized;
    }

    function searchLinksByTag(tagLabel, req, res) {
        Link.find({
            owner: new ObjectId(req.user._id),
            tags: tagLabel
        }).sort(
            '-createdAt'
        ).exec(function(err, links) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            }

            res.json(links);
        });
    }

    function searchLinksByText(searchText, req, res) {
        Link.find({
            $and: [
                {owner: new ObjectId(req.user._id)},
                {$or: [{
                    label: {
                        $regex: searchText,
                        $options: 'is'
                    }},
                    {url: {
                        $regex: searchText,
                        $options: 'is'
                    }},
                    {tags: {
                        $regex: searchText,
                        $options: 'is'
                    }}
                ]}
            ]
        }).sort(
            '-createdAt'
        ).exec(function(err, links) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            }

            res.json(links);
        });
    }

    // todo implement -> also delete all link associated with bundle
    function deleteBundle(bundleId) {
        Link.find(
            {bundle: new ObjectId(bundleId)}
        )

        return Bundle.findById(id, function (err, bundle) {
            return bundle.remove(function (err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    }

    // todo implement -> also delete all bundles and links associated with user
    function deleteUser(userId) {

    }

    return {
        listUsers: function(req, res) {
            User.find(function(err, users) {
                res.json(users);
            });
        },

        createUser: function(req, res) {
            var user = new User(req.body);
            setTimestamps(user);

            user.save(function(err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(200);
                }
            });
        },

        updateUser: function(req, res) {
            return User.findById(req.params.id, function (err, user) {
                setTimestamps(user);
                user.login = req.body.login;
                user.givenName = req.body.givenName;
                user.surname = req.body.surname;
                user.active = req.body.active;
                user.admin = req.body.admin;

                return user.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                    } else {
                        res.send(user);
                    }
                });
            });
        },

        deleteUser: function(req, res) {
            return User.findById(req.params.id, function (err, user) {
                return user.remove(function (err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(200);
                    }
                });
            });
        },

        setUserPassword: function(req, res) {
            var userId = req.params.id;
            var password = req.body.password;

            return User.findById(userId, function (err, user) {
                user.setPassword(password);

                return user.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(200);
                    }
                });
            });
        },

        /*
         * Returns all bundles that belong to the logged in user.
         */
        listBundles: function(req, res) {
            var promises = [];
            var extendedBundles = [];

            Promise.resolve(Bundle.find({owner: new ObjectId(req.user._id)}).sort('order').execAsync().then(function(bundles) {
                bundles.forEach(function(bundle) {
                    promises.push(Link.countAsync({bundle: bundle._id}).then(function(count) {
                        bundle.linkCount = count;
                        extendedBundles.push(bundle);
                    }));
                });
            })).then(function() {
                Promise.all(promises).then(function() {
                    res.json(extendedBundles);
                }).error(function() {
                    res.sendStatus(400);
                });
            });
        },

        getBundle: function(req, res) {
            return Bundle.findById(req.params.id, function (err, bundle) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    Link.count({bundle: bundle._id}, function(err, count) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(400);
                        } else {
                            bundle.linkCount = count;
                            res.send(bundle);
                        }
                    });
                }
            });
        },

        createBundle: function(req, res) {
            var bundle = new Bundle(req.body);
            setTimestamps(bundle);

            Bundle.findOne({owner: new ObjectId(req.user._id)}).sort('-order').exec(function(err, maxBundle) {
                if (maxBundle) {
                    bundle.order = maxBundle.order + 1;
                } else {
                    bundle.order = 1;
                }
                
                bundle.owner = new ObjectId(req.user._id);

                bundle.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(200);
                    }
                });
            });            
        },

        updateBundle: function(req, res) {
            return Bundle.findById(req.params.id, function (err, bundle) {
                setTimestamps(bundle);
                bundle.label = req.body.label;

                return bundle.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                    } else {
                        res.send(bundle);
                    }
                });
            });
        },

        deleteBundle: function(req, res) {
            return Bundle.findById(req.params.id, function (err, bundle) {
                return bundle.remove(function (err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(200);
                    }
                });
            });
        },

        swapBundles: function(req, res) {
            return Bundle.findById(req.params.id, function (err, bundle1) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    return Bundle.findById(req.body.id, function (err, bundle2) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(400);
                        } else {
                            var temp = bundle1.order;
                            bundle1.order = bundle2.order;
                            bundle2.order = temp;

                            bundle1.save(function(err) {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(400);
                                } else {
                                    bundle2.save(function(err) {
                                        if (err) {
                                            console.log(err);
                                            res.sendStatus(400);
                                        } else {
                                            res.sendStatus(200);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }                
            });
        },

        listTags: function(req, res) {
            // Model.collection -> use native connection
            Link.collection.aggregate([
                {$match: {'owner': ObjectId(req.user._id)}},
                {$unwind: '$tags'},
                {$group : {
                    _id : '$tags',
                    label : { $first: '$tags' },
                    linkCount : {
                        $sum : 1
                    }
                }},
                {$sort: { _id: 1 } }
            ], function(err, tags) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    res.json(tags);
                }
            });
        },

        listLinks: function(req, res) {
            Link.find(function(err, links) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    res.json(links);
                }
            });
        },

        findLinksByBundle: function(req, res) {
            var bundleId = req.params.id;

            Link.find({
                bundle: new ObjectId(bundleId)
            }).sort(
                '-createdAt'
            ).exec(function(err, links) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                }

                res.json(links);
            });
        },

        findLinks: function(req, res) {
            var searchText = req.query.search;
            var tag = req.query.tag;

            if (tag) {
                searchLinksByTag(tag, req, res);
            } else {
                searchLinksByText(searchText, req, res);
            }
        },

        createLink: function(req, res) {
            var link = new Link(req.body);

            setTimestamps(link);
            link.url = normalizeUrl(link.url);
            link.owner = new ObjectId(req.user._id);

            link.save(function(err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(200);
                }
            });
        },

        updateLink: function(req, res) {
            return Link.findById(req.params.id, function (err, link) {
                setTimestamps(link);
                link.url = normalizeUrl(req.body.url);
                link.bundle = req.body.bundle;
                link.label = req.body.label;
                link.tags = req.body.tags;

                return link.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(200);
                    }
                });
            });
        },

        deleteLink: function(req, res) {
            return Link.findById(req.params.id, function (err, link) {
                return link.remove(function (err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(200);
                    }
                });
            });
        },

        loadPageTitle: function(req, res) {
            var url = normalizeUrl(req.query.url);

            http.get(url, function(res2) {
                var body = '';

                res2.on('data', function(chunk) {
                    body += chunk;
                });

                res2.on('end', function () {
                    var regex = /<title>((.|\n|\r)*)<\/title>/gi;
                    var result = regex.exec(body);
                    return res.json(result && result[1] ? result[1].trim() : '-');
                });
            }).on('error', function(err) {
                console.log(err);
                res.sendStatus(400);
            });
        },

        getSession: function(req, res) {
            res.send(req.user);
        }
    };
};