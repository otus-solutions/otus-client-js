(function () {
  'use strict';

  describe('ActivityImportationResourceFactory', function () {

    var DATA = {'data': 'returnPromiseOK'};
    var METHOD_PUT_VALUE = "PUT";
    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/activities/import';
    var ACRONYM_SX = '/ABCD';
    var VERSION_SX = '/1';
    var ID_PARAMETER = { "acronym" : "ABCD", "version": 1};
    var DATA_CONFIRMATION = 'returnPromiseOK';

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function(_$injector_){
        factory = _$injector_.get('otus.client.ActivityImportationResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + ACRONYM_SX + VERSION_SX ).respond(200, DATA);
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
        expect(factoryResult.importActivities).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('importActivitiesMethod check', function () {
          var importActivities = factoryResult.importActivities(ID_PARAMETER);
          importActivities.$promise.then(function (resultImportActivities) {
            expect(resultImportActivities.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  })
}());