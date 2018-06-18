(function () {
    'use strict';

    describe('LaboratoryParticipantResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var SUFFIX = '/laboratory-participant';
        var INITIALIZE_SX = '/initialize';
        var TUBE_COLLECTION_DATA_SX = '/tube-collection-data';
        var UPDATE_ALIQUOTS = '/tubes/aliquots'
        var RN_SX = '/1234567';
        var DATA = {'data': 'returnPromiseOK'};
        var DATA_CONFIRMATION = 'returnPromiseOK';
        var RN_PARAMETER = {'rn': 1234567};
        var METHOD_GET_VALUE = "GET";
        var METHOD_POST_VALUE = "POST";
        var METHOD_PUT_VALUE = "PUT";        

        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otus.client.LaboratoryParticipantResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + INITIALIZE_SX + RN_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + RN_SX).respond(200, DATA);
                httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + RN_SX).respond(200, DATA);
                httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + TUBE_COLLECTION_DATA_SX + RN_SX).respond(200, DATA);
                httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + RN_SX + UPDATE_ALIQUOTS).respond(200, DATA);
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
                expect(factoryResult.initialize).toBeDefined();
                expect(factoryResult.getLaboratory).toBeDefined();
                expect(factoryResult.update).toBeDefined();
                expect(factoryResult.updateTubeCollectionData).toBeDefined();
                expect(factoryResult.updateAliquots).toBeDefined();                
            });

            describe('resourceMethods', function () {

                afterEach(function () {
                    httpBackend.flush();
                });

                it('initializeMethod check', function () {
                    var initialize = factoryResult.initialize(RN_PARAMETER);
                    initialize.$promise.then(function (resultInitialize) {
                        expect(resultInitialize.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('getLaboratorygetByIdMethod check', function () {
                    var getLaboratory = factoryResult.getLaboratory(RN_PARAMETER);
                    getLaboratory.$promise.then(function (resultGetLaboratory) {
                        expect(resultGetLaboratory.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('updateMethod check', function () {
                    var update = factoryResult.update(RN_PARAMETER);
                    update.$promise.then(function (resultUpdate) {
                        expect(resultUpdate.data).toEqual(DATA_CONFIRMATION);
                    });
                });
                
                it('updateTubeCollectionDataMethod check', function () {
                    var updateTubeCollectionData = factoryResult.updateTubeCollectionData(RN_PARAMETER);
                    updateTubeCollectionData.$promise.then(function (resultUpdateTubeCollectionData) {
                        expect(resultUpdateTubeCollectionData.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it(' updateAliquotsMethod check', function () {
                    var updateAliquots = factoryResult.updateAliquots(RN_PARAMETER);
                     updateAliquots.$promise.then(function (resultUpdateAliquots) {
                        expect(resultUpdateAliquots.data).toEqual(DATA_CONFIRMATION);
                    });
                });
            });
        });
    });

}());