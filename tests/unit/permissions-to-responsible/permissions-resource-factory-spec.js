(function () {
  'use strict';

  fdescribe('PermissionResourceFactory', function () {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/permission';
    // var PARTICIPANT_SX = '/participant';
    // var LIST_SX = '/list';
    var ID_SX = '/1234567';
    // var RN_SX = '/7654321';
    var DATA = {'data': 'returnPromiseOK'};
    var DATA_CONFIRMATION = 'returnPromiseOK';
    var ID_PARAMETER = {'id': 1234567};
    // var USER_PARAMETER = {'rn': 7654321};
    // var ID_RN_PARAMETER = {'id': 1234567,'rn': 7654321};
    var METHOD_GET_VALUE = "GET";
    var METHOD_POST_VALUE = "POST";
    var METHOD_PUT_VALUE = "PUT";
    // var METHOD_DELETE_VALUE = "DELETE";

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.PermissionResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + ID_SX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        // httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX + ID_SX).respond(200, DATA);
        // httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + PARTICIPANT_SX + LIST_SX +RN_SX).respond(200, DATA);
        // httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + PARTICIPANT_SX + RN_SX + ID_SX).respond(200, DATA);
        
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
        // expect(factoryResult.listAll).toBeDefined();
        expect(factoryResult.getAll).toBeDefined();
        expect(factoryResult.getById).toBeDefined();
        // expect(factoryResult.getByUser).toBeDefined();
        expect(factoryResult.update).toBeDefined();
        // expect(factoryResult.remove).toBeDefined();
        // expect(factoryResult.list).toBeDefined();
        // expect(factoryResult.getByRecruitmentNumber).toBeDefined();
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

        // it('listAllMethod check', function () {
        //   var listAll = factoryResult.listAll();
        //   listAll.$promise.then(function (resultListAll) {
        //     expect(resultListAll.data).toEqual(DATA_CONFIRMATION);
        //   });
        // });

        it('getAllMethod check', function () {
          var getAll = factoryResult.getAll();
          getAll.$promise.then(function (resultGetAll) {
            expect(resultGetAll.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getByIdMethod check', function () {
          var getById = factoryResult.getById(ID_PARAMETER);
          getById.$promise.then(function (resultGetById) {
            expect(resultGetById.data).toEqual(DATA_CONFIRMATION);
          });
        });

        //  it('getByUserMethod check', function () {
        //   var getByUser = factoryResult.getByUser(ID_PARAMETER);
        //   getByUser.$promise.then(function (resultGetByUser) {
        //     expect(resultGetByUser.data).toEqual(DATA_CONFIRMATION);
        //   });
        // });
        
        it('updateMethod check', function () {
          var update = factoryResult.update();
          update.$promise.then(function (resultUpdate) {
            expect(resultUpdate.data).toEqual(DATA_CONFIRMATION);
          });
        });

        // it('removeMethod check', function () {
        //   var remove = factoryResult.remove(ID_PARAMETER);
        //   remove.$promise.then(function (resultRemove) {
        //     expect(resultRemove.data).toEqual(DATA_CONFIRMATION);
        //   });
        // });
        
        // it('listMethod check', function () {
        //   var list = factoryResult.list(RN_PARAMETER);
        //   list.$promise.then(function (resultList) {
        //     expect(resultList.data).toEqual(DATA_CONFIRMATION);
        //   });
        // });

        // it('getByRecruitmentNumberMethod check', function () {
        //   var getByRecruitmentNumber = factoryResult.getByRecruitmentNumber(ID_RN_PARAMETER);
        //   getByRecruitmentNumber.$promise.then(function (resultgetByRecruitmentNumber) {
        //     expect(resultgetByRecruitmentNumber.data).toEqual(DATA_CONFIRMATION);
        //   });
        // });

      });
    });
  });

}());