(function () {
  'use strict';

  describe('ActivityResourceFactory', function () {

    var DATA = {'data': 'returnPromiseOK'};
    var METHOD_POST_VALUE = "POST";
    var METHOD_GET_VALUE = "GET";
    var METHOD_PUT_VALUE = "PUT";
    var ID_PARAMETER = { "id" : 1234567};
    var PARAMETER_ACTIVITY_ID = {"id" : "5c41c6b316da48006573a500"};
    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/participants/activities';
    var SUFFIX_WITH_ID = '/participants/activities/1234567';
    var ACTIVITY_REVISION = '/revision';
    var ACTIVITY_REVISION_WITH_ID = '/5c41c6b316da48006573a500';
    var DATA_CONFIRMATION = 'returnPromiseOK';

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function(_$injector_){
        factory = _$injector_.get('otus.client.ActivityResourceFactory');
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
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + ACTIVITY_REVISION).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + ACTIVITY_REVISION + ACTIVITY_REVISION_WITH_ID).respond(200, DATA);
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
        expect(factoryResult.create).toBeDefined();
        expect(factoryResult.update).toBeDefined();
        expect(factoryResult.listAll).toBeDefined();
        expect(factoryResult.getById).toBeDefined();
        expect(factoryResult.deleteById).toBeDefined();
        expect(factoryResult.addActivityRevision).toBeDefined();
        expect(factoryResult.getActivityRevisions).toBeDefined();
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

        it('listAllMethod check', function () {
          var listAll = factoryResult.listAll();
          listAll.$promise.then(function (resultListAll) {
            expect(resultListAll.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getById check', function () {
          var getById = factoryResult.getById(ID_PARAMETER);
          getById.$promise.then(function (resultGetById) {
            expect(resultGetById.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('deleteById check', function () {
          var deleteById = factoryResult.deleteById(ID_PARAMETER);
          deleteById.$promise.then(function (resultDeleteById) {
            expect(resultDeleteById.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('addActivityRevisionMethod check', function () {
          var addActivityRevision = factoryResult.addActivityRevision();
          addActivityRevision.$promise.then(function (resultAddActivityRevision) {
            expect(resultAddActivityRevision.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getActivityRevisionsMethod check', function () {
          var getActivityRevisions = factoryResult.getActivityRevisions(PARAMETER_ACTIVITY_ID);
          getActivityRevisions.$promise.then(function (resultGetActivityRevision) {
            expect(resultGetActivityRevision.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });

}());