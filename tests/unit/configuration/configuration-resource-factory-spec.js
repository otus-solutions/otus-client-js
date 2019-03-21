(function () {
    'use strict';

    describe('ConfigurationResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var SUFFIX = '/configuration';
        var SURVEYS_SX = '/surveys';
        var ALL_SX = '/all';
        var ACRONYM_SX = '/ABCD';
        var TYPE_SX = '/type';
        var PUBLISH_TEMPLATE_SX = '/publish/template';       
        var DATA = {'data': 'returnPromiseOK'};
        var DATA_CONFIRMATION = 'returnPromiseOK';
        var ACRONYM_PARAMETER = {'acronym': 'ABCD'};
        var METHOD_GET_VALUE = "GET";
        var METHOD_PUT_VALUE = "PUT";
        var METHOD_POST_VALUE = "POST";
        var METHOD_DELETE_VALUE = "DELETE";

        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otusjs.otus.client.OtusConfigurationResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + SURVEYS_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + SURVEYS_SX + ALL_SX).respond(200, DATA);
                httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + SURVEYS_SX + ACRONYM_SX + TYPE_SX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + PUBLISH_TEMPLATE_SX).respond(200, DATA);
                httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX + SURVEYS_SX + ACRONYM_SX).respond(200, DATA);                          
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
                expect(headerBuilderFactory.create).toHaveBeenCalledTimes(2);
            });

            it('methodFactoryExistence check', function () {
                expect(factoryResult.getSurveys).toBeDefined();
                expect(factoryResult.getAllSurveys).toBeDefined();
                expect(factoryResult.updateSurveyTemplateType).toBeDefined();
                expect(factoryResult.publishTemplate).toBeDefined();
                expect(factoryResult.deleteSurveyTemplate).toBeDefined();                
            });

            describe('resourceMethods', function () {

                afterEach(function () {
                    httpBackend.flush();
                });

                it('getSurveysMethod check', function () {
                    var getSurveys = factoryResult.getSurveys();
                    getSurveys.$promise.then(function (resultGetSurveys) {
                        expect(resultGetSurveys.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('getAllSurveysMethod check', function () {
                  var getAllSurveys = factoryResult.getAllSurveys();
                  getAllSurveys.$promise.then(function (resultGetAllSurveys) {
                    expect(resultGetAllSurveys.data).toEqual(DATA_CONFIRMATION);
                  });
                });

                it('updateSurveyTemplateTypeMethod check', function () {
                    var updateSurveyTemplateType = factoryResult.updateSurveyTemplateType(ACRONYM_PARAMETER);
                    updateSurveyTemplateType.$promise.then(function (resultUpdateSurveyTemplateType) {
                        expect(resultUpdateSurveyTemplateType.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('publishTemplateMethod check', function () {
                    var publishTemplate = factoryResult.publishTemplate();
                    publishTemplate.$promise.then(function (resultPublishTemplate) {
                        expect(resultPublishTemplate.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('deleteSurveyTemplateMethod check', function () {
                    var deleteSurveyTemplate = factoryResult.deleteSurveyTemplate(ACRONYM_PARAMETER);
                    deleteSurveyTemplate.$promise.then(function (resultDeleteSurveyTemplate) {
                        expect(resultDeleteSurveyTemplate.data).toEqual(DATA_CONFIRMATION);
                    });
                });
            });
        });
    });

}());