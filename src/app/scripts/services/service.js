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
            this._options.superheadline = this._options.superheadline || {};

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
                options.type = 'submit';
                options.form = form;
                return this.addAction(icon, null, options);
            };

            this.addClickAction = function(icon, func, options) {
                var options = options || {};
                options.type = 'click';                
                this.addAction(icon, func, options);
                return this;
            };

            this.addActionTemplate = function(template, scope, options) {
                var options = options || {};
                options.scope = scope;
                options.template = template;
                options.type = 'template';
                
                return this.addAction('', '', options);
            };

            this.clearActions = function() {
                this._options.actions = [];
                return this;
            };

            this.clearAvatarAction = function() {
                this._options.avatar.action = {};
                return this;
            };
            
            this.addAction = function(icon, func, options) {
                var options = options || {};
                var action = {  func: func,
                                icon: icon,
                                type: options.type || 'click',
                                primary: options.primary!==false,
                                options: options };

                if(options.mini===undefined) {
                    options.mini = !action.primary;
                }

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

            this.superheadline = function(superheadline) {

                if(angular.isObject(superheadline)) {
                    this._options.superheadline = superheadline;
                } else {
                    this._options.superheadline.template = superheadline;
                }                
                return this;
            };

            this.superheadlineTemplate = function(template, scope) {
                this._options.superheadline = { template: template, scope: scope };
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