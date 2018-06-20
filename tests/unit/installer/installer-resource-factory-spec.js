(function () {
    'use strict';

    describe('InstallerResourceFactory', function () {

         var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
         var SUFFIX = '/installer';
         var READY_SX = '/ready';
         var VALIDATION_EMAIL_SX = '/validation/email'
         var DATA = {'data': 'returnPromiseOK'};
         var DATA_CONFIRMATION = 'returnPromiseOK';
        var METHOD_GET_VALUE = "GET";
        var METHOD_POST_VALUE = "POST";

        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('OtusInstallerResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + READY_SX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + VALIDATION_EMAIL_SX).respond(200, DATA);
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
                expect(factoryResult.ready).toBeDefined();
                expect(factoryResult.config).toBeDefined();
                expect(factoryResult.validationEmail).toBeDefined();
            });

            describe('resourceMethods', function () {

                afterEach(function () {
                    httpBackend.flush();
                });

                it('readyMethod check', function () {
                    var ready = factoryResult.ready();
                    ready.$promise.then(function (resultReady) {
                        expect(resultReady.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('configcreateMethod check', function () {
                    var config = factoryResult.config();
                    config.$promise.then(function (resultConfig) {
                        expect(resultConfig.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('validationEmailMethod check', function () {
                    var validationEmail = factoryResult.validationEmail();
                    validationEmail.$promise.then(function (resultValidationEmail) {
                        expect(resultValidationEmail.data).toEqual(DATA_CONFIRMATION);
                    });
                });
            });
        });
    });

}());