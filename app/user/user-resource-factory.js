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
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX,
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                }
            });
        }

        return self;
    }

}());
