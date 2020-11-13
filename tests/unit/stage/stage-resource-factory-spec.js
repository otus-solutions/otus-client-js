(function () {
  'use strict';

  fdescribe('StageResourceFactory', function () {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/stage';

    var DATA_CONFIRMATION = 'returnPromiseOK';
    var DATA = {'data': DATA_CONFIRMATION};

    var METHOD_GET_VALUE = "GET";
    var METHOD_POST_VALUE = "POST";
    var METHOD_PUT_VALUE = "PUT";
    var METHOD_DELETE_VALUE = "DELETE";

    var STAGE_ID = 'pCD0k3IB_dljxFtpAXfN';
    var STAGE_ID_PARAMETER = { 'id': STAGE_ID};

    var SUFFIX_WITH_ID = SUFFIX + '/' + STAGE_ID;
    var SUFFIX_SURVEY_ACRONYMS_OF_STAGE = '/update-surveys-of-stage';
    var SUFFIX_STAGE_OF_SURVEY_ACRONYMS = '/update-stages-with-survey';

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function ($injector) {
        factory = $injector.get('otus.client.StageResourceFactory');
        otusRestResourceContext = $injector.get('OtusRestResourceContext');
        headerBuilderFactory = $injector.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = $injector.get('$httpBackend');

        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX_WITH_ID).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX_WITH_ID).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_WITH_ID).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + SUFFIX_SURVEY_ACRONYMS_OF_STAGE).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + SUFFIX_STAGE_OF_SURVEY_ACRONYMS).respond(200, DATA);
      });
    });

    it('factoryExistence check', function () {
      expect(factory).toBeDefined();
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

      it('methods existence check', function () {
        expect(factoryResult.create).toBeDefined();
        expect(factoryResult.update).toBeDefined();
        expect(factoryResult.delete).toBeDefined();
        expect(factoryResult.getByID).toBeDefined();
        expect(factoryResult.getAll).toBeDefined();
        expect(factoryResult.updateSurveyAcronymsOfStage).toBeDefined();
        expect(factoryResult.updateStagesOfSurveyAcronym).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('create method check', function () {
          var post = factoryResult.create();
          post.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('update method check', function () {
          var put = factoryResult.update(STAGE_ID_PARAMETER);
          put.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('delete method check', function () {
          var req = factoryResult.delete(STAGE_ID_PARAMETER);
          req.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getByID method check', function () {
          var req = factoryResult.getByID(STAGE_ID_PARAMETER);
          req.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getAll method check', function () {
          var req = factoryResult.getAll();
          req.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateSurveyAcronymsOfStage method check', function () {
          var put = factoryResult.updateSurveyAcronymsOfStage();
          put.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateStagesOfSurveyAcronym method check', function () {
          var put = factoryResult.updateStagesOfSurveyAcronym();
          put.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

      });
    });
  });

}());
