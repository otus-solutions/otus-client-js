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
        self.setSecurityProjectToken = setSecurityProjectToken;
        self.getRestPrefix = getRestPrefix;
        self.getSecurityToken = getSecurityToken;
        self.getSecurityProjectToken = getSecurityProjectToken;
        self.removeSecurityProjectToken = removeSecurityProjectToken;
        self.removeSecurityToken = removeSecurityToken;
        self.init = init;
        self.reset = reset;
        self.hasToken = hasToken;

        self.init();

        function init() {
            HOSTNAME = 'http://' + $window.location.hostname;
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

        function removeSecurityProjectToken() {
            delete $window.sessionStorage[TOKEN_PROJECT_NAME];
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

        function setSecurityProjectToken(securityProjectToken) {
            $window.sessionStorage[TOKEN_PROJECT_NAME] = securityProjectToken;
        }

        function getSecurityProjectToken() {
            return $window.sessionStorage[TOKEN_PROJECT_NAME];
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
        'otus.client.UserResourceFactory'
    ];

    function OtusRestResourceService(OtusInstallerResourceFactory, OtusAuthenticatorResourceFactory, OtusFieldCenterResourceFactory, OtusRestResourceContext, UserResourceFactory) {
        var self = this;

        self.resetConnectionData = resetConnectionData;
        self.initDefaultConnectionData = initDefaultConnectionData;
        self.removeSecurityProjectToken = removeSecurityProjectToken;
        self.removeSecurityToken = removeSecurityToken;
        self.setUrl = setUrl;
        self.setSecurityProjectToken = setSecurityProjectToken;
        self.setSecurityToken = setSecurityToken;
        self.getOtusInstallerResource = getOtusInstallerResource;
        self.getOtusAuthenticatorResource = getOtusAuthenticatorResource;
        self.getOtusFieldCenterResource = getOtusFieldCenterResource;
        self.getUserResource = getUserResource;
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

        function removeSecurityProjectToken() {
            OtusRestResourceContext.removeSecurityProjectToken();
        }

        function removeSecurityToken() {
            OtusRestResourceContext.removeSecurityToken();
        }

        function setUrl(url) {
            OtusRestResourceContext.setUrl(url);
        }

        function setSecurityProjectToken(token) {
            OtusRestResourceContext.setSecurityProjectToken(token);
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
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusAuthenticatorResourceFactory', OtusAuthenticatorResourceFactory);

    OtusAuthenticatorResourceFactory.$inject = ['$resource', 'OtusRestResourceContext'];

    function OtusAuthenticatorResourceFactory($resource, OtusRestResourceContext) {
        var SUFFIX = '/authentication';

        var self = this;
        self.create = create;

        function create() {
            return $resource({}, {}, {
                authenticate: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX,
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                },
                invalidate: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/invalidate',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                },
                authenticateProject: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/project',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityProjectToken()
                    }
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
        .factory('OtusFieldCenterResourceFactory', OtusFieldCenterResourceFactory);

    OtusFieldCenterResourceFactory.$inject = ['$resource', 'OtusRestResourceContext'];

    function OtusFieldCenterResourceFactory($resource, OtusRestResourceContext) {
        var SUFFIX = '/center';

        var self = this;
        self.create = create;

        function create() {
            return $resource({}, {}, {
                getAll: {
                    method: 'GET',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX,
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityProjectToken()
                    }
                },
                create: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX,
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityProjectToken()
                    }
                },
                update: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/update',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityProjectToken()
                    }
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

    OtusInstallerResourceFactory.$inject = ['$resource', 'OtusRestResourceContext'];

    function OtusInstallerResourceFactory($resource, OtusRestResourceContext) {
        var SUFFIX = '/installer';

        var self = this;
        self.create = create;

        function create() {
            return $resource({}, {}, {
                ready: {
                    method: 'GET',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/ready'
                },
                config: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/config'
                },
                validation: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/validation'
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
        'OtusRestResourceContext'
    ];

    function UserResourceFactory($resource, OtusRestResourceContext) {
        var SUFFIX = '/user';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            return $resource({}, {}, {
                create: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/signup',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                },
                exists: {
                    method: 'GET',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/exists',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                },
                logged: {
                    method: 'GET',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX,
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                },
                fetch: {
                    method: 'GET',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/fetch',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                },
                enable: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/enable',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                },
                disable: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/disable',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                }
            });
        }

        return self;
    }

}());
