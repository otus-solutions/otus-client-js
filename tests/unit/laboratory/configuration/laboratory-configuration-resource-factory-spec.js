(function () {
    'use strict';

    describe('DataExtractionResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var SUFFIX = '/laboratory-configuration';
        var DESCRIPTOR_SX = '/descriptor';
        var ALIQUOT_CONFIGURATION_SX = '/aliquot-configuration';
        var ALIQUOT_DESCRIPTORS_SX = '/aliquot-descriptors'       
        var DATA = {'data': 'returnPromiseOK'};
        var DATA_CONFIRMATION = 'returnPromiseOK';
        var METHOD_GET_VALUE = "GET";

        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otus.client.LaboratoryConfigurationResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + DESCRIPTOR_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + ALIQUOT_CONFIGURATION_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + ALIQUOT_DESCRIPTORS_SX).respond(200, DATA);
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
                expect(factoryResult.getDescriptors).toBeDefined();
                expect(factoryResult.getAliquotConfiguration).toBeDefined();
                expect(factoryResult.getAliquotDescriptors).toBeDefined();               
            });

            describe('resourceMethods', function () {

                afterEach(function () {
                    httpBackend.flush();
                });

                it('getDescriptorsMethod check', function () {
                    var getDescriptors = factoryResult.getDescriptors();
                    getDescriptors.$promise.then(function (resultGetDescriptors) {
                        expect(resultGetDescriptors.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('getAliquotConfigurationMethod check', function () {
                    var getAliquotConfiguration = factoryResult.getAliquotConfiguration();
                    getAliquotConfiguration.$promise.then(function (resultGetAliquotConfiguration) {
                        expect(resultGetAliquotConfiguration.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('getAliquotDescriptorsMethod check', function () {
                    var getAliquotDescriptors = factoryResult.getAliquotDescriptors();
                    getAliquotDescriptors.$promise.then(function (resultGetAliquotDescriptors) {
                        expect(resultGetAliquotDescriptors.data).toEqual(DATA_CONFIRMATION);
                    });
                });
            });
        });
    });

}());