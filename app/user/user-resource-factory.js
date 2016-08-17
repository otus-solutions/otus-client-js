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
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityProjectToken()
                    }
                },
                enable: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/enable',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityProjectToken()
                    }
                },
                disable: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/disable',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityProjectToken()
                    }
                }
            });
        }

        return self;
    }

}());
