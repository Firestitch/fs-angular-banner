(function () {
    'use strict';


    /**
     * @ngdoc service
     * @name fs.fsBanner
     * @description
     */

    angular.module('fs-angular-banner')
    .factory('fsBanner', function () {

        function Banner(options) {
            this._options = options || {};
            this._options.avatar = this._options.avatar || {};
            this._options.actions = this._options.actions || [];
            this._options.avatar.action = this._options.avatar.action || {};
            this._options.styles = this._options.styles || '';
            this._options.superheadline = this._options.superheadline || {};


            /**
             * @ngdoc method
             * @name avatarActionClick
             * @methodOf fs.fsBanner
             * @description Registers an icon and click event for the avatar
             * @param {string} icon md-icon icon name
             * @param {func} func the function called when the avatar is clicked
             */
            this.avatarActionClick = function(icon, func) {
                this._options.avatar.action.icon = icon;
                this._options.avatar.action.click = func;
                return this;
            };

            /**
             * @ngdoc method
             * @name background
             * @methodOf fs.fsBanner
             * @description Sets the banner background image
             * @param {string} url The url to the image
             */
            this.background = function(url) {
                this._options.styles = "background-image: url('" + url + "');";
                return this;
            };

            /**
             * @ngdoc method
             * @name avatarActionUpload
             * @methodOf fs.fsBanner
             * @description Registers an icon and upload listener for the avatar
             * @param {string} icon md-icon icon name
             * @param {func} func the function called when the avatar is clicked
             * @param {options} options Action {@link fs.directives:fs-banner `options`}
             */
            this.avatarActionUpload = function(icon, func, options) {
                options = options || {};
                options.select = func;
                this._options.avatar.action.icon = icon;
                this._options.avatar.action.upload = options;
                return this;
            };

            /**
             * @ngdoc method
             * @name addSubmitAction
             * @methodOf fs.fsBanner
             * @description Registers an icon and binds a click event that submits the form
             * @param {string} icon md-icon icon name
             * @param {string} form The ID of the form
             * @param {options} options Action {@link fs.directives:fs-banner `options`}
             */
            this.addSubmitAction = function(icon, form, options) {
                var options = options || {};
                options.type = 'submit';
                options.form = form;
                return this.addAction(icon, null, options);
            };

            /**
             * @ngdoc method
             * @name addClickAction
             * @methodOf fs.fsBanner
             * @description Registers an icon and binds a click event
             * @param {string} icon md-icon icon name
             * @param {string} func Function that is ran when the action is clicked
             * @param {options} options Action {@link fs.directives:fs-banner `options`}
             */
            this.addClickAction = function(icon, func, options) {
                var options = options || {};
                options.type = 'click';
                this.addAction(icon, func, options);
                return this;
            };

            /**
             * @ngdoc method
             * @name addActionTemplate
             * @methodOf fs.fsBanner
             * @description Registers an action with a custom template
             * @param {string} template The html template
             * @param {object} scope The scope object
             * @param {options} options Action {@link fs.directives:fs-banner `options`}
             */
            this.addActionTemplate = function(template, scope, options) {
                var options = options || {};
                options.scope = scope;
                options.template = template;
                options.type = 'template';

                return this.addAction('', '', options);
            };

            /**
             * @ngdoc method
             * @name addActionTemplate
             * @methodOf fs.fsBanner
             * @description Removes all the actions in the banner
             */
            this.clearActions = function() {
                this._options.actions = [];
                return this;
            };

            /**
             * @ngdoc method
             * @name clearAvatarAction
             * @methodOf fs.fsBanner
             * @description Removes the avatar from the banner
             */
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

            /**
             * @ngdoc method
             * @name headline
             * @methodOf fs.fsBanner
             * @description Sets the headline of the banner
             * @param {string} headline Headline string
             */
            this.headline = function(headline) {
                this._options.headline = headline;
                return this;
            };

            /**
             * @ngdoc method
             * @name headlineTemplate
             * @methodOf fs.fsBanner
             * @description Sets the headline HTML of the banner
             * @param {string} headline HTML template
             * @param {object} scope The scope object
             */
            this.headlineTemplate = function(template, scope) {
                this._options.headline = { template: template, scope: scope };
                return this;
            };

            /**
             * @ngdoc method
             * @name superheadline
             * @methodOf fs.fsBanner
             * @description Sets the line on top of the headline
             * @param {string} superheadline Headline string
             */
            this.superheadline = function(superheadline) {

                if(angular.isObject(superheadline)) {
                    this._options.superheadline = superheadline;
                } else {
                    this._options.superheadline.template = superheadline;
                }
                return this;
            };

            /**
             * @ngdoc method
             * @name superheadlineTemplate
             * @methodOf fs.fsBanner
             * @description Sets the super headline HTML of the banner
             * @param {string} headline HTML template
             * @param {object} scope The scope object
             */
            this.superheadlineTemplate = function(template, scope) {
                this._options.superheadline = { template: template, scope: scope };
                return this;
            };

            /**
             * @ngdoc method
             * @name subheadline
             * @methodOf fs.fsBanner
             * @description Sets the line on bottom of the headline
             * @param {string} subheadline Headline string
             */
            this.subheadline = function(subheadline) {
                this._options.subheadline = subheadline;
                return this;
            };

            /**
             * @ngdoc method
             * @name subheadlineTemplate
             * @methodOf fs.fsBanner
             * @description Sets the subheadline HTML of the banner
             * @param {string} headline HTML template
             * @param {object} scope The scope object
             */
            this.subheadlineTemplate = function(template, scope) {
                this._options.subheadline = { template: template, scope: scope };
                return this;
            };

            /**
             * @ngdoc method
             * @name avatarImage
             * @methodOf fs.fsBanner
             * @description Sets avatar image
             * @param {string} image Image url
             */
            this.avatarImage = function(image) {
                this._options.avatar.image = image;
                return this;
            };


            /**
             * @ngdoc method
             * @name avatarIcon
             * @methodOf fs.fsBanner
             * @description Set the avatar icon
             * @param {string} icon md-icon icon name
             */
            this.avatarIcon = function(icon) {
                this._options.avatar.icon = icon;
                return this;
            };

           /**
             * @ngdoc method
             * @name options
             * @methodOf fs.fsBanner
             * @description Gets the current option configuration
             */
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