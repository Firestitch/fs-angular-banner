'use strict';

angular
.module('app', [
    'config',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngAnimate',
    'ngStorage',
    'mdo-angular-cryptography',
    'fs-angular-banner',
    'ngFileUpload'
])
.config(function ($routeProvider, $cryptoProvider, $mdThemingProvider) {
    $routeProvider
    .when('/demo', {
        templateUrl: 'views/demo.html',
        controller: 'DemoCtrl',
    })

    .when('/404', {
        templateUrl: 'views/404.html'
    })

    .otherwise({
        redirectTo: '/demo'
    });

	$mdThemingProvider.theme('default')
		.primaryPalette('blue-grey')
		.accentPalette('blue');

    $mdThemingProvider.alwaysWatchTheme(true);
})
.run(function () {

});
