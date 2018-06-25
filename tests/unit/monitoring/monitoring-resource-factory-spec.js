(function () {
    'use strict';

    describe('MonitoringResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var SUFFIX = '/monitoring';
        var ACTIVITIES_SX = '/activities';
        var CENTERS_SX = '/centers';
        var ACRONYM_SX = '/CISE';
        
        var DATA = {
            'data': 'returnPromiseOK'
        };
        var DATA_CONFIRMATION = 'returnPromiseOK';
        var ACRONYM_PARAMETER = {
            'acronym': 'CISE'
        };
      
        var METHOD_GET_VALUE = "GET";

        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otus.client.MonitoringResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + ACTIVITIES_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + ACTIVITIES_SX + ACRONYM_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + CENTERS_SX).respond(200, DATA);
               

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
                expect(factoryResult.listAcronyms).toBeDefined();
                expect(factoryResult.find).toBeDefined();
                expect(factoryResult.listCenters).toBeDefined();
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

                it('listAcronymsMethod check', function () {
                    var listAcronyms = factoryResult.listAcronyms();
                    listAcronyms.$promise.then(function (resultListAcronyms) {
                        expect(resultListAcronyms.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('findMethod check', function () {
                    var find = factoryResult.find(ACRONYM_PARAMETER);
                    find.$promise.then(function (resultFind) {
                        expect(resultFind.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('listCentersMethod check', function () {
                    var listCenters = factoryResult.listCenters();
                    listCenters.$promise.then(function (resultListCenters) {
                        expect(resultListCenters.data).toEqual(DATA_CONFIRMATION);
                    });
                });

            });
        });
    });

}());