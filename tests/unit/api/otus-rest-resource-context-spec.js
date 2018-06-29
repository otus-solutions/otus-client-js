(function() {
  'use strict';

  describe('OtusRestResourceContext', function() {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var HOSTNAME_PREFIX = 'http://localhost:8080';
    var HOSTNAME_CHANGE = 'http: //localhost:2018'
    var RESET_CONTEXT = '/otus-rest/v01'
    var VERSION_PREFIX = '/v01';
    var VERSION_CHANGE = 'v02';
    var VERSION_RESULT_SET = '/v02';
    var URL_CHANGE = 'http://localhost:9881/otus-rest/v01'
    var CONTEXT_PREFIX = '/otus-rest';
    var CONTEXT_CHANGE = 'change-otus-context';
    var CONTEXT_RESULT_SET = '/change-otus-context';

    var context, window, urlParser;

    beforeEach(function() {
      angular.mock.module('otus.client');
      angular.mock.inject(function(_$injector_) {
        context = _$injector_.get('OtusRestResourceContext');
        window = _$injector_.get('$window');
        urlParser = _$injector_.get('UrlParser');
      });
    });

    it('contextExistence check', function() {
      expect(context).toBeDefined();
    });

    describe('contextInstance', function() {

      it('methodContextExistence check', function() {
        expect(context.init).toBeDefined();
        expect(context.hasToken).toBeDefined();
        expect(context.reset).toBeDefined();
        expect(context.removeSecurityToken).toBeDefined();
        expect(context.setUrl).toBeDefined();
        expect(context.setHostname).toBeDefined();
        expect(context.setContext).toBeDefined();
        expect(context.setVersion).toBeDefined();
        expect(context.getRestPrefix).toBeDefined();
        expect(context.getHostName).toBeDefined();
        expect(context.getContext).toBeDefined();
        expect(context.getVersion).toBeDefined();
        expect(context.setSecurityToken).toBeDefined();
        expect(context.getSecurityToken).toBeDefined();
      });

      describe('resourceMethods', function() {

        it('resetMethod check', function() {
          context.reset();
          expect(context.getRestPrefix()).toEqual(RESET_CONTEXT);
        });

        it('setUrlMethod check', function() {
          context.setUrl(URL_CHANGE);
          expect(context.getRestPrefix()).toEqual(URL_CHANGE);
        });

        it('setHostnameMethod check', function() {
          context.setHostname(HOSTNAME_CHANGE);
          expect(context.getHostName()).toEqual(HOSTNAME_CHANGE);
        });

        it('setContextMethod check', function() {
          context.setContext(CONTEXT_CHANGE);
          expect(context.getContext()).toEqual(CONTEXT_RESULT_SET);
        });

        it('setVersionMethod check', function() {
          context.setVersion(VERSION_CHANGE)
          expect(context.getVersion()).toEqual(VERSION_RESULT_SET);
        });

        it('getRestPrefixMethod check', function() {
          expect(context.getRestPrefix()).toEqual(REST_PREFIX);
        });

        it('getHostNameMethod check', function() {
          expect(context.getHostName()).toEqual(HOSTNAME_PREFIX);
        });

        it('getContextMethod check', function() {
          expect(context.getContext()).toEqual(CONTEXT_PREFIX);
        });

        it('getVersionMethod check', function() {
          expect(context.getVersion()).toEqual(VERSION_PREFIX);
        });

        it('hasToken equal true', function() {
          window.sessionStorage['outk'] = true;
          expect(context.hasToken()).toEqual(true);
        });
        it('hasToken equal false', function() {
          window.sessionStorage.clear();
          expect(context.hasToken()).toEqual(false);
        });
      });
    });
  });

}());
