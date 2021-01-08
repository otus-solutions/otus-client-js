(function () {
  'use strict';

  describe('ParticipantContactAttemptResourceFactory', function () {

    var METHOD_GET_VALUE = 'GET';
    var METHOD_POST_VALUE = 'POST';
    var METHOD_DELETE_VALUE = 'DELETE';

    var PREFIX = 'http://localhost:8080/otus-rest/v01/participant/participant-contact-attempt';
    var METADATA_ADDRESS = 'metadata_for_address'
    var FIND_METADATA_ATTEMPT_SUFFIX = '/metadata-status/' + METADATA_ADDRESS;
    var ID = '5efd';
    var ID_SUFFIX = '/'+ID;
    var ID_PARAMETER = { "id" : ID };
    var RN = '1234567';
    var GET_BY_RN_SUFFIX = '/rn/'+RN;
    var RN_PARAMETER = {'rn': RN};
    var OBJTYPE_PARAMETER = {'objectType': METADATA_ADDRESS}
    var DTO_JSON_DATA = {};
    var DATA_CONFIRMATION = 'returnPromiseOK';
    var DATA = {'data': DATA_CONFIRMATION};

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.ParticipantContactAttemptResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_POST_VALUE, PREFIX).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, PREFIX + ID_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, PREFIX + GET_BY_RN_SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, PREFIX + FIND_METADATA_ATTEMPT_SUFFIX).respond(200, DATA);
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
        expect(factoryResult.delete).toBeDefined();
        expect(factoryResult.findMetadataAttemptByObjectType).toBeDefined();
        expect(factoryResult.findAllByRn).toBeDefined();
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

        it('delete check', function () {
          factoryResult.delete(ID_PARAMETER)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('findMetadataAttemptByObjectType check', function () {
          factoryResult.findMetadataAttemptByObjectType(OBJTYPE_PARAMETER)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

        it('findAllByRn check', function () {
          factoryResult.findAllByRn(RN_PARAMETER)
            .$promise.then(function (result) {
              expect(result.data).toEqual(DATA_CONFIRMATION);
            });
        });

      });
    });
  });

}());