(function () {
    'use strict';

    describe('UserResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var SUFFIX = '/user';
        var SIGNUP_SX = '/signup'
        var LIST_SX = '/list';
        var ENABLE_SX = '/enable';
        var DISABLE_SX = '/disable';
        var FIELD_CENTER_SX = '/field-center';
        var DATA = {'data': 'returnPromiseOK'};
        var DATA_CONFIRMATION = 'returnPromiseOK';
        var METHOD_GET_VALUE = "GET";
        var METHOD_POST_VALUE = "POST";

        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otus.client.UserResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + SIGNUP_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + LIST_SX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + ENABLE_SX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + DISABLE_SX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + FIELD_CENTER_SX).respond(200, DATA);
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
                expect(factoryResult.logged).toBeDefined();
                expect(factoryResult.list).toBeDefined();
                expect(factoryResult.enable).toBeDefined();
                expect(factoryResult.disable).toBeDefined();
                expect(factoryResult.updateFieldCenter).toBeDefined();                
            });

            describe('resourceMethods', function () {

                afterEach(function () {
                    httpBackend.flush();
                });
                
                it('createMethod check', function () {
                    var create = factoryResult.create();
                    create.$promise.then(function (resultCreate) {
                        expect(resultCreate.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('loggedMethod check', function () {
                    var logged = factoryResult.logged();
                    logged.$promise.then(function (resultLogged) {
                        expect(resultLogged.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('listMethod check', function () {
                    var list = factoryResult.list();
                    list.$promise.then(function (resultList) {
                        expect(resultList.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('enableMethod check', function () {
                    var enable = factoryResult.enable();
                    enable.$promise.then(function (resultEnable) {
                        expect(resultEnable.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('disableMethod check', function () {
                    var disable = factoryResult.disable();
                    disable.$promise.then(function (resultDisable) {
                        expect(resultDisable.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('updateFieldCenterMethod check', function () {
                    var updateFieldCenter = factoryResult.updateFieldCenter();
                     updateFieldCenter.$promise.then(function (resultUpdateFieldCenter) {
                        expect(resultUpdateFieldCenter.data).toEqual(DATA_CONFIRMATION);
                    });
                });
            });
        });
    });

}());