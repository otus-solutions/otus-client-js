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
        .service('OtusRestResourceService', OtusRestResourceService);

    OtusRestResourceService.$inject = ['OtusInstallerResourceFactory', 'OtusAuthenticatorResourceFactory', '$window', 'UrlParser'];

    function OtusRestResourceService(OtusInstallerResourceFactory, OtusAuthenticatorResourceFactory, $window, UrlParser) {
        var HOSTNAME = 'http://' + $window.location.hostname;
        var CONTEXT = '/otus-rest';
        var VERSION = '/v01';

        var self = this;
        self.getOtusInstallerResource = getOtusInstallerResource;
        self.getOtusAuthenticatorResource = getOtusAuthenticatorResource;
        self.setSecurityToken = setSecurityToken;
        self.setUrl = setUrl;
        self.setHostname = setHostname;
        self.setContext = setContext;
        self.setVersion = setVersion;

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

        function setSecurityToken(securityToken) {
            $window.sessionStorage.setItem('token', securityToken);
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

        function getOtusInstallerResource() {
            var prefix = getRestPrefix();
            return OtusInstallerResourceFactory.create(prefix);
        }

        function getOtusAuthenticatorResource() {
            var prefix = getRestPrefix();
            return OtusAuthenticatorResourceFactory.create(prefix);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusAuthenticatorResourceFactory', OtusAuthenticatorResourceFactory);

    OtusAuthenticatorResourceFactory.$inject = ['$resource', '$window'];

    function OtusAuthenticatorResourceFactory($resource, $window) {
        var SUFFIX = '/authentication';

        var self = this;
        self.create = create;

        function create(restPrefix) {
            return $resource({}, {}, {
                authenticate: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: {
                        'Authorization': 'Bearer ' + $window.sessionStorage.getItem('token')
                    }
                },
                invalidate: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/invalidate',
                    headers: {
                        'Authorization': 'Bearer ' + $window.sessionStorage.getItem('token')
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

    OtusInstallerResourceFactory.$inject = ['$resource'];

    function OtusInstallerResourceFactory($resource) {
        var SUFFIX = '/installer';

        var self = this;
        self.create = create;

        function create(restPrefix) {
            return $resource({}, {}, {
                ready: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/ready'
                },
                config: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/config'
                }
            });
        }

        return self;
    }

}());
