(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('OtusRestResourceContext', OtusRestResourceContext);

    OtusRestResourceContext.$inject = ['$window', 'UrlParser'];

    function OtusRestResourceContext($window, UrlParser) {
        var self = this;
        var TOKEN_USER_NAME = 'outk';
        var TOKEN_PROJECT_NAME = 'optk';
        var HOSTNAME;
        var CONTEXT;
        var VERSION;

        self.setUrl = setUrl;
        self.setHostname = setHostname;
        self.setContext = setContext;
        self.setVersion = setVersion;
        self.setSecurityToken = setSecurityToken;
        self.setSecurityProjectToken = setSecurityProjectToken;
        self.getRestPrefix = getRestPrefix;
        self.getSecurityToken = getSecurityToken;
        self.getSecurityProjectToken = getSecurityProjectToken;
        self.removeSecurityProjectToken = removeSecurityProjectToken;
        self.removeSecurityToken = removeSecurityToken;
        self.init = init;
        self.reset = reset;

        self.init();

        function init() {
            HOSTNAME = 'http://' + $window.location.hostname;
            CONTEXT = '/otus-rest';
            VERSION = '/v01';
        }

        function reset() {
            HOSTNAME = '';
        }

        function removeSecurityToken() {
            delete $window.sessionStorage[TOKEN_USER_NAME];
        }

        function removeSecurityProjectToken() {
            delete $window.sessionStorage[TOKEN_PROJECT_NAME];
        }

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
            $window.sessionStorage[TOKEN_USER_NAME] = securityToken;
        }

        function setSecurityProjectToken(securityProjectToken) {
            $window.sessionStorage[TOKEN_PROJECT_NAME] = securityProjectToken;
        }

        function getSecurityProjectToken() {
            return $window.sessionStorage[TOKEN_PROJECT_NAME];
        }

        function getSecurityToken() {
            return $window.sessionStorage[TOKEN_USER_NAME];
        }
    }

}());
