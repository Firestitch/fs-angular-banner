'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope, fsBanner) {

  	var banner = fsBanner.create();
    banner.background('http://tri-niche.com/wp-content/uploads/2015/01/Gradient-1.jpg');
    banner.headline('Headline');
   	banner.avatarIcon('person');
    banner.subheadline('Subheadline');
    banner.avatarImage('https://images.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png');
    banner.avatarActionUpload('photo_camera',
                                function(file) {
                                	alert('upload()');
                                    /*
                                    meService.avatar(file[0])
                                    .then(function(user) {
                                        $scope.avatarImage(user.avatar.small);
                                        fsAlert.success('Your avatar has been updated successfully.');
                                    });
									*/
                                }, { 'ngf-accept': 'image/*' });

    banner.addAction('save',
                            function() {
                                alert('save()');
                            });

    $scope.bannerOptions = banner.options();
});
