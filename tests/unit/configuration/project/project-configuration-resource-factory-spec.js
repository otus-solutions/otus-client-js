(function () {
    'use strict';

    describe('ProjectConfigurationResourceFactory', function () {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var SUFFIX = '/configuration/project';
        // var SURVEYS_SX = '/surveys';
        // var ACRONYM_SX = '/ABCD';
        // var TYPE_SX = '/type';
        // var PUBLISH_TEMPLATE_SX = '/publish/template';
        var ALLOW_PARTICIPANT_SX = '/participant/registration';
        var PERMISSION_SX = '/true';
        var PERMISSION_PARAMETER = {'permission': true};
        var VISUAL_IDENTITY_SX = '/visual-identity';
        var DATA = {'data': 'returnPromiseOK'};
        var DATA_CONFIRMATION = 'returnPromiseOK';
        //var ACRONYM_PARAMETER = {'acronym': 'ABCD'};
        var METHOD_GET_VALUE = "GET";
        var METHOD_PUT_VALUE = "PUT";
        var METHOD_POST_VALUE = "POST";
        // var METHOD_DELETE_VALUE = "DELETE";

        var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
        var httpBackend;

        beforeEach(function () {
            angular.mock.module('otus.client');
            angular.mock.inject(function (_$injector_) {
                factory = _$injector_.get('otusjs.otus.client.OtusProjectConfigurationResourceFactory');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + ALLOW_PARTICIPANT_SX + PERMISSION_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
                // httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + PUBLISH_TEMPLATE_SX).respond(200, DATA);
                // httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX + SURVEYS_SX + ACRONYM_SX).respond(200, DATA);
                httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + VISUAL_IDENTITY_SX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + VISUAL_IDENTITY_SX).respond(200, DATA);                
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
                expect(headerBuilderFactory.create).toHaveBeenCalledTimes(2);
            });

            it('methodFactoryExistence check', function () {
                expect(factoryResult.allowNewParticipants).toBeDefined();
                expect(factoryResult.getProjectConfiguration).toBeDefined();                
                expect(factoryResult.getVisualIdentity).toBeDefined();
                expect(factoryResult.updateVisualIdentity).toBeDefined();
            });

            describe('resourceMethods', function () {

                afterEach(function () {
                    httpBackend.flush();
                });

                it('allowNewParticipants check', function () {
                    var allowNewParticipants = factoryResult.allowNewParticipants(PERMISSION_PARAMETER);
                    allowNewParticipants.$promise.then(function (resultGetAllowNewParticipants) {
                        expect(resultGetAllowNewParticipants.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('getProjectConfigurationMethod check', function () {
                    var getProjectConfiguration = factoryResult.getProjectConfiguration();
                    getProjectConfiguration.$promise.then(function (resultGetProjectConfiguration) {
                        expect(resultGetProjectConfiguration.data).toEqual(DATA_CONFIRMATION);
                    });
                });                

                it('getVisualIdentityMethod check', function () {
                    var getVisualIdentity = factoryResult.getVisualIdentity();
                    getVisualIdentity.$promise.then(function (resultGetVisualIdentity) {
                        expect(resultGetVisualIdentity.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('updateVisualIdentityMethod check', function () {
                    var updateVisualIdentity = factoryResult.updateVisualIdentity();
                    updateVisualIdentity.$promise.then(function (resultUpdateVisualIdentity) {
                        expect(resultUpdateVisualIdentity.data).toEqual(DATA_CONFIRMATION);
                    });
                });
            });
        });
    });

}());