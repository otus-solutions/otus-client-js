(function () {
    'use strict';

    describe('ParticipantMonitoringResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var PARTICIPANT_SX = '/participants';
        var RN_SX = '/1234567';
        var RN_PARAMETER = {'rn':'1234567'};
        var DATA = {'data': 'returnPromiseOK'};
        var DATA_LIST = {0:'returnPromiseOK'};
        var DATA_CONFIRMATION = 'returnPromiseOK';
        var METHOD_GET_VALUE = "GET";
        var METHOD_PUT_VALUE = "PUT";

        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otus.client.ParticipantMonitoringResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + PARTICIPANT_SX).respond(200, DATA_LIST);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + PARTICIPANT_SX + RN_SX).respond(200, DATA);
                httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + PARTICIPANT_SX).respond(200, DATA);
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
                expect(factoryResult.getStatusOfSurveys).toBeDefined();
                expect(factoryResult.defineSurveyWithUnnecessary).toBeDefined();
            });

            describe('resourceMethods', function () {

                afterEach(function () {
                    httpBackend.flush();
                });

                it('getStatusOfSurveys check', function () {
                    var list = factoryResult.getStatusOfSurveys();
                    list.$promise.then(function (resultList) {
                        expect(resultList[0]).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('defineSurveyWithUnnecessary check', function () {
                    var defineSurveyWithUnnecessary = factoryResult.defineSurveyWithUnnecessary();
                    defineSurveyWithUnnecessary.$promise.then(function (resultdefineSurveyWithUnnecessary) {
                        expect(resultdefineSurveyWithUnnecessary.data).toEqual(DATA_CONFIRMATION);
                    });
                });
            });
        });
    });

}());