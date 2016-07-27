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
            console.log("create chamado!");
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
