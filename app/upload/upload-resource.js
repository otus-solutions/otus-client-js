(function() {
   'use strict';

   angular
      .module('otus.client')
      .factory('otus.client.UploadResourceFactory', UploadResourceFactory);

   UploadResourceFactory.$inject = [
        '$http',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

   function UploadResourceFactory($http, OtusRestResourceContext, HeaderBuilderFactory) {
      var SUFFIX = '/upload';

      var self = this;

      /* Public methods */
      self.create = create;

      function create() {
         return new HttpFileUpload($http, OtusRestResourceContext, HeaderBuilderFactory);
      }
      return self;
   }

   function HttpFileUpload($http, OtusRestResourceContext, HeaderBuilderFactory) {
      var self = this;
      var _restPrefix, _token, _headers;
      var SUFFIX = '/upload';

      self.post = post;
      self.getByOID = getByOID;
      self.deleteByOID = deleteByOID;

      _init();

      function _init() {
         _restPrefix = OtusRestResourceContext.getRestPrefix();
         _token = OtusRestResourceContext.getSecurityToken();
         _headers = HeaderBuilderFactory.create(_token);
      }

      function post(formData, canceler) {
         _headers.setContentType(undefined);
         return $http({
            method: 'POST',
            url: _restPrefix + SUFFIX,
            data: formData,
            headers: _headers.json,
            timeout: canceler.promise,
            transformRequest: angular.identity
         });
      }

      function getByOID(oid) {
         return $http({
            method: 'POST',
            url: _restPrefix + SUFFIX,
            data: oid,
            responseType: "arraybuffer",
            headers: _headers.json
         });
      }

      function deleteByOID(oid) {
         return $http({
            method: 'DELETE',
            url: _restPrefix + SUFFIX + '/' + oid,
            headers: _headers.json,
         });

      }

      return self;
   }

}());
