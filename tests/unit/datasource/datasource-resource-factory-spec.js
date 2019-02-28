(function () {
    'use strict'
    var Mock = {};

    describe('DatasourceResourceFactory', function () {
        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var REST_WITH_SUFIX = 'http://localhost:8080/otus-rest/v01/configuration/datasources';
        var METHOD_POST = "POST";
        var METHOD_PUT = "PUT";
        var METHOD_GET_LIST = "GET";
        var METHOD_GET_BY_ID = "GET";
        var SUFFIX = '/configuration/datasources';

        var factory, factoryResult, otusRestResourceContext;
        var headerBuilderFactory, httpBackend, promise;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_, _$q_) {

                _mockResponse();
                _mockData();

                factory = _$injector_.get('otus.client.DatasourceResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                promise = _$q_.defer;
                httpBackend = _$injector_.get('$httpBackend');

                httpBackend.when(METHOD_POST, REST_PREFIX + SUFFIX).respond(200, Mock.response);
                httpBackend.when(METHOD_PUT, REST_PREFIX + SUFFIX).respond(200, Mock.response);
                httpBackend.when(METHOD_GET_LIST, REST_PREFIX + SUFFIX).respond(200, Mock.list);
                httpBackend.when(METHOD_GET_BY_ID, REST_PREFIX + SUFFIX + '/' + Mock.id).respond(200, Mock.data);

                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
            });
        });

        it('factoryExistence check', function () {
            expect(factory).toBeDefined();
        });

        describe('HttpFileUploadInstance', function () {

            it("createMethodExistence check", function () {
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
                expect(factoryResult.update).toBeDefined();
                expect(factoryResult.list).toBeDefined();
                expect(factoryResult.getByID).toBeDefined();
            });


            describe('HttpFileUploadMethodAtributes', function () {
                afterEach(function () {
                    httpBackend.flush();
                });

                it('create check', function () {
                    var response = factoryResult.create(Mock.response, promise);
                    response.then(function (values) {
                        expect(values.data).toEqual(Mock.response);
                        expect(values.config.method).toEqual(METHOD_POST);
                        expect(values.config.url).toEqual(REST_WITH_SUFIX);
                    });
                });

                it('update check', function () {
                    var response = factoryResult.update(Mock.response, promise);
                    response.then(function (values) {
                        expect(values.data).toEqual(Mock.response);
                        expect(values.config.method).toEqual(METHOD_PUT);
                        expect(values.config.url).toEqual(REST_WITH_SUFIX);
                    });
                });

                it('list check', function () {
                    var response = factoryResult.list();
                    response.then(function (values) {
                        expect(values.data).toEqual(Mock.list);
                        expect(values.config.method).toEqual(METHOD_GET_LIST);
                        expect(values.config.url).toEqual(REST_WITH_SUFIX);
                    });
                });

                it('getByID check', function () {
                    var response = factoryResult.getByID(Mock.id);
                    response.then(function (values) {
                        expect(values.data).toEqual(Mock.data);
                        expect(values.config.method).toEqual(METHOD_GET_BY_ID);
                        expect(values.config.url).toEqual(REST_WITH_SUFIX + '/' + Mock.id);
                    });
                });

            });
        });
    });

    function _mockResponse() {
        Mock.response = { "data": true };
    }

    function _mockData() {
        Mock.id = 'medicamentos';

        Mock.list = {
            "data": [{
                "id": "medicamentos",
                "name": "medicamentos",
                "data": [
                    { "value": "01 ACETATO DE MEDROXIPROGESTERONA 150MG - INJET?VEL (GEN?RICO)" },
                    { "value": "1\n02 ADOLESS" },
                    { "value": "2\n03 AIXA" },
                    { "value": "3\n04 ALESSE" },
                    { "value": "4\n05 ALEXA" },
                    { "value": "5\n06 ALGESTONA ACETOFENIDA 150MG + ENANTATO DE ESTRADIOL 10MG - INJET?VEL (GEN?RICO)" },
                    { "value": "6\n07 ALLESTRA" },
                    { "value": "7\n09 ANFERTIL" },
                    { "value": "8\n10 ARANKELLE" },
                    { "value": "9\n11 ARTEMIDIS 35" },
                    { "value": "10\n" }
                ]
            }]
        };

        Mock.data = {
            "data": {
                "id": "medicamentos",
                "name": "medicamentos",
                "data": [
                    { "value": "01 ACETATO DE MEDROXIPROGESTERONA 150MG - INJET?VEL (GEN?RICO)" },
                    { "value": "1\n02 ADOLESS" },
                    { "value": "2\n03 AIXA" },
                    { "value": "3\n04 ALESSE" },
                    { "value": "4\n05 ALEXA" },
                    { "value": "5\n06 ALGESTONA ACETOFENIDA 150MG + ENANTATO DE ESTRADIOL 10MG - INJET?VEL (GEN?RICO)" },
                    { "value": "6\n07 ALLESTRA" },
                    { "value": "7\n09 ANFERTIL" },
                    { "value": "8\n10 ARANKELLE" },
                    { "value": "9\n11 ARTEMIDIS 35" },
                    { "value": "10\n" }
                ]
            }
        };

    };
}());