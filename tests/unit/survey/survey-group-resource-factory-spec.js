(function () {
  'use strict';

  describe('SurveyGroupResourceFactory', function () {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/survey';
    var GET_SX = '/groups';
    var POST_SX = '/new-group';
    var POST_USER_SX = '/groups-by-user';
    var PUT_SX = '/update-group';
    var PUT_NAME_SX = '/update-group-name';
    var DELETE_SX = '/delete-group';
    var DATA = {'data': 'returnPromiseOK'};
    var DATA_CONFIRMATION = 'returnPromiseOK';
    var METHOD_GET_VALUE = "GET";
    var METHOD_PUT_VALUE = "PUT";
    var METHOD_POST_VALUE = "POST";

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.SurveyGroupResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + GET_SX).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + POST_SX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + POST_USER_SX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + PUT_SX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + PUT_NAME_SX).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + DELETE_SX).respond(200, DATA);
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
        expect(factoryResult.addNewSurveyGroup).toBeDefined();
        expect(factoryResult.getListOfSurveyGroups).toBeDefined();
        expect(factoryResult.updateSurveyGroupName).toBeDefined();
        expect(factoryResult.updateSurveyGroupAcronyms).toBeDefined();
        expect(factoryResult.deleteSurveyGroup).toBeDefined();
        expect(factoryResult.getSurveyGroupsByUser).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('getListOfSurveyGroupsMethod check', function () {
          var getListOfSurveyGroups = factoryResult.getListOfSurveyGroups();
          getListOfSurveyGroups.$promise.then(function (resultList) {
            expect(resultList.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('addNewSurveyGroupMethod check', function () {
          var addNewSurveyGroup = factoryResult.addNewSurveyGroup();
          addNewSurveyGroup.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateSurveyGroupNameMethod check', function () {
          var updateSurveyGroupName = factoryResult.updateSurveyGroupName();
          updateSurveyGroupName.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateSurveyGroupAcronymsMethod check', function () {
          var updateSurveyGroupAcronyms = factoryResult.updateSurveyGroupAcronyms();
          updateSurveyGroupAcronyms.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('deleteSurveyGroupMethod check', function () {
          var deleteSurveyGroup = factoryResult.deleteSurveyGroup();
          deleteSurveyGroup.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getSurveyGroupsByUserMethod check', function () {
          var getSurveyGroupsByUser = factoryResult.getSurveyGroupsByUser();
          getSurveyGroupsByUser.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });

}());