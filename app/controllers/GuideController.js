define(['jquery'], function ($) {
    'use strict';

    function guideController() {
        function init() {
            $('body').scrollspy({ target: '#navbar-example' })
        }

        init();
    }

    guideController.$inject = [];
    return guideController;
});