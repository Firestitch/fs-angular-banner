(function () {
    'use strict';
    
	angular.module('fs-angular-banner',[]);
})();
(function () {
    'use strict';


})();
(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name fs-angular-banner.directives:banner
     * @description
     * @restrict E
     * @param {object} bn-options Options to configure the banner.
     * <table class="variables-matrix table table-bordered table-striped"><thead><tr><th>Option</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr>
            <td>avatar.click</td><td><a href="" class="label type-hint type-hint-function">function</a></td>
            <td>Callback function on when the avatar area clicked.</td>
        </tr> 
        <tr>
            <td>avatar.action.icon</td><td><a href="" class="label type-hint type-hint-function">string</a></td>
            <td>The avatar's action icon located in the top right of the avatar. Use the material icon name to specify the type of icon.</td>
        </tr>
        <tr>
            <td>avatar.action.click</td><td><a href="" class="label type-hint type-hint-function">function</a></td>
            <td>Callback function on when the avatar action icon is clicked. Use the material icon name to specify the type of icon.</td>
        </tr>    
        <tr>
            <td>headline</td><td><a href="" class="label type-hint type-hint-function">string</a></td>
            <td>The headline of the banner</td>
        </tr>    
        <tr>
            <td>subheadline</td><td><a href="" class="label type-hint type-hint-function">string</a></td>
            <td>The subheadline of the banner</td>
        </tr> 
        <tr>
            <td>actions</td><td><a href="" class="label type-hint type-hint-function">array</a></td>
            <td>This configures icons located on the far right side of the banner.

                <ul>
                    <li> `icon` — This click callback function. Use the material icon name to specify the type of icon.
                    <li> `type` — 'submit' Used to submit forms (optional)
                    <li> `click` — This click callback function (optional)                    
                </ul>
            </td>
        </tr>
        </tbody></table>
     */

    var banner = function ($compile, fsBanner, $timeout, $window) {
        return {
            templateUrl: 'views/directives/banner.html',
            restrict: 'E',
            replace: false,
            transclude: true,
            scope: {
                options: "=fsOptions"
            },
            link: function ($scope, element, attr) {


                $timeout(function() {
                    var actions = angular.element(element).find('.actions');

                    var top = actions.offset().top - angular.element('.header .md-toolbar-tools').height();                 

                    angular.element($window).bind("scroll", function() {
                        if (this.pageYOffset >= top) {
                            actions.addClass('fixed');
                        } else {
                            actions.removeClass('fixed');
                        }
                    });

                });

                $scope.options = fsBanner.create($scope.options).options();

                var avatarAction = angular.element(document.querySelector('.action-icon'));
  
                if($scope.options.avatar.action.upload) {

                    avatarAction.removeAttr('ng-transclude');
                   
                    angular.forEach($scope.options.avatar.action.upload,function(value, name) {
                        
                        if(name=='select')
                            return;

                        avatarAction.attr(name,value);
                    });

                    avatarAction.attr('ngf-select','upload($files)');
                    $compile(avatarAction)($scope);
                }

                $scope.upload = function(file) {
                    $scope.options.avatar.action.upload.select(file);
                }

                $scope.actionClick = function(action, $event) {
          
                    $event.stopPropagation();

                    if(action.type=='submit') {
                        var form = angular.element(document.querySelector('form[name="' + action.options.form + '"]'));

                        if(form.length) {
                            form.attr('action','javascript:;');
                        
                            $timeout(function() {
                                angular.element(form).trigger('submit');
                            });
                        }
                    
                    } else if(action.type=='click') { 
                        action.func();
                    }
                }

                $scope.actionType = function(action) {

                    if(action.type=='submit' && !action.options.form) {
                        return 'submit';
                    }

                    return 'button';
                }
                
                $scope.click = function(func, $event) {
                    if(func) {
                        $event.stopPropagation();
                        func();
                    }
                }
            }
        };
    }

    angular.module('fs-angular-banner')
    .directive('banner',banner)
    .directive('fsBanner',banner)
    .directive('fsBannerBindCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {

                $scope.$watch(function () {
                    return $scope.$eval(attrs.fsBannerBindCompile);
                }, function (value) {
                    // In case value is a TrustedValueHolderType, sometimes it
                    // needs to be explicitly called into a string in order to
                    // get the HTML string.

                    element.html(value && value.toString());
                    // If scope is provided use it, otherwise use parent scope
                    var compileScope = $scope;
                    if (attrs.fsBannerBindCompileScope) {
                        
                        var scope = $scope.$eval(attrs.fsBannerBindCompileScope);
                        compileScope = scope.constructor.name=='Scope' ? scope : angular.extend($scope,scope);
                    }

                    $compile(element.contents())(compileScope);
                });
            }
        };
    }]);    
})();
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

            this.addSubmitAction = function(icon, form, options) {
                var options = options || {};
                options.form = form;
                this.addAction(icon, null, 'submit', options);
            };

            this.addClickAction = function(icon, func, options) {
                this.addAction(icon, func, 'click', options);
            };

            this.addActionTemplate = function(template, scope, options) {
                var options = options || {};
                var action = {  options: options,
                                template: template,
                                type: 'template',
                                scope: scope };

                this._options.actions.push(action);
            };


            this.addAction = function(icon, func, type, options) {
                var options = options || {};
                var action = {  func: func,
                                icon: icon,
                                options: options,
                                type: type || 'click' };

                this._options.actions.push(action);
            };

            this.headline = function(headline) {
                this._options.headline = headline;
            };

            this.headlineTemplate = function(template, scope) {
                this._options.headline = { template: template, scope: scope };
            };

            this.subheadline = function(subheadline) {
                this._options.subheadline = subheadline;
            };

            this.subheadlineTemplate = function(template, scope) {
                this._options.subheadline = { template: template, scope: scope };
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
angular.module('fs-angular-banner').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/banner.html',
    "<md-toolbar layout=\"row\" layout-align=\"start center\" style=\"{{ options.styles }}\">\r" +
    "\n" +
    "    <div class=\"avatar\" ng-class=\"{ clickable: options.avatar.click }\" ng-click=\"click(options.avatar.click, $event)\">\r" +
    "\n" +
    "        <md-button ng-show=\"options.avatar.action.icon\" class=\"md-fab action-icon\">\r" +
    "\n" +
    "            <md-icon>{{options.avatar.action.icon}}</md-icon>\r" +
    "\n" +
    "        </md-button>\r" +
    "\n" +
    "        <div class=\"icon\" ng-show=\"options.avatar.image\" style=\"background-image: url('{{options.avatar.image}}')\"></div>\r" +
    "\n" +
    "        <div class=\"icon\" ng-show=\"!options.avatar.image\">\r" +
    "\n" +
    "            <md-icon>{{options.avatar.icon}}</md-icon>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <div class=\"headline\" ng-if=\"options.headline.template\" fs-banner-bind-compile=\"options.headline.template\" fs-banner-bind-compile-scope=\"options.headline.scope\"></div>\r" +
    "\n" +
    "        <div class=\"headline\" ng-if=\"!options.headline.template\">{{options.headline}}</div>\r" +
    "\n" +
    "        <div ng-if=\"options.subheadline.template\" fs-banner-bind-compile=\"options.subheadline.template\" fs-banner-bind-compile-scope=\"options.subheadline.scope\" class=\"subheadline\"></div>\r" +
    "\n" +
    "        <div class=\"subheadline\" ng-if=\"!options.subheadline.template\">{{options.subheadline}}</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"actions\">\r" +
    "\n" +
    "        <span style=\"display: inline-flex;\" ng-repeat=\"action in options.actions\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <span ng-if=\"action.type=='template'\" fs-banner-bind-compile=\"action.template\" fs-banner-bind-compile-scope=\"action.scope\"></span>\r" +
    "\n" +
    "            <span ng-if=\"action.type=='submit' || action.type=='click'\">\r" +
    "\n" +
    "                <md-button class=\"md-fab md-accent\" aria-label=\"Save\" type=\"{{actionType(action)}}\" ng-click=\"actionClick(action, $event)\">\r" +
    "\n" +
    "                    <md-icon md-icon-set=\"material-icons\">{{action.icon}}</md-icon>\r" +
    "\n" +
    "                </md-button>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</md-toolbar>\r" +
    "\n"
  );

}]);
