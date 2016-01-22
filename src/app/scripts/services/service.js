(function () {
    'use strict';

    angular.module('fs-angular-banner')
    .factory('fsBanner', function (apiService) {
 
        function Banner(options) {
            this._options = options || {};
            this._options.avatar = this._options.avatar || {};
            this._options.actions = this._options.actions || [];
            this._options.avatar.action = this._options.avatar.action || {};
            this._options.styles = this._options.styles || '';

            this.avatarActionClick = function(icon, func) {
                this._options.avatar.action.icon = icon;
                this._options.avatar.action.click = func;
            };

            this.background = function(background) {
                this._options.styles = "background-image: url('" + background + "');";
            };

            this.avatarActionUpload = function(icon, func, options) {
                options = options || {};
                options.select = func;
                this._options.avatar.action.icon = icon;
                this._options.avatar.action.upload = options;
            };

            this.addAction = function(icon, click, options) {
                var action = options || {};
                action.click = click;
                action.icon = icon;
                this._options.actions.push(action);
            };

            this.headline = function(headline) {
                this._options.headline = headline;
            };

            this.subheadline = function(subheadline) {
                this._options.subheadline = subheadline;
            };

            this.avatarImage = function(image) {
                this._options.avatar.image = image;
            };

            this.avatarIcon = function(icon) {
                this._options.avatar.icon = icon;
            };

            this.options = function() {
                return this._options;
            };

            return this;
        }

        var service = {
            create: create
        };
       
        return service;

        function create(options) {
            return new Banner(options); 
        }

    });
})();