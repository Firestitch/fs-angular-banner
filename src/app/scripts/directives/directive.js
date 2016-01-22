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
                options: "=bnOptions"
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

    angular.module('app')
    .directive('banner',banner)
    .directive('fsBanner',banner);
})();
