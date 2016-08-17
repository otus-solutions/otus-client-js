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
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/ready',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }

                },
                config: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/config',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }

                },
                validation: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/validation',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }

                }

            });
        }

        return self;
    }

}());
