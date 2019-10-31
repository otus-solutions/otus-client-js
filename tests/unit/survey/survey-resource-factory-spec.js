(function () {
    'use strict';

    describe('SurveyResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var SUFFIX = '/survey';
        var LIST_SX = '/list';
        var UPDATE_EXT_ID = '/update-required-external-id';
        var DATA = {'data': 'returnPromiseOK'};
        var DATA_CONFIRMATION = 'returnPromiseOK';
        var METHOD_GET_VALUE = "GET";
        var METHOD_PUT_VALUE = "PUT";

        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otus.client.SurveyResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + LIST_SX).respond(200, DATA);
                httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + UPDATE_EXT_ID).respond(200, DATA);
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
                expect(factoryResult.list).toBeDefined();
                expect(factoryResult.listAll).toBeDefined();
                expect(factoryResult.updateSurveyRequiredExternalID).toBeDefined();
            });

            describe('resourceMethods', function () {
                afterEach(function () {
                    httpBackend.flush();
                });

                it('listMethod check', function () {
                    var list = factoryResult.list();
                    list.$promise.then(function (resultList) {
                        expect(resultList.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('updateSurveyRequiredExternalID check', function (){
                  var updateSurveyRequiredExternalID = factoryResult.updateSurveyRequiredExternalID();
                  updateSurveyRequiredExternalID.$promise.then(function (resultUpdate) {
                    expect(resultUpdate.data).toEqual(DATA_CONFIRMATION)
                  });
              });
            });
        });
    });

}());