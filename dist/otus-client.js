(function() {
    'use strict';

    angular.module('otus.client', ['ngResource']);

})();

(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('UrlParser', UrlParser);

    function UrlParser() {
        var self = this;
        self.parser = parser;

        function parser(url) {
            var parserElement = document.createElement('a');
            parserElement.href = url;

            return parserElement;
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ActivityResourceFactory', ActivityResourceFactory);

    ActivityResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ActivityResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/survey';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                update: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/update',
                    headers: headers.json
                },
                list: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list',
                    headers: headers.json
                },
                remove: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/remove',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.HeaderBuilderFactory', factory);

    function factory() {
        var self = this;
        self.create = create;

        function create(token) {
            return new Headers(token);
        }

        return self;

    }

    function Headers(token) {
        var self = this;
        self.setContentType = setContentType;

        self.json = {
            'Authorization': 'Bearer ' + token
        };

        function setContentType(contentType) {
          self.json['Content-type'] = contentType;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('OtusRestResourceContext', OtusRestResourceContext);

    OtusRestResourceContext.$inject = ['$window', 'UrlParser'];

    function OtusRestResourceContext($window, UrlParser) {
        var self = this;

        var TOKEN_USER_NAME = 'outk';
        var TOKEN_PROJECT_NAME = 'optk';
        var HOSTNAME;
        var CONTEXT;
        var VERSION;

        self.setUrl = setUrl;
        self.setHostname = setHostname;
        self.setContext = setContext;
        self.setVersion = setVersion;
        self.setSecurityToken = setSecurityToken;
        self.getRestPrefix = getRestPrefix;
        self.getSecurityToken = getSecurityToken;
        self.removeSecurityToken = removeSecurityToken;
        self.init = init;
        self.reset = reset;
        self.hasToken = hasToken;

        self.init();

        function init() {
            HOSTNAME = 'http://' + $window.location.hostname + ':8080';
            CONTEXT = '/otus-rest';
            VERSION = '/v01';
        }

        function hasToken() {
            if ($window.sessionStorage[TOKEN_USER_NAME]) {
                return true;
            } else {
                return false;
            }
        }

        function reset() {
            HOSTNAME = '';
        }

        function removeSecurityToken() {
            delete $window.sessionStorage[TOKEN_USER_NAME];
        }

        function setUrl(url) {
            var parser = UrlParser.parser(url);
            HOSTNAME = parser.origin;
        }

        function setHostname(hostname) {
            HOSTNAME = hostname;
        }

        function setContext(context) {
            CONTEXT = '/' + context;
        }

        function setVersion(version) {
            VERSION = '/' + version;
        }

        function getRestPrefix() {
            return HOSTNAME + CONTEXT + VERSION;
        }

        function getHostName() {
            return HOSTNAME;
        }

        function getContext() {
            return CONTEXT;
        }

        function getVersion() {
            return VERSION;
        }

        function setSecurityToken(securityToken) {
            $window.sessionStorage[TOKEN_USER_NAME] = securityToken;
        }

        function getSecurityToken() {
            return $window.sessionStorage[TOKEN_USER_NAME];
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('OtusRestResourceService', OtusRestResourceService);

    OtusRestResourceService.$inject = [
        'OtusInstallerResourceFactory',
        'OtusAuthenticatorResourceFactory',
        'OtusFieldCenterResourceFactory',
        'OtusRestResourceContext',
        'otus.client.UserResourceFactory',
        'otusjs.otus.client.OtusProjectConfigurationResourceFactory',
        'otus.client.SurveyResourceFactory',
        'otus.client.ActivityResourceFactory',
        'otus.client.ParticipantResourceFactory'
    ];

    function OtusRestResourceService(
        OtusInstallerResourceFactory,
        OtusAuthenticatorResourceFactory,
        OtusFieldCenterResourceFactory,
        OtusRestResourceContext,
        UserResourceFactory,
        OtusProjectConfigurationResourceFactory,
        SurveyResourceFactory,
        ActivityResourceFactory,
        ParticipantResourceFactory
    ) {
        var self = this;

        self.resetConnectionData = resetConnectionData;
        self.initDefaultConnectionData = initDefaultConnectionData;
        self.removeSecurityToken = removeSecurityToken;
        self.setUrl = setUrl;
        self.setSecurityToken = setSecurityToken;
        self.getOtusInstallerResource = getOtusInstallerResource;
        self.getOtusAuthenticatorResource = getOtusAuthenticatorResource;
        self.getOtusFieldCenterResource = getOtusFieldCenterResource;
        self.getUserResource = getUserResource;
        self.getProjectConfigurationResource = getProjectConfigurationResource;
        self.getSurveyResource = getSurveyResource;
        self.getActivityResource = getActivityResource;
        self.getParticipantResource = getParticipantResource;
        self.isLogged = isLogged;

        function isLogged() {
            return OtusRestResourceContext.hasToken();
        }

        function resetConnectionData() {
            OtusRestResourceContext.reset();
        }

        function initDefaultConnectionData() {
            OtusRestResourceContext.init();
        }

        function removeSecurityToken() {
            OtusRestResourceContext.removeSecurityToken();
        }

        function setUrl(url) {
            OtusRestResourceContext.setUrl(url);
        }

        function setSecurityToken(token) {
            OtusRestResourceContext.setSecurityToken(token);
        }

        function getOtusInstallerResource() {
            return OtusInstallerResourceFactory.create();
        }

        function getOtusAuthenticatorResource() {
            return OtusAuthenticatorResourceFactory.create();
        }

        function getOtusFieldCenterResource() {
            return OtusFieldCenterResourceFactory.create();
        }

        function getUserResource() {
            return UserResourceFactory.create();
        }

        function getProjectConfigurationResource() {
            return OtusProjectConfigurationResourceFactory.create();
        }

        function getSurveyResource() {
            return SurveyResourceFactory.create();
        }

        function getActivityResource() {
            return ActivityResourceFactory.create();
        }

        function getParticipantResource() {
            return ParticipantResourceFactory.create();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusAuthenticatorResourceFactory', OtusAuthenticatorResourceFactory);

    OtusAuthenticatorResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function OtusAuthenticatorResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/authentication';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                authenticate: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                invalidate: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/invalidate',
                    headers: headers.json
                },
                authenticateProject: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/project',
                    headers: headers.json
                }
            });

        }

        return self;

    }

}());

(function() {
   'use strict';

   angular
      .module('otus.client')
      .factory('otusjs.otus.client.OtusProjectConfigurationResourceFactory', Factory);

   Factory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

   function Factory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
      var SUFFIX = '/configuration';

      var self = this;
      self.create = create;

      function create() {
         var restPrefix = OtusRestResourceContext.getRestPrefix();
         var token = OtusRestResourceContext.getSecurityToken();
         var headers = HeaderBuilderFactory.create(token);
         var headersPublishTemplate = HeaderBuilderFactory.create(token);
         headersPublishTemplate.setContentType('application/json; charset=utf-8');

         var config = {
            getSurveys: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/surveys',
               headers: headers.json
            },
            updateSurveyTemplateType: {
               method: 'PUT',
               url: restPrefix + SUFFIX + '/surveys/:acronym/type',
               data: {
                  'newSurveyFormType': '@newSurveyFormType'
               },
               headers: headers.json,
               params: {
                  'acronym': '@acronym'
               }
            },
            publishTemplate: {
               method: 'POST',
               url: restPrefix + SUFFIX + '/publish/template',
              //  interceptor: {
              //     'response': function (response) {console.log(response);}
              //  },
              //  data: {
              //     'template': '@template'
              //  },
               headers: headersPublishTemplate.json
            },
            deleteSurveyTemplate: {
               method: 'DELETE',
               url: restPrefix + SUFFIX + '/surveys/:acronym',
               headers: headers.json
            },
            getVisualIdentity: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/visual-identity',
               headers: headers.json
            },
            updateVisualIdentity: {
               method: 'POST',
               url: restPrefix + SUFFIX + '/visual-identity',
               headers: headers.json
            }
         };
         return $resource({}, {}, config);
      }
      return self;

   }
}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusFieldCenterResourceFactory', OtusFieldCenterResourceFactory);

    OtusFieldCenterResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function OtusFieldCenterResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/center';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                getAll: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list',
                    headers: headers.json
                },
                create: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                update: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/update',
                    headers: headers.json
                }

            });
        }

        return self;

    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusInstallerResourceFactory', OtusInstallerResourceFactory);

    OtusInstallerResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function OtusInstallerResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/installer';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                ready: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/ready',
                    headers: headers.json
                },
                config: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json

                },
                validationEmail: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/validation/email',
                    headers: headers.json
                }

            });
        }

        return self;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ParticipantResourceFactory', ParticipantResourceFactory);

    ParticipantResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ParticipantResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                list: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/participants',
                    isArray: true,
                    headers: headers.json
                },
                listIndexers: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list-indexers',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.SurveyResourceFactory', SurveyResourceFactory);

    SurveyResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function SurveyResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/survey';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                list: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.UserResourceFactory', UserResourceFactory);

    UserResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function UserResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/user';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                create: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/signup',
                    headers: headers.json
                },
                logged: {
                    method: 'GET',
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                list: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list',
                    headers: headers.json
                },
                enable: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/enable',
                    headers: headers.json
                },
                disable: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/disable',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());
