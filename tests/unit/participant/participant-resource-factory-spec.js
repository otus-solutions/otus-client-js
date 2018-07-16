(function () {
    'use strict';

    describe('ParticipantResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';        
        var PARTICIPANT_SX = '/participants';
        var LIST_INDEXERS_SX = '/list-indexers';
        var DATA = {'data': 'returnPromiseOK'};
        var DATA_LIST = ['returnPromiseOK']    
        var DATA_CONFIRMATION = 'returnPromiseOK';        
        var METHOD_GET_VALUE = "GET";
        
        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otus.client.ParticipantResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + PARTICIPANT_SX).respond(200, DATA_LIST);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + LIST_INDEXERS_SX).respond(200, DATA);                
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
                expect(factoryResult.listIndexers).toBeDefined();               
            });

            describe('resourceMethods', function () {

                afterEach(function () {
                    httpBackend.flush();
                });

                it('listMethod check', function () {
                    var list = factoryResult.list();
                    list.$promise.then(function (resultList) {
                        expect(resultList[0]).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('listIndexersMethod check', function () {
                    var listIndexers = factoryResult.listIndexers();
                     listIndexers.$promise.then(function (resultListIndexers) {
                        expect(resultListIndexers.data).toEqual(DATA_CONFIRMATION);
                    });
                });               
            });
        });
    });

}());