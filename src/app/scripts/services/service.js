(function () {
    'use strict';

    angular.module('fs-angular-banner')
    .factory('fsBanner', function () {
 
        function Banner(options) {
            this._options = options || {};
            this._options.avatar = this._options.avatar || {};
            this._options.actions = this._options.actions || [];
            this._options.avatar.action = this._options.avatar.action || {};
            this._options.styles = this._options.styles || '';

            this.avatarActionClick = function(icon, func) {
                this._options.avatar.action.icon = icon;
                this._options.avatar.action.click = func;
                return this;
            };

            this.background = function(background) {
                this._options.styles = "background-image: url('" + background + "');";
                return this;
            };

            this.avatarActionUpload = function(icon, func, options) {
                options = options || {};
                options.select = func;
                this._options.avatar.action.icon = icon;
                this._options.avatar.action.upload = options;
                return this;
            };

            this.addSubmitAction = function(icon, form, options) {
                var options = options || {};
                options.form = form;
                this.addAction(icon, null, 'submit', options);
                return this;
            };

            this.addClickAction = function(icon, func, options) {
                this.addAction(icon, func, 'click', options);
                return this;
            };

            this.addActionTemplate = function(template, scope, options) {
                var options = options || {};
                var action = {  options: options,
                                template: template,
                                type: 'template',
                                scope: scope };

                this._options.actions.push(action);
                return this;
            };


            this.addAction = function(icon, func, type, options) {
                var options = options || {};
                var action = {  func: func,
                                icon: icon,
                                options: options,
                                type: type || 'click' };

                this._options.actions.push(action);
                return this;
            };

            this.headline = function(headline) {
                this._options.headline = headline;
                return this;
            };

            this.headlineTemplate = function(template, scope) {
                this._options.headline = { template: template, scope: scope };
                return this;
            };

            this.subheadline = function(subheadline) {
                this._options.subheadline = subheadline;
                return this;
            };

            this.subheadlineTemplate = function(template, scope) {
                this._options.subheadline = { template: template, scope: scope };
                return this;
            };

            this.avatarImage = function(image) {
                this._options.avatar.image = image;
                return this;
            };

            this.avatarIcon = function(icon) {
                this._options.avatar.icon = icon;
                return this;
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