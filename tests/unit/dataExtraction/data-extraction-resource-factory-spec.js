(function () {
    'use strict';

    describe('DataExtractionResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var SUFFIX = '/data-extraction';
        var EXTRACT_SX = '/extraction-token';
        var LIST_IPS_SX = '/list-ips';
        var ENABLE_IPS_SX = '/enable-ips'
        var ENABLE_SX = '/enable'
        var DISABLE_SX = '/disable'
        var DATA = {'data': 'returnPromiseOK'};
        var DATA_CONFIRMATION = 'returnPromiseOK';
        var METHOD_GET_VALUE = "GET";
        var METHOD_POST_VALUE = "POST";
        
        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otus.client.DataExtractionResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + EXTRACT_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + LIST_IPS_SX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + ENABLE_IPS_SX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + ENABLE_SX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + DISABLE_SX).respond(200, DATA);                
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
                expect(factoryResult.extractionToken).toBeDefined();
                expect(factoryResult.listExtractionIps).toBeDefined();
                expect(factoryResult.updateExtractionIps).toBeDefined();
                expect(factoryResult.enableExtraction).toBeDefined();
                expect(factoryResult.disableExtraction).toBeDefined();               
            });

            describe('resourceMethods', function () {

                afterEach(function () {
                    httpBackend.flush();
                });

                it('extractionTokenMethod check', function () {
                    var extractionToken = factoryResult.extractionToken();
                    extractionToken.$promise.then(function (resultExtraction) {
                        expect(resultExtraction.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('listExtractionIpsMethod check', function () {
                    var listExtractionIps = factoryResult.listExtractionIps();
                    listExtractionIps.$promise.then(function (resultListExtractionIps) {
                        expect(resultListExtractionIps.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('updateExtractionIpsMethod check', function () {
                    var updateExtractionIps = factoryResult.updateExtractionIps();
                    updateExtractionIps.$promise.then(function (resultUpdateExtractionIps) {
                        expect(resultUpdateExtractionIps.data).toEqual(DATA_CONFIRMATION);
                    });
                });               

                it('enableExtractionMethod check', function () {
                    var enableExtraction = factoryResult.enableExtraction();
                    enableExtraction.$promise.then(function (resultEnableExtraction) {
                        expect(resultEnableExtraction.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('disableExtractionMethod check', function () {
                    var disableExtraction = factoryResult.disableExtraction();
                    disableExtraction.$promise.then(function (resultDisableExtraction) {
                        expect(resultDisableExtraction.data).toEqual(DATA_CONFIRMATION);
                    });
                });
            });
        });
    });

}());