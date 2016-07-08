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
        var HOSTNAME = 'http://' + $window.location.hostname;
        var CONTEXT = '/otus-rest';
        var VERSION = '/v01';
        var TOKEN = '';
        var PROJECT_TOKEN = '';

        var self = this;
        self.setUrl = setUrl;
        self.setHostname = setHostname;
        self.setContext = setContext;
        self.setVersion = setVersion;
        self.setSecurityToken = setSecurityToken;
        self.setSecurityProjectToken = setSecurityProjectToken;
        self.getRestPrefix = getRestPrefix;
        self.getSecurityToken = getSecurityToken;
	self.getSecurityProjectToken = getSecurityProjectToken;

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
            TOKEN = securityToken;
        }

        function setSecurityProjectToken(securityProjectToken) {
            PROJECT_TOKEN = securityProjectToken;
        }

        function getSecurityProjectToken() {
            return PROJECT_TOKEN;
        }

        function getSecurityToken() {
            return TOKEN;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('OtusRestResourceService', OtusRestResourceService);

    OtusRestResourceService.$inject = ['OtusInstallerResourceFactory', 'OtusAuthenticatorResourceFactory', 'OtusFieldCenterResourceFactory', 'OtusRestResourceContext'];

    function OtusRestResourceService(OtusInstallerResourceFactory, OtusAuthenticatorResourceFactory, OtusFieldCenterResourceFactory, OtusRestResourceContext) {
        var self = this;
        self.getOtusInstallerResource = getOtusInstallerResource;
        self.getOtusAuthenticatorResource = getOtusAuthenticatorResource;
        self.getOtusFieldCenterResource = getOtusFieldCenterResource;
        self.setUrl = setUrl;
	self.setSecurityProjectToken = setSecurityProjectToken;
	self.setSecurityToken = setSecurityToken;

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
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
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
                }
            });
        }

        return self;
    }

}());
