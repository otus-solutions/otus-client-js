(function(){
  'use strict';

  describe('UserActivityPendencyFactory', function () {

    var DATA = {'data': 'returnPromiseOK'};
    var METHOD_POST_VALUE = "POST";
    var METHOD_GET_VALUE = "GET";
    var METHOD_PUT_VALUE = "PUT";
    var ID_PARAMETER = { "id" : 1234567 };
    var STATE_PARAMETER = { "state": "someState" };
    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/pendency/user-activity-pendency';
    var SUFFIX_WITH_ID = SUFFIX + '/1234567';
    var SUFFIX_WITH_ID_STATE = SUFFIX_WITH_ID + '/someState';
    var DATA_CONFIRMATION = 'returnPromiseOK';

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function(){
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.UserActivityPendencyFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX_WITH_ID).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_WITH_ID).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_WITH_ID_STATE).respond(200, DATA);
      });
    });

    it('factoryExistence check', function() {
      expect(factory).toBeDefined();
    });

    it('createMethodExistence check', function() {
      expect(factory.create).toBeDefined();
    });

    describe('factoryInstance', function () {

      beforeEach(function () {
        factoryResult = factory.create();
      });

      it('internalCalls check', function () {
        expect(otusRestResourceContext.getRestPrefix).toHaveBeenCalledTimes(1);
        expect(otusRestResourceContext.getSecurityToken).toHaveBeenCalledTimes(1);
        expect(headerBuilderFactory.create).toHaveBeenCalledTimes(1);
      });

      it('methodFactoryExistence check', function () {
        expect(factoryResult.create).toBeDefined();
        expect(factoryResult.update).toBeDefined();
        expect(factoryResult.getAll).toBeDefined();
        expect(factoryResult.deleteById).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('createMethod check', function () {
          var create = factoryResult.create();
          create.$promise.then(function (resultCreate) {
            expect(resultCreate.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateMethod check', function () {
          var update = factoryResult.update(ID_PARAMETER);
          update.$promise.then(function (resultUpdate) {
            expect(resultUpdate.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getMethod check', function () {
          var get = factoryResult.get(ID_PARAMETER, STATE_PARAMETER);
          get.$promise.then(function (resultGetAll) {
            expect(resultGetAll.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('deleteMethod check', function () {
          var deleteById = factoryResult.delete(ID_PARAMETER);
          deleteById.$promise.then(function (resultDeleteById) {
            expect(resultDeleteById.data).toEqual(DATA_CONFIRMATION);
          });
        });

      });

    });

  });

}());
