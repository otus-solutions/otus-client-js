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
