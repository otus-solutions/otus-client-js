(function () {
  'use strict';

  describe('OutcomeResourceFactory', function () {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/followUp';

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
        factory = _$injector_.get('otus.client.FollowUpResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + '/add').respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + '/list').respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + '/update').respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX + '/deactivate').respond(200, DATA);
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
        expect(factoryResult.add).toBeDefined();
        expect(factoryResult.update).toBeDefined();
        expect(factoryResult.list).toBeDefined();
        expect(factoryResult.deactivate).toBeDefined();
      });


      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('create check', function () {
          var add = factoryResult.add();
          add.$promise.then(function (resultCreate) {
            expect(resultCreate.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('update check', function () {
          var create = factoryResult.update();
          create.$promise.then(function (resultCreate) {
            expect(resultCreate.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('list check', function () {
          var create = factoryResult.list();
          create.$promise.then(function (resultCreate) {
            expect(resultCreate.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });

}());