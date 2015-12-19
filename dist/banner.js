(function () {
    'use strict';
    
	angular.module('fs-angular-prettytime',[]);


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
    angular.module('fs-angular-banner')
    .directive('banner', function () {
        return {
            templateUrl: './views/directives/banner.html',
            restrict: 'E',
            replace: false,
            scope: {
                options: "=bnOptions"
            },
            link: function ($scope, element, attr) {
                
                $scope.options.actions = $scope.options.actions || [];

                $scope.click = click;

                function click($event,func) {
                    if(func) {
                        $event.stopPropagation();
                        func();
                    }
                }
            }
        };
    });
})();

(function () {
    'use strict';

})();

angular.module('fs-angular-banner').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/directive.html',
    "<md-toolbar layout=\"row\" layout-align=\"start center\" class=\"banner\">\r" +
    "\n" +
    "    <div class=\"avatar\" ng-class=\"{ clickable: options.avatar.click }\" ng-click=\"click($event,options.avatar.click)\">\r" +
    "\n" +
    "        <a href ng-click=\"click(options.avatar.action.click)\" ng-show=\"options.avatar.action.icon\" class=\"action-icon\" layout=\"row\" layout-align=\"center center\">\r" +
    "\n" +
    "            <i class=\"material-icons\">{{options.avatar.action.icon}}</i>\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <div class=\"icon\">\r" +
    "\n" +
    "            <i class=\"material-icons\">{{options.avatar.icon}}</i>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <h3 class=\"md-headline username\">{{options.headline}}</h3>\r" +
    "\n" +
    "        <div class=\"subheadline\">{{options.subheadline}}</div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"actions\">\r" +
    "\n" +
    "        <md-button ng-repeat=\"action in options.actions\"\r" +
    "\n" +
    "            class=\"md-fab md-accent\"\r" +
    "\n" +
    "            aria-label=\"Save\"\r" +
    "\n" +
    "            type=\"{{action.type}}\"\r" +
    "\n" +
    "            ng-click=\"action.click()\"\r" +
    "\n" +
    "        >\r" +
    "\n" +
    "            <md-icon md-icon-set=\"material-icons\">{{action.icon}}</md-icon>\r" +
    "\n" +
    "            <!--\r" +
    "\n" +
    "            <md-icon md-icon-set=\"material-icons\" ng-if=\"userCtrl.fabIcon == 'success'\">check</md-icon>\r" +
    "\n" +
    "            <md-icon md-icon-set=\"material-icons\" ng-if=\"userCtrl.fabIcon == 'fail'\">error</md-icon>\r" +
    "\n" +
    "            -->\r" +
    "\n" +
    "        </md-button>\r" +
    "\n" +
    "    </div>        \r" +
    "\n" +
    "</md-toolbar>"
  );

}]);
