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

    var banner = function ($compile, fsBanner, $timeout) {
        return {
            templateUrl: 'views/directives/banner.html',
            restrict: 'E',
            replace: false,
            transclude: true,
            scope: {
                options: "=fsOptions"
            },
            link: function ($scope, element, attr) {

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
    .directive('fsBanner',banner);
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
angular.module('fs-angular-banner').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/banner.html',
    "\r" +
    "\n" +
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
    "        <h1 class=\"headline\">{{options.headline}}</h1>\r" +
    "\n" +
    "        <h2 class=\"subheadline\">{{options.subheadline}}</h2>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"actions\">\r" +
    "\n" +
    "        <md-button ng-repeat=\"action in options.actions\" class=\"md-fab md-accent\" aria-label=\"Save\" type=\"{{action.type}}\" ng-click=\"action.click($event)\">\r" +
    "\n" +
    "            <md-icon md-icon-set=\"material-icons\">{{action.icon}}</md-icon>\r" +
    "\n" +
    "        </md-button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</md-toolbar>\r" +
    "\n"
  );

}]);
