(function(){
  'use strict';

  describe('UserActivityPendencyResourceFactory', function () {

    var DATA = {'data': 'returnPromiseOK'};
    var METHOD_POST_VALUE = "POST";
    var METHOD_GET_VALUE = "GET";
    var METHOD_PUT_VALUE = "PUT";
    var METHOD_DELETE_VALUE = "DELETE";
    var ID_PARAMETER = { "id" : 1234567 };
    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/pendency/user-activity-pendency';
    var SUFFIX_WITH_ID = SUFFIX + '/1234567';
    var SUFFIX_GET_LIST = SUFFIX + "/list";
    var SUFFIX_GET_LIST_RECEIVER = SUFFIX_GET_LIST + "/receiver";
    var SUFFIX_GET_LIST_REQUESTER = SUFFIX_GET_LIST + "/requester";
    var SUFFIX_GET_LIST_OPENED_RECEIVER = SUFFIX_GET_LIST_RECEIVER + "/opened";
    var SUFFIX_GET_LIST_DONE_RECEIVER = SUFFIX_GET_LIST_RECEIVER + "/done";
    var SUFFIX_GET_LIST_OPENED_REQUESTER = SUFFIX_GET_LIST_REQUESTER + "/opened";
    var SUFFIX_GET_LIST_DONE_REQUESTER = SUFFIX_GET_LIST_REQUESTER + "/done";
    var DATA_CONFIRMATION = 'returnPromiseOK';

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function(){
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.UserActivityPendencyResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX_WITH_ID).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_LIST_RECEIVER ).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_LIST_OPENED_RECEIVER ).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_LIST_DONE_RECEIVER ).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_LIST_REQUESTER).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_LIST_OPENED_REQUESTER).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_LIST_DONE_REQUESTER).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX_WITH_ID).respond(200, DATA);
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
        expect(factoryResult.getAllPendenciesToReceiver).toBeDefined();
        expect(factoryResult.getOpenedPendenciesToReceiver).toBeDefined();
        expect(factoryResult.getDonePendenciesToReceiver).toBeDefined();
        expect(factoryResult.getAllPendenciesFromRequester).toBeDefined();
        expect(factoryResult.getOpenedPendenciesFromRequester).toBeDefined();
        expect(factoryResult.getDonePendenciesFromRequester).toBeDefined();
        expect(factoryResult.getByActivityId).toBeDefined();
        expect(factoryResult.delete).toBeDefined();
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

        it('deleteMethod check', function () {
          var deleteById = factoryResult.delete(ID_PARAMETER);
          deleteById.$promise.then(function (resultDeleteById) {
            expect(resultDeleteById.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getAllPendenciesMethod check', function () {
          var get = factoryResult.getAllPendenciesToReceiver();
          get.$promise.then(function (resultGetAll) {
            expect(resultGetAll.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getOpenedPendenciesMethod check', function () {
          var get = factoryResult.getOpenedPendenciesToReceiver();
          get.$promise.then(function (resultGetAll) {
            expect(resultGetAll.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getDonePendenciesToReceiverMethod check', function () {
          var get = factoryResult.getDonePendenciesToReceiver();
          get.$promise.then(function (resultGetAll) {
            expect(resultGetAll.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getAllPendenciesRquesterMethod check', function () {
          var get = factoryResult.getAllPendenciesFromRequester();
          get.$promise.then(function (resultGetAll) {
            expect(resultGetAll.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getOpenedPendenciesRquesterMethod check', function () {
          var get = factoryResult.getOpenedPendenciesFromRequester();
          get.$promise.then(function (resultGetAll) {
            expect(resultGetAll.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getDonePendenciesRquesterMethod check', function () {
          var get = factoryResult.getDonePendenciesFromRequester();
          get.$promise.then(function (resultGetAll) {
            expect(resultGetAll.data).toEqual(DATA_CONFIRMATION);
          });
        });

      });

    });

  });

}());

