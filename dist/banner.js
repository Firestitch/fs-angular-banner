
(function () {
    'use strict';

  /**
    * @ngdoc directive
    * @name app.service:fs-banner
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

    var banner = ['$compile','fsBanner','$timeout','$window',function ($compile, fsBanner, $timeout, $window) {
        return {
 templateUrl: 'views/directives/banner.html',
 restrict: 'E',
 replace: false,
 transclude: true,
 scope: {
     options: "=?fsOptions",
     instance: "=?fsInstance"
 },
 controller: function($scope) {

     if(!$scope.instance || angular.equals({}, $scope.instance)) {
         $scope.instance = fsBanner.create($scope.options);
     }
     
     $scope.$watch('instance.options',function(options) {
         $scope.options = $scope.instance.options();
     });

     $scope.upload = function(file) {
         $scope.options.avatar.action.upload.select(file);
     }

     $scope.actionClick = function(action, $event) {
          
         $event.stopPropagation();

         if(action.type=='submit') {
  var form = angular.element(document.querySelector('form[name="' + action.options.form + '"]'));

  if(form.length) {
      form.attr('action','javascript:;');
  
      var button = angular.element('<button>',{ type: 'submit', style: 'display:none' });

      form.append(button);
      
      $timeout(function() {
          button[0].click();
          button.remove();
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
 },
 link: function ($scope, element, attr) {

     var scroll = function() {

         if (this.pageYOffset >= top) {
  actions.addClass('fixed');
         } else {
  actions.removeClass('fixed');
         }
     }

     var actions = angular.element(element[0].querySelector('.actions'));
     var top = actions.prop('offsetTop') + actions.prop('offsetTop');

     angular.element($window).on("scroll",scroll);

     $scope.$on('$destroy', function () {
         angular.element($window).off("scroll",scroll);
     });     
 }
        };
    }];

    angular.module('fs-angular-banner',[])
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
  if(scope) {
      //If this is already a scope variable use it other wise extend the current scope
      compileScope = scope.$id ? scope : angular.extend($scope,scope);
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
angular.module('fs-angular-banner').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/banner.html',
    "<div layout=\"row\" layout-align=\"start center\" style=\"{{ options.styles }}\">\r" +
    "\n" +
    "    <div class=\"avatar\" ng-class=\"{ clickable: options.avatar.click }\" ng-click=\"click(options.avatar.click, $event)\">\r" +
    "\n" +
    "        <md-button ng-show=\"options.avatar.action.icon && options.avatar.action.upload\" class=\"md-fab action-icon\" ngf-select=\"upload($files)\">\r" +
    "\n" +
    "            <md-icon>{{options.avatar.action.icon}}</md-icon>\r" +
    "\n" +
    "        </md-button>\r" +
    "\n" +
    "        <md-button ng-show=\"options.avatar.action.icon && !options.avatar.action.upload\" class=\"md-fab action-icon\">\r" +
    "\n" +
    "            <md-icon>{{options.avatar.action.icon}}</md-icon>\r" +
    "\n" +
    "        </md-button>\r" +
    "\n" +
    "        <div class=\"icon\" ng-if=\"options.avatar.image\" style=\"background-image: url('{{options.avatar.image}}')\"></div>\r" +
    "\n" +
    "        <div class=\"icon\" ng-show=\"!options.avatar.image\">\r" +
    "\n" +
    "            <md-icon>{{options.avatar.icon}}</md-icon>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div flex>\r" +
    "\n" +
    "        <div ng-if=\"options.superheadline.template\" fs-banner-bind-compile=\"options.superheadline.template\" fs-banner-bind-compile-scope=\"options.superheadline.scope\" class=\"superheadline\"></div>\r" +
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
    "    <div class=\"actions\" layout=\"row\"   layout-align=\"end center\">\r" +
    "\n" +
    "        <span class=\"action\" ng-repeat=\"action in options.actions\">\r" +
    "\n" +
    "            <span ng-if=\"action.type=='template'\" fs-banner-bind-compile=\"action.options.template\" fs-banner-bind-compile-scope=\"action.options.scope\"></span>\r" +
    "\n" +
    "            <span ng-if=\"action.type=='submit' || action.type=='click'\">            \r" +
    "\n" +
    "                <md-button class=\"md-fab\" ng-class=\"{ 'md-accent': action.primary, 'md-mini': action.options.mini }\" aria-label=\"Save\" type=\"{{actionType(action)}}\" ng-click=\"actionClick(action, $event)\">\r" +
    "\n" +
    "                    <md-icon md-icon-set=\"material-icons\">{{action.icon}}</md-icon>\r" +
    "\n" +
    "                </md-button>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);
