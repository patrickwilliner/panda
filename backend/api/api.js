'use strict';

module.exports = function(models) {
    var http = require('follow-redirects').http;
    var Promise = require("bluebird");
    var ObjectId = require('mongoose').Types.ObjectId;
    var User = models.user;
    var Bundle = models.bundle;
    var Link = models.link;

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

    function searchLinksByTag(tagLabel, res) {
        Link.find({
            tags: tagLabel
        }).sort(
            '-createdAt'
        ).exec(function(err, links) {
            if (err) {
                console.log(err);
                res.send(400);
            }

            res.json(links);
        });
    }

    function searchLinksByText(searchText, res) {
        Link.find({
            $or: [{
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
            ]
        }).sort(
            '-createdAt'
        ).exec(function(err, links) {
            if (err) {
                console.log(err);
                res.send(400);
            }

            res.json(links);
        });
    }

    return {
        listUsers: function(req, res) {
            User.find(function(err, users) {
                res.json(users);
            });
        },

        listBundles: function(req, res) {
            Bundle.find().sort('order').exec(function(err, bundles) {
                var extendedBundles = bundles.map(function(bundle) {
                    bundle.linkCount = 3.4;
                    return bundle;
                });
                res.json(extendedBundles);
            });
        },

        createBundle: function(req, res) {
            var bundle = new Bundle(req.body);
            setTimestamps(bundle);

            Bundle.findOne().sort('-order').exec(function(err, maxBundle) {
                bundle.order = maxBundle.order + 1;

                bundle.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.send(400);
                    } else {
                        res.send(200);
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
                        res.send(400);
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
                        res.send(400);
                    } else {
                        res.send(200);
                    }
                });
            });
        },

        swapBundles: function(req, res) {
            return Bundle.findById(req.params.id, function (err, bundle1) {
                if (err) {
                    console.log(err);
                    res.send(400);
                } else {
                    return Bundle.findById(req.body.id, function (err, bundle2) {
                        if (err) {
                            console.log(err);
                            res.send(400);
                        } else {
                            var temp = bundle1.order;
                            bundle1.order = bundle2.order;
                            bundle2.order = temp;

                            bundle1.save(function(err) {
                                if (err) {
                                    console.log(err);
                                    res.send(400);
                                } else {
                                    bundle2.save(function(err) {
                                        if (err) {
                                            console.log(err);
                                            res.send(400);
                                        } else {
                                            res.send(200);
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
                {$unwind: '$tags'},
                {$group : {
                    _id : '$tags',
                    label : { $first: '$tags' },
                    linkCount : {
                        $sum : 1
                    }
                }},
                {$sort: { _id: 1 } }
            ], function(err, result) {
                res.json(result);
            });
        },

        listLinks: function(req, res) {
            Link.find(function(err, links) {
                if (err) {
                    console.log(err);
                    res.send(400);
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
                    res.send(400);
                }

                res.json(links);
            });
        },

        findLinks: function(req, res) {
            var searchText = req.query.search;
            var tag = req.query.tag;

            if (tag) {
                searchLinksByTag(tag, res);
            } else {
                searchLinksByText(searchText, res);
            }
        },

        createLink: function(req, res) {
            var link = new Link(req.body);

            setTimestamps(link);
            link.url = normalizeUrl(link.url);

            link.save(function(err) {
                if (err) {
                    console.log(err);
                    res.send(400);
                } else {
                    res.send(200);
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
                        res.send(400);
                    } else {
                        res.send(link);
                    }
                });
            });
        },

        deleteLink: function(req, res) {
            return Link.findById(req.params.id, function (err, link) {
                return link.remove(function (err) {
                    if (err) {
                        console.log(err);
                        res.send(400);
                    } else {
                        res.send(200);
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
            }).on('error', function(e) {
                console.log(e);
                res.json('');
            });
        }
    };
};