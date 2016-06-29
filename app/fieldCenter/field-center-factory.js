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
