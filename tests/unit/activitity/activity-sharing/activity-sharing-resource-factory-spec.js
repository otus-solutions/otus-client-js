(function () {
  'use strict';

  describe('ActivitySharingResourceFactory', function () {

    var DATA = {'data': 'returnPromiseOK'};
    var METHOD_GET_VALUE = "GET";
    var METHOD_PUT_VALUE = "PUT";
    var METHOD_DELETE_VALUE = "DELETE";
    var ID_PARAMETER = { "id" : 1234567};
    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX_WITH_ID = '/activity-sharing/1234567';
    var DATA_CONFIRMATION = 'returnPromiseOK';

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function(_$injector_){
        factory = _$injector_.get('otus.client.ActivitySharingResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_WITH_ID).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX_WITH_ID).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX_WITH_ID).respond(200, DATA);
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
        expect(factoryResult.getSharedURL).toBeDefined();
        expect(factoryResult.renovateSharedURL).toBeDefined();
        expect(factoryResult.deleteSharedURL).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('getSharedURLMethod check', function () {
          var getSharedURL = factoryResult.getSharedURL(ID_PARAMETER);
          getSharedURL.$promise.then(function (resultGet) {
            expect(resultGet.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('renovateSharedURLMethod check', function () {
          var renovateSharedURL = factoryResult.renovateSharedURL(ID_PARAMETER);
          renovateSharedURL.$promise.then(function (resultUpdate) {
            expect(resultUpdate.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('deleteSharedURL check', function () {
          var deleteSharedURL = factoryResult.deleteSharedURL(ID_PARAMETER);
          deleteSharedURL.$promise.then(function (resultDeleteById) {
            expect(resultDeleteById.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  })
}());

