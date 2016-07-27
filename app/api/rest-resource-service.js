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
        self.removeSecurityProjectToken = removeSecurityProjectToken;
        self.removeSecurityToken = removeSecurityToken;
        self.resetConnectionData = resetConnectionData;
        self.initDefaultConnectionData = initDefaultConnectionData;

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
            console.log("getOtusInstallerResource chamado!");
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
