(function() {
    'use strict';

    angular.module('otus.client', ['ngResource']);

})();

(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('OtusRestResourceService', OtusRestResourceService);

    OtusRestResourceService.$inject = ['OtusInstallerResourceFactory', 'OtusAuthenticatorResourceFactory', '$window'];

    function OtusRestResourceService(OtusInstallerResourceFactory, OtusAuthenticatorResourceFactory, $window) {
        var HOSTNAME = 'http://' + $window.location.hostname;
        var CONTEXT = '/otus-rest';
        var VERSION = '/v01';


        var self = this;
        self.getOtusInstallerResource = getOtusInstallerResource;
        self.getOtusAuthenticatorResource = getOtusAuthenticatorResource;
        self.setSecurityToken = setSecurityToken;

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
