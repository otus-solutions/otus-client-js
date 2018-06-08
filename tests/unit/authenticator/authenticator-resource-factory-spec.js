describe('OtusAuthenticatorResourceFactory', function(){

    var factory;
    
    beforeEach(function(){
        angular.mock.module('otus.client');
        angular.mock.inject(function (_OtusAuthenticatorResourceFactory_) {
            factory = _OtusAuthenticatorResourceFactory_;
            spyOn(factory, "create").and.callThrough();           
        });
    });

    it('factory existence check', function(){
         expect(factory).toBeDefined();
    });

    describe('.create()',function() {
        
         it('method existence check', function() {
             expect(factory.create).toBeDefined();
         });

         it('createMethod funcional check', function() {
             factory.create();
             expect(factory.create).toHaveBeenCalled();            
         });
    });
});