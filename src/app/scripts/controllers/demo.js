'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope, fsBanner) {

  	$scope.bannerOptions = fsBanner.create()
                    //.background('http://tri-niche.com/wp-content/uploads/2015/01/Gradient-1.jpg')
                    .superheadline({ template: '<a href ng-click="alert()">Superheadline</a>', scope: { alert: function() { alert('!!!!!'); }} })
                    .headlineTemplate('Headline')
                   	.avatarIcon('person')
                    .subheadline('Subheadline')
                    .avatarImage('https://images.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png')
                    .avatarActionUpload('photo_camera',
                                                function(file) {
                                            $scope.bannerInstance.avatarImage('http://product-images.imshopping.com/nimblebuy/forest-glen-golf-centre-968482-1484562-regular.jpg');
                                        }, { 'ngf-accept': 'image/*' })
                    .addActionTemplate(['<md-fab-speed-dial md-direction="left" class="md-fling" md-open="false">',
                            '<md-fab-trigger>',
                                '<md-button aria-label="Add..." class="md-fab md-mini">',
                                    '<md-icon>settings</md-icon>',
                                '</md-button>',
                            '</md-fab-trigger>',
                            '<md-fab-actions>',
                                '<md-button aria-label="Add Event" class="md-fab md-raised md-mini md-primary" ng-click="doit()">',
                                    '<md-icon>add</md-icon>',
                                '</md-button>',
                                '<md-button aria-label="Environment" class="md-fab md-raised md-mini md-primary">',
                                    '<md-icon>language</md-icon>',
                                '</md-button>',
                            '</md-fab-actions>',
                        '</md-fab-speed-dial>'].join(''),
                        { doit: function() { alert("doit"); }})
                    .addClickAction('clear',
                            function() {
                                alert('save()');
                            },
                            { primary: false })
                    .addSubmitAction('add','form',{ tooltip: 'Add' })
                    .addSubmitAction('save','form',{ tooltip: 'Add' });

    $scope.text = '';
    $scope.bannerInstance = {};
    $scope.submit = function() {
        alert('submit');
    }
});
