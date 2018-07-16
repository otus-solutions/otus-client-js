(function () {
    'use strict'

    describe('UploadResourceFactory', function() {

        var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
        var REST_WITH_SUFIX = 'http://localhost:8080/otus-rest/v01/upload';    
        var OID = 123456;
        var REST_WITH_OID = 'http://localhost:8080/otus-rest/v01/upload/'+OID;
        var DATA = {'data':'5ab9039813cdd20490873aff'};
        var METHOD_POST_VALUE = "POST";
        var METHOD_DELETE_VALUE = "DELETE";
        var SUFFIX = '/upload';

        var factory, factoryResult, otusRestResourceContext;
        var headerBuilderFactory, httpBackend, promise;
        var getFactoryResult, postFactoryResult, deleteFactoryResult;      
        

        beforeEach(function(){
            angular.mock.module('otus.client');        
            angular.mock.inject(function (_$injector_, _$q_) {
            
                factory = _$injector_.get('otus.client.UploadResourceFactory'); 
                otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
                headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
                promise = _$q_.defer;           
                httpBackend = _$injector_.get('$httpBackend');
                httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX).respond(200, DATA);
                httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX + '/' + OID).respond(200, DATA);
                spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
                spyOn(otusRestResourceContext, 'getSecurityToken');
                spyOn(headerBuilderFactory, 'create').and.callThrough();                
                });
            });
            
            it('factoryExistence check', function(){
                expect(factory).toBeDefined();        
            });
            
            describe('HttpFileUploadInstance', function(){            
                
                it("createMethodExistence check", function(){                    
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
                    expect(factoryResult.post).toBeDefined();
                    expect(factoryResult.getByOID).toBeDefined();
                    expect(factoryResult.deleteByOID).toBeDefined();
                });
            

            describe('HttpFileUploadMethodAtributes', function(){

                afterEach(function () {
                    httpBackend.flush();
                });

                it('getMethodAttributes check', function () {
                    getFactoryResult = factoryResult.getByOID(OID);
                    getFactoryResult.then(function (resultGet) {
                        expect(resultGet.data).toEqual(DATA);
                        expect(resultGet.config.method).toEqual(METHOD_POST_VALUE);
                        expect(resultGet.config.url).toEqual(REST_WITH_SUFIX);
                    });                   
                });

                it('postMethodAttributes check', function () {
                    postFactoryResult = factoryResult.post(DATA, promise);
                    postFactoryResult.then(function (resultPost) {
                        expect(resultPost.data).toEqual(DATA);
                        expect(resultPost.config.method).toEqual(METHOD_POST_VALUE);
                        expect(resultPost.config.url).toEqual(REST_WITH_SUFIX);
                    });                    
                });

                it('deleteMethodAttributes check', function () {
                    deleteFactoryResult = factoryResult.deleteByOID(OID);
                    deleteFactoryResult.then(function (resultDelete) {
                        expect(resultDelete.data).toEqual(DATA);
                        expect(resultDelete.config.method).toEqual(METHOD_DELETE_VALUE);
                        expect(resultDelete.config.url).toEqual(REST_WITH_OID);
                    });                    
                });            
            }); 
        });
    });
}());