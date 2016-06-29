(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('OtusRestResourceContext', OtusRestResourceContext);

    OtusRestResourceContext.$inject = ['$window', 'UrlParser'];

    function OtusRestResourceContext($window, UrlParser) {
        var HOSTNAME = 'http://' + $window.location.hostname;
        var CONTEXT = '/otus-rest';
        var VERSION = '/v01';
        var TOKEN = '';
        var PROJECT_TOKEN = '';

        var self = this;
        self.setUrl = setUrl;
        self.setHostname = setHostname;
        self.setContext = setContext;
        self.setVersion = setVersion;
        self.setSecurityToken = setSecurityToken;
        self.setSecurityProjectToken = setSecurityProjectToken;
        self.getRestPrefix = getRestPrefix;
        self.getSecurityToken = getSecurityToken;
	self.getSecurityProjectToken = getSecurityProjectToken;

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
            TOKEN = securityToken;
        }

        function setSecurityProjectToken(securityProjectToken) {
            PROJECT_TOKEN = securityProjectToken;
        }

        function getSecurityProjectToken() {
            return PROJECT_TOKEN;
        }

        function getSecurityToken() {
            return TOKEN;
        }
    }

}());
