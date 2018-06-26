(function () {
    'use strict';

    describe('SampleTransportResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var SUFFIX = '/laboratory-project/transportation';
        var ALIQUOTS_SX = '/aliquots';
        var LOTS_SX = '/lots';
        var LOT_SX = '/lot';
        var ID_SX = '/1234567';
        var CENTER_SX = '/SP';
        var DATA = {'data': 'returnPromiseOK'};
        var ID_PARAMETER = {'id': 1234567};
        var PERIOD_PARAMETER = {'initialDate': '2017-12-21T15:50:00Z', 'finalDate': '2018-12-21T15:50:00Z' };
        var PERIOD_SX = '/2017-12-21T15:50:00Z/2018-12-21T15:50:00Z';
        var CENTER_PARAMETER = {'center': 'SP'};
        var DATA_CONFIRMATION = 'returnPromiseOK';
        var METHOD_GET_VALUE = "GET";
        var METHOD_POST_VALUE = "POST";
        var METHOD_PUT_VALUE = "PUT";
        var METHOD_DELETE_VALUE = "DELETE";

        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otus.client.SampleTransport');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + ALIQUOTS_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + ALIQUOTS_SX + PERIOD_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + ALIQUOTS_SX + CENTER_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + LOTS_SX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + LOT_SX).respond(200, DATA);
                httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + LOT_SX).respond(200, DATA);
                httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX + LOT_SX + ID_SX).respond(200, DATA);                
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
                expect(factoryResult.getAliquots).toBeDefined();
                expect(factoryResult.getAliquotsByPeriod).toBeDefined();
                expect(factoryResult.getAliquotsByCenter).toBeDefined();
                expect(factoryResult.getLots).toBeDefined();
                expect(factoryResult.createLot).toBeDefined();
                expect(factoryResult.updateLot).toBeDefined();
                expect(factoryResult.deleteLot).toBeDefined();
            });

            describe('resourceMethods', function () {

                afterEach(function () {
                    httpBackend.flush();
                });

                it('getAliquotsMethod check', function () {
                    var getAliquots = factoryResult.getAliquots();
                    getAliquots.$promise.then(function (resultGetAliquots) {
                        expect(resultGetAliquots.data).toEqual(DATA_CONFIRMATION);
                    });
                });
                it('getAliquotsByPeriod check', function () {
                    var getAliquotsByPeriod = factoryResult.getAliquotsByPeriod(PERIOD_PARAMETER);
                    getAliquotsByPeriod.$promise.then(function (resultGetAliquots) {
                        expect(resultGetAliquots.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('getAliquotsByCenterMethod check', function () {
                    var getAliquotsByCenter = factoryResult.getAliquotsByCenter(CENTER_PARAMETER);
                    getAliquotsByCenter.$promise.then(function (resultGetAliquotsByCenter) {
                        expect(resultGetAliquotsByCenter.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('getLotsMethod check', function () {
                    var getLots = factoryResult.getLots();
                    getLots.$promise.then(function (resultGetLots) {
                        expect(resultGetLots.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('createLotMethod check', function () {
                    var createLot = factoryResult.createLot();
                    createLot.$promise.then(function (resultCreateLot) {
                        expect(resultCreateLot.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('updateLotMethod check', function () {
                    var updateLot = factoryResult.updateLot();
                    updateLot.$promise.then(function (resultUpdateLot) {
                        expect(resultUpdateLot.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('deleteLotMethod check', function () {
                    var deleteLot = factoryResult.deleteLot(ID_PARAMETER);
                    deleteLot.$promise.then(function (resultDeleteLot) {
                        expect(resultDeleteLot.data).toEqual(DATA_CONFIRMATION);
                    });
                });
            });
        });
    });

}());