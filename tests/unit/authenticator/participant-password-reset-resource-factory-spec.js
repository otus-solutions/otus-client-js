(function () {
  'use strict';

  describe('ParticipantPasswordRecoveryResourceFactory', function () {
    var METHOD_GET_VALUE = "GET";
    var METHOD_POST_VALUE = "POST";
    var METHOD_PUT_VALUE = "PUT";
    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/participants/password-reset';
    var SUFFIX_LINK =  SUFFIX +'-link';
    var VALIDATE_TOKEN_SUFFIX = '/validate';
    var USER_EMAIL = 'otus@otus.com';
    var DATA = { 'data': 'returnPromiseOK' };
    var DATA_CONFIRMATION = 'returnPromiseOK';

    var factory, resource, otusRestResourceContext, headerBuilderFactory;
    var factoryResult, httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.ParticipantPasswordResetResourceFactory');
        resource = _$injector_.get('$resource');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + VALIDATE_TOKEN_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX_LINK).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_LINK + VALIDATE_TOKEN_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX_LINK).respond(200, DATA);
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
      });
    });

    it('factoryExistence check', function () {
      expect(factory).toBeDefined();
    });

    describe('factoryInstance', function () {

      it('createMethodExistence check', function () {
        expect(factory.create).toBeDefined();
      });

      beforeEach(function () {
        factoryResult = factory.create();

      });

      it('internalCalls check', function () {
        expect(otusRestResourceContext.getRestPrefix).toHaveBeenCalledTimes(1);
        expect(otusRestResourceContext.getSecurityToken).toHaveBeenCalledTimes(1);
        expect(headerBuilderFactory.create).toHaveBeenCalledTimes(1);
      });

      it('methodFactoryExistence check', function () {
        expect(factoryResult.requestRecovery).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('getRecoveryMethod check', function () {
          var requestRecovery = factoryResult.requestRecovery(USER_EMAIL);
          requestRecovery.$promise.then(function (resultRecovery) {
            expect(resultRecovery.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getRecoveryLinkMethod check', function () {
          var requestRecoveryLink = factoryResult.requestRecoveryLink(USER_EMAIL);
          requestRecoveryLink.$promise.then(function (resultRecovery) {
            expect(resultRecovery.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });

}());