(function(){
    'use strict';

    describe('OtusAuthenticatorResourceFactory', function(){

        var METHOD_POST_VALUE = "POST";
        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var SUFFIX = '/authentication';
        var INVALIDATE_SUFFIX = '/invalidate';
        var AUTHENTICATE_PROJECT_SUFFIX = '/project';
        var DATA = {'data': 'returnPromiseOK'};
        var DATA_CONFIRMATION = 'returnPromiseOK';



        var factory, resource, otusRestResourceContext, headerBuilderFactory;
        var factoryResult, httpBackend;

        beforeEach(function(){
            angular.mock.module('otus.client');
            angular.mock.inject(function(_$injector_){
                factory = _$injector_.get('OtusAuthenticatorResourceFactory');
                resource = _$injector_.get('$resource');
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + INVALIDATE_SUFFIX).respond(200, DATA);
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + AUTHENTICATE_PROJECT_SUFFIX).respond(200, DATA);
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();
            });
        });

        it('factoryExistence check', function(){
            expect(factory).toBeDefined();
        });

        describe('factoryInstance', function(){
            
            it('createMethodExistence check', function(){
                expect(factory.create).toBeDefined();
            });

            beforeEach(function(){
                factoryResult = factory.create();            

            });

            it('internalCalls check', function(){
                expect(otusRestResourceContext.getRestPrefix).toHaveBeenCalledTimes(1);
                expect(otusRestResourceContext.getSecurityToken).toHaveBeenCalledTimes(1);
                expect(headerBuilderFactory.create).toHaveBeenCalledTimes(1);                
            });

            describe('resourceMethods', function(){

                afterEach(function(){
                    httpBackend.flush();
                });

                it('autenticationMethod check',function(){
                    var authenticate = factoryResult.authenticate();
                    authenticate.$promise.then(function(resultAuthenticate){
                        expect(resultAuthenticate.data).toEqual(DATA_CONFIRMATION);
                    });                  
                });

                it('invalidateMethod check', function () {
                    var invalidate = factoryResult.invalidate();
                    invalidate.$promise.then(function (resultInvalidate) {
                        expect(resultInvalidate.data).toEqual(DATA_CONFIRMATION);
                    });
                });

                it('authenticateProjectMethod check', function () {
                    var authenticateProject = factoryResult.authenticateProject();
                    authenticateProject.$promise.then(function (resultauthenticateProject) {
                        expect(resultauthenticateProject.data).toEqual(DATA_CONFIRMATION);
                    });
                });
            });
        });
    });

}());