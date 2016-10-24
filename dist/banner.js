
(function() {
    'use strict';

    /**
      * @ngdoc directive
      * @name fs.directives:fs-banner
      * @restrict E
      * @param {object} fs-options Options to configure the banner.
      * @param {object} fs-options.avatar Configures paging
          <ul>
              <li><label>click</label>Callback function on when the avatar area clicked.</li>
              <li><label>icon</label>The avatar's action icon located in the top right of the avatar. Use the material icon name to specify the type of icon.</li>
              <li><label>image</label>Supports a url which is placed as a avatar background image</li>
              <li><label>action</label> An area that hovers over the avatar area that supports and icon with functionality</li>
              <ul>
                  <li><label>icon</label>Callback function on when the avatar area clicked.</li>
                  <li><label>upload</label> When not empty the avatar click opens an upload dialog</li>
                  <ul>
                      <li><label>select</label>Upload callback that is passed the file upload object</li>
                  </ul>
              </ul>
          <ul>
      * @param {object} fs-options.superheadline The super headline of the banner
       <ul>
           <li><label>template</label>The content of the super headline</li>
           <li><label>scope</label>Scope used to render the super headline</li>
       </ul>
      * @param {object} fs-options.headline The headline of the banner
       <ul>
           <li><label>template</label>The content of the headline</li>
           <li><label>scope</label>Scope used to render the headline</li>
       </ul>
      * @param {object} fs-options.subheadline The sub headline of the banner
       <ul>
           <li><label>template</label>The content of the sub headline</li>
           <li><label>scope</label>Scope used to render the sub headline</li>
       </ul>
      * @param {string} fs-options.background Backgrond image of the banner
      * @param {array} fs-options.actions This configures icons located on the far right side of the banner.</li>
       <ul>
           <li><label>icon</label>This click callback function. Use the material icon name to specify the type of icon.</li>
           <li><label>type</label></li>
              <ul>
                  <li><label>submit</label>Used to submit forms</li>
                  <li><label>click</label>Used to with the click option</li>
                  <li><label>template</label>Completly customizable template that also can use the scope option</li>
              </ul>
           <li><label>click</label> This click callback function</li>
           <li><label>mini</label> Makes the button mini in size</li>
           <li><label>scope</label> Scope which is used for type=template</li>
           <li><label>tooltip</label> Tooltip used for the button</li>
           <li><label>tooltipDirection</label>Which direction would you like the tooltip to go? Supports left, right, top, and bottom. Defaults to bottom.</li>
       </ul>
      * @param {object} fs-options.styles This ng-style object is used child div fs-banner</li>
      * @example
      * <pre>
      *var banner = fsBanner.create()
      *         .background('http://tri-niche.com/wp-content/uploads/2015/01/Gradient-1.jpg')
      *         .superheadline({ template: '<a href ng-click="alert()">Superheadline</a>', scope: { alert: function() { alert('!!!!!'); }} })
      *         .headlineTemplate('Headline')
      *         .avatarIcon('person')
      *         .subheadline('Subheadline')
      *         .avatarImage('https://images.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png')
      *         .avatarActionUpload('photo_camera',
      *    function(file) {
      *$scope.bannerInstance.avatarImage('http://product-images.imshopping.com/nimblebuy/forest-glen-golf-centre-968482-1484562-regular.jpg');
      *       }, { 'ngf-accept': 'image/*' })
      *         .addActionTemplate(['<md-fab-speed-dial md-direction="left" class="md-fling" md-open="false">',
      *      '<md-fab-trigger>',
      *          '<md-button aria-label="Add..." class="md-fab md-mini">',
      *   '<md-icon>settings</md-icon>',
      *          '</md-button>',
      *      '</md-fab-trigger>',
      *      '<md-fab-actions>',
      *          '<md-button aria-label="Add Event" class="md-fab md-raised md-mini md-primary" ng-click="doit()">',
      *   '<md-icon>add</md-icon>',
      *          '</md-button>',
      *          '<md-button aria-label="Environment" class="md-fab md-raised md-mini md-primary">',
      *   '<md-icon>language</md-icon>',
      *          '</md-button>',
      *      '</md-fab-actions>',
      *  '</md-fab-speed-dial>'].join(''),
      *  { doit: function() { alert("doit"); }})
      *         .addClickAction('clear',
      *      function() {
      *          alert('save()');
      *      },
      *      { primary: false })
      *         .addSubmitAction('add','form')
      *         .addSubmitAction('save','form');
      *
      *$scope.bannerOptions = banner.options();
      *
      *
      *<fs-banner fs-options="bannerOptions" fs-instance="bannerInstance"></fs-banner>
      *</pre>
      */

    var banner = ['$compile', 'fsBanner', '$timeout', '$window', function($compile, fsBanner, $timeout, $window) {
        return {
            templateUrl: 'views/directives/banner.html',
            restrict: 'E',
            replace: false,
            transclude: true,
            scope: {
                options: "=?fsOptions",
                instance: "=?fsInstance"
            },
            controller: ['$scope',function($scope) {

                if (!$scope.instance || angular.equals({}, $scope.instance)) {
                    $scope.instance = fsBanner.create($scope.options);
                }

                $scope.$watch('instance.options', function(options) {
                    $scope.options = $scope.instance.options();
                });

                $scope.upload = function(file) {
                    $scope.options.avatar.action.upload.select(file);
                }

                $scope.actionClick = function(action, $event) {

                    $event.stopPropagation();

                    if (action.type == 'submit') {
                        var form = angular.element(document.querySelector('form[name="' + action.options.form + '"]'));

                        if (form.length) {
                            form.attr('action', 'javascript:;');

                            var button = angular.element('<button>', { type: 'submit', style: 'display:none' });

                            form.append(button);

                            $timeout(function() {
                                button[0].click();
                                button.remove();
                            });
                        }

                    } else if (action.type == 'click') {
                        action.func();
                    }
                }

                $scope.actionType = function(action) {

                    if (action.type == 'submit' && !action.options.form) {
                        return 'submit';
                    }

                    return 'button';
                }

                $scope.click = function(func, $event) {
                    if (func) {
                        $event.stopPropagation();
                        func();
                    }
                }
            }],
            link: function($scope, element, attr) {

                var scroll = function() {

                    if (this.pageYOffset >= top) {
                        actions.addClass('fixed');
                    } else {
                        actions.removeClass('fixed');
                    }
                }

                var actions = angular.element(element[0].querySelector('.actions'));
                var top = actions.prop('offsetTop') + actions.prop('offsetTop');

                angular.element($window).on("scroll", scroll);

                $scope.$on('$destroy', function() {
                    angular.element($window).off("scroll", scroll);
                });
            }
        };
    }];

    angular.module('fs-angular-banner', [])
        .directive('banner', banner)
        .directive('fsBanner', banner)
        .directive('fsBannerBindCompile', ['$compile', function($compile) {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {

                    $scope.$watch(function() {
                        return $scope.$eval(attrs.fsBannerBindCompile);
                    }, function(value) {
                        // In case value is a TrustedValueHolderType, sometimes it
                        // needs to be explicitly called into a string in order to
                        // get the HTML string.

                        element.html(value && value.toString());
                        // If scope is provided use it, otherwise use parent scope
                        var compileScope = $scope;
                        if (attrs.fsBannerBindCompileScope) {

                            var scope = $scope.$eval(attrs.fsBannerBindCompileScope);
                            if (scope) {
                                //If this is already a scope variable use it other wise extend the current scope
                                compileScope = scope.$id ? scope : angular.extend($scope, scope);
                            }
                        }

                        $compile(element.contents())(compileScope);
                    });
                }
            };
        }]);
})();

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
angular.module('fs-angular-banner').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/banner.html',
    "<div layout=\"row\" layout-align=\"start center\" style=\"{{ options.styles }}\">\n" +
    "    <div class=\"avatar\" ng-class=\"{ clickable: options.avatar.click || options.avatar.action.upload }\" ng-click=\"click(options.avatar.click, $event)\" ngf-select=\"upload($files)\" ng-disabled=\"!options.avatar.action.upload\">\n" +
    "        <div class=\"hover\" ng-show=\"options.avatar.click || options.avatar.action.upload\">change</div>\n" +
    "        <div class=\"icon\" ng-if=\"options.avatar.image\" style=\"background-image: url('{{options.avatar.image}}')\"></div>\n" +
    "        <div class=\"icon\" ng-show=\"!options.avatar.image\">\n" +
    "            <md-icon>{{options.avatar.icon}}</md-icon>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div flex>\n" +
    "        <div ng-if=\"options.superheadline.template\" fs-banner-bind-compile=\"options.superheadline.template\" fs-banner-bind-compile-scope=\"options.superheadline.scope\" class=\"superheadline\"></div>\n" +
    "        <div class=\"headline\" ng-if=\"options.headline.template\" fs-banner-bind-compile=\"options.headline.template\" fs-banner-bind-compile-scope=\"options.headline.scope\"></div>\n" +
    "        <div class=\"headline\" ng-if=\"!options.headline.template\">{{options.headline}}</div>\n" +
    "        <div ng-if=\"options.subheadline.template\" fs-banner-bind-compile=\"options.subheadline.template\" fs-banner-bind-compile-scope=\"options.subheadline.scope\" class=\"subheadline\"></div>\n" +
    "        <div class=\"subheadline\" ng-if=\"!options.subheadline.template\">{{options.subheadline}}</div>\n" +
    "    </div>\n" +
    "    <div class=\"actions\" layout=\"row\" layout-align=\"end center\">\n" +
    "        <span class=\"action\" ng-repeat=\"action in options.actions\">\n" +
    "            <span ng-if=\"action.type=='template'\" fs-banner-bind-compile=\"action.options.template\" fs-banner-bind-compile-scope=\"action.options.scope\"></span>\n" +
    "            <span ng-if=\"action.type=='submit' || action.type=='click'\">\n" +
    "                <md-button class=\"md-fab\" ng-class=\"{ 'md-accent': action.primary, 'md-mini': action.options.mini }\" aria-label=\"Save\" type=\"{{actionType(action)}}\" ng-click=\"actionClick(action, $event)\">\n" +
    "                    <md-icon md-icon-set=\"material-icons\">{{action.icon}}</md-icon>\n" +
    "                </md-button>\n" +
    "                <md-tooltip md-delay=\"750\" md-direction=\"{{action.options.tooltipDirection ? action.options.tooltipDirection : 'bottom'}}\" ng-if=\"action.options.tooltip\">{{action.options.tooltip}}</md-tooltip>\n" +
    "            </span>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
