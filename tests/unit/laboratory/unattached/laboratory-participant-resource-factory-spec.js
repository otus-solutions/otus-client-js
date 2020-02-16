(function () {
  'use strict';

  describe('UnattachedLaboratoryResourceFactory', function () {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/unattached-laboratory';
    var CREATE_SX = '/create';
    var ATTACHE_SX = '/attache';
    var ACRONYM_PARAM = 'acronym';
    var DESCRIPTOR_NAME_PARAM = 'descriptorName';
    var PAGE_PARAM = "1";
    var QUANTITY_PARAM = "20";
    var LABORATORY_IDENTIFICATION = "5";
    var RECRUITMENT_NUMBER = "20";
    var LABORATORY_OID_PARAM = "laboratoryOid";
    var METHOD_GET_VALUE = "GET";
    var METHOD_POST_VALUE = "POST";
    var METHOD_PUT_VALUE = "PUT";
    var METHOD_DELETE_VALUE = "DELETE";
    var DATA = {'data': 'returnPromiseOK'};
    var DATA_CONFIRMATION = 'returnPromiseOK';


    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.UnattachedLaboratoryResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + CREATE_SX + "/" + ACRONYM_PARAM + "/" + DESCRIPTOR_NAME_PARAM).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + "/" + ACRONYM_PARAM + "/" + DESCRIPTOR_NAME_PARAM + "/" + PAGE_PARAM + "/" + QUANTITY_PARAM).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + ATTACHE_SX + "/" + LABORATORY_IDENTIFICATION + "/" + RECRUITMENT_NUMBER).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX + "/" + LABORATORY_OID_PARAM).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + "/" + LABORATORY_OID_PARAM).respond(200, DATA);
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
        expect(factoryResult.initialize).toBeDefined();
        expect(factoryResult.listLaboratories).toBeDefined();
        expect(factoryResult.attache).toBeDefined();
        expect(factoryResult.discard).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('initialize check', function () {
          var initialize = factoryResult.initialize({acronym:ACRONYM_PARAM,descriptorName:DESCRIPTOR_NAME_PARAM});
          initialize.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('listLaboratories check', function () {
          var listLaboratories = factoryResult.listLaboratories({acronym:ACRONYM_PARAM,descriptorName:DESCRIPTOR_NAME_PARAM,page:PAGE_PARAM,quantity:QUANTITY_PARAM});
          listLaboratories.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('attache check', function () {
          var attache = factoryResult.attache({laboratoryIdentification:LABORATORY_IDENTIFICATION, recruitmentNumber:RECRUITMENT_NUMBER});
          attache.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('discard check', function () {
          var discard = factoryResult.discard({laboratoryOid:LABORATORY_OID_PARAM});
          discard.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getById check', function () {
          var getById = factoryResult.getById({laboratoryOid:LABORATORY_OID_PARAM});
          getById.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });

}());