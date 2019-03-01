(function () {
  'use strict';

  describe('SurveyGroupResourceFactory', function () {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/survey';
    var GET_SX = '/groups';
    var POST_SX = '/new-group';
    var POST_USER_SX = '/groups-by-user';
    var PUT_SX = '/update-group';
    var DELETE_SX = '/delete-group';
    var SURVEY_GROUP_NAME_SX = '/test';
    var SURVEY_GROUP_OLD_SX = '/test';
    var DATA = {'data': 'returnPromiseOK'};
    var NAME_PARAMETER = { "name" : "test"};
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
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + PUT_SX + SURVEY_GROUP_OLD_SX + SURVEY_GROUP_NAME_SX).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX + DELETE_SX + SURVEY_GROUP_NAME_SX).respond(200, DATA);
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
        expect(factoryResult.addNewGroup).toBeDefined();
        expect(factoryResult.getListOfSurveyGroups).toBeDefined();
        expect(factoryResult.updateGroupName).toBeDefined();
        expect(factoryResult.updateGroupSurveyAcronyms).toBeDefined();
        expect(factoryResult.deleteGroup).toBeDefined();
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

        it('addNewGroupMethod check', function () {
          var addNewGroup = factoryResult.addNewGroup();
          addNewGroup.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateGroupNameMethod check', function () {
          var updateGroupName = factoryResult.updateGroupName();
          updateGroupName.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateGroupSurveyAcronymsMethod check', function () {
          var updateGroupSurveyAcronyms = factoryResult.updateGroupSurveyAcronyms();
          updateGroupSurveyAcronyms.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('deleteGroupMethod check', function () {
          var deleteGroup = factoryResult.deleteGroup(NAME_PARAMETER);
          deleteGroup.$promise.then(function (result) {
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