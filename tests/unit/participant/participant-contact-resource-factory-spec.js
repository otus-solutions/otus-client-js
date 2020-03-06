(function () {
  'use strict';

  describe('ParticipantContactResourceFactory', function () {

    var METHOD_GET_VALUE = 'GET';
    var METHOD_POST_VALUE = 'POST';
    var METHOD_PUT_VALUE = 'PUT';
    var METHOD_DELETE_VALUE = 'DELETE';

    var PREFIX = 'http://localhost:8080/otus-rest/v01/participant-contacts';
    var UPDATE_MAIN_CONTACT_SUFFIX = '/update-main';
    var ADD_SECONDARY_CONTACT_SUFFIX = '/add-secondary';
    var UPDATE_SECONDARY_CONTACT_SUFFIX = '/update-secondary';
    var SWAP_MAIN_CONTACT_SUFFIX = '/swap';
    var DELETE_SECONDARY_CONTACT_SUFFIX = '/secondary';
    var ID = '5efd';
    var ID_SUFFIX = '/'+ID;
    var ID_PARAMETER = { "id" : ID };
    var RN = '1234567';
    var GET_BY_RN_SUFFIX = '/rn/'+RN;
    var RN_PARAMETER = {'rn': RN};
    var DTO_JSON_DATA = {};
    var DATA_CONFIRMATION = 'returnPromiseOK';
    var DATA = {'data': DATA_CONFIRMATION};

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.ParticipantContactResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_POST_VALUE, PREFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + UPDATE_MAIN_CONTACT_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + ADD_SECONDARY_CONTACT_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + UPDATE_SECONDARY_CONTACT_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + SWAP_MAIN_CONTACT_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, PREFIX + ID_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, PREFIX + DELETE_SECONDARY_CONTACT_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, PREFIX + ID_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, PREFIX + GET_BY_RN_SUFFIX).respond(200, DATA);
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
        expect(factoryResult.updateMainContact).toBeDefined();
        expect(factoryResult.addSecondaryContact).toBeDefined();
        expect(factoryResult.updateSecondaryContact).toBeDefined();
        expect(factoryResult.swapMainContactWithSecondary).toBeDefined();
        expect(factoryResult.delete).toBeDefined();
        expect(factoryResult.deleteSecondaryContact).toBeDefined();
        expect(factoryResult.get).toBeDefined();
        expect(factoryResult.getByRecruitmentNumber).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('create check', function () {
          var create = factoryResult.create();
          create.$promise.then(function (resultCreate) {
            expect(resultCreate.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateMainContact check', function () {
          var update = factoryResult.updateMainContact(DTO_JSON_DATA);
          update.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('addSecondaryContact check', function () {
          var addSecondaryContact = factoryResult.addSecondaryContact(DTO_JSON_DATA);
          addSecondaryContact.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateSecondaryContact check', function () {
          var updateSecondaryContact = factoryResult.updateSecondaryContact(DTO_JSON_DATA);
          updateSecondaryContact.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('swapMainContactWithSecondary check', function () {
          var swapMainContactWithSecondary = factoryResult.swapMainContactWithSecondary(DTO_JSON_DATA);
          swapMainContactWithSecondary.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('delete check', function () {
          var deleteMethod = factoryResult.delete(ID_PARAMETER);
          deleteMethod.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('deleteSecondaryContact check', function () {
          var deleteSecondaryContact = factoryResult.deleteSecondaryContact(DTO_JSON_DATA);
          deleteSecondaryContact.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getMethod check', function () {
          var get = factoryResult.get(ID_PARAMETER);
          get.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getByRecruitmentNumberMethod check', function () {
          var getByRecruitmentNumber = factoryResult.getByRecruitmentNumber(RN_PARAMETER);
          getByRecruitmentNumber.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });

}());