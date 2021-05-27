(function () {
  'use strict';

  describe('ReferenceContactResourceFactory_UnitTest_Suite', function () {

    var METHOD_GET_VALUE = 'GET';
    var METHOD_POST_VALUE = 'POST';
    var METHOD_PUT_VALUE = 'PUT';
    var METHOD_DELETE_VALUE = 'DELETE';

    var PREFIX = 'http://localhost:8080/otus-rest/v01/reference-contact';

    var RN = '1234567';

    var GET_BY_RN_SUFFIX = '/' + RN;
    var DELETE_SUFFIX = "/1234567"

    var RN_PARAMETER = { 'rn': RN };
    var ID_PARAMETER = {'id': '1234567'};
    var JSON_DATA = {};
    var DATA_CONFIRMATION = 'returnPromiseOK';
    var DATA = { 'data': DATA_CONFIRMATION };

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.ReferenceContactResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_POST_VALUE, PREFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, PREFIX + GET_BY_RN_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, PREFIX + DELETE_SUFFIX).respond(200, DATA);
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
        expect(factoryResult.createReferenceContact).toBeDefined();
        expect(factoryResult.updateReferenceContact).toBeDefined();
        expect(factoryResult.getAllReferenceContacts).toBeDefined();
        expect(factoryResult.removeReferenceContact).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('createReferenceContact check', function () {
          factoryResult.createReferenceContact(JSON_DATA)
            .$promise.then(function (resultCreate) {
              expect(resultCreate.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('updateReferenceContact check', function () {
          factoryResult.updateReferenceContact(JSON_DATA)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('getAllReferenceContacts check', function () {
          factoryResult.getAllReferenceContacts(RN_PARAMETER)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('removeReferenceContact check', function () {
          var remove = factoryResult.removeReferenceContact(ID_PARAMETER);
          remove.$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });
      });
    });
  });

}());
