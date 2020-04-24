(function () {
  'use strict';

  describe('ParticipantContactResourceFactory', function () {

    var METHOD_GET_VALUE = 'GET';
    var METHOD_POST_VALUE = 'POST';
    var METHOD_PUT_VALUE = 'PUT';
    var METHOD_DELETE_VALUE = 'DELETE';

    var PREFIX = 'http://localhost:8080/otus-rest/v01/participant/participant-contact';
    var ADD_NON_MAIN_CONTACT_SUFFIX = '/add-non-main';
    var UPDATE_CONTACT_SUFFIX = '/update';
    var SWAP_MAIN_CONTACT_SUFFIX = '/swap';
    var DELETE_NON_MAIN_CONTACT_SUFFIX = '/non-main';
    var EMAIL_SUFFIX = '/email';
    var ADDRESS_SUFFIX = '/address';
    var PHONE_NUMBER_SUFFIX = '/phone-number';
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
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + ADD_NON_MAIN_CONTACT_SUFFIX + EMAIL_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + ADD_NON_MAIN_CONTACT_SUFFIX + ADDRESS_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + ADD_NON_MAIN_CONTACT_SUFFIX + PHONE_NUMBER_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + UPDATE_CONTACT_SUFFIX + EMAIL_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + UPDATE_CONTACT_SUFFIX + ADDRESS_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + UPDATE_CONTACT_SUFFIX + PHONE_NUMBER_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, PREFIX + SWAP_MAIN_CONTACT_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, PREFIX + ID_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, PREFIX + DELETE_NON_MAIN_CONTACT_SUFFIX).respond(200, DATA);
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
        expect(factoryResult.addNonMainEmail).toBeDefined();
        expect(factoryResult.addNonMainAddress).toBeDefined();
        expect(factoryResult.addNonMainPhoneNumber).toBeDefined();
        expect(factoryResult.updateEmail).toBeDefined();
        expect(factoryResult.updateAddress).toBeDefined();
        expect(factoryResult.updatePhoneNumber).toBeDefined();
        expect(factoryResult.swapMainContact).toBeDefined();
        expect(factoryResult.delete).toBeDefined();
        expect(factoryResult.deleteNonMainContact).toBeDefined();
        expect(factoryResult.get).toBeDefined();
        expect(factoryResult.getByRecruitmentNumber).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('create check', function () {
          factoryResult.create(DTO_JSON_DATA)
            .$promise.then(function (resultCreate) {
              expect(resultCreate.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('addNonMainEmail check', function () {
          factoryResult.addNonMainEmail(DTO_JSON_DATA)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('addNonMainAddress check', function () {
          factoryResult.addNonMainAddress(DTO_JSON_DATA)
            .$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('addNonMainPhoneNumber check', function () {
          factoryResult.addNonMainPhoneNumber(DTO_JSON_DATA)
            .$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateEmail check', function () {
          factoryResult.updateEmail(DTO_JSON_DATA)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('updateAddress check', function () {
          factoryResult.updateAddress(DTO_JSON_DATA)
            .$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updatePhoneNumber check', function () {
          factoryResult.updatePhoneNumber(DTO_JSON_DATA)
            .$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('swapMainContact check', function () {
          factoryResult.swapMainContact(DTO_JSON_DATA)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('delete check', function () {
          factoryResult.delete(ID_PARAMETER)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('deleteNonMainContact check', function () {
          factoryResult.deleteNonMainContact(DTO_JSON_DATA)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('getMethod check', function () {
          factoryResult.get(ID_PARAMETER)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('getByRecruitmentNumberMethod check', function () {
          factoryResult.getByRecruitmentNumber(RN_PARAMETER)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

      });
    });
  });

}());