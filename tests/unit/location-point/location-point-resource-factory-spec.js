(function () {
  'use strict';

  describe('LocationPointResourceFactory', function () {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/laboratory-project/transport-location-point';

    var DATA = {'data': 'returnPromiseOK'};
    var DATA_CONFIRMATION = 'returnPromiseOK';
    var METHOD_GET_VALUE = "GET";
    var METHOD_POST_VALUE = "POST";
    var METHOD_PUT_VALUE = "PUT";
    var METHOD_DELETE_VALUE = "DELETE";

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.LocationPointResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + '/configuration').respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + '/add-user').respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX + '/remove-user').respond(200, DATA);
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
        expect(factoryResult.getConfiguration).toBeDefined();
        expect(factoryResult.createLocationPoint).toBeDefined();
        expect(factoryResult.updateLocationPoint).toBeDefined();
        expect(factoryResult.deleteLocationPoint).toBeDefined();
        expect(factoryResult.saveUserLocation).toBeDefined();
        expect(factoryResult.removeUserLocation).toBeDefined();
      });


      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('getConfiguration check', function () {
          var configuration = factoryResult.getConfiguration();
          configuration.$promise.then(function (resultConfig) {
            expect(resultConfig.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('createLocation check', function () {
          var create = factoryResult.createLocationPoint();
          create.$promise.then(function (resultCreate) {
            expect(resultCreate.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateLocation check', function () {
          var update = factoryResult.updateLocationPoint();
          update.$promise.then(function (resultUpdate) {
            expect(resultUpdate.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('deleteLocation check', function () {
          var deleteLocation = factoryResult.deleteLocationPoint();
          deleteLocation.$promise.then(function (resultDelete) {
            expect(resultDelete.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('saveUser check', function () {
          var create = factoryResult.saveUserLocation();
          create.$promise.then(function (resultCreate) {
            expect(resultCreate.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('removeUser check', function () {
          var remove = factoryResult.removeUserLocation();
          remove.$promise.then(function (resultRemove) {
            expect(resultRemove.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });

}());