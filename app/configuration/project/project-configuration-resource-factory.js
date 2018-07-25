(function() {
   'use strict';

   angular
      .module('otus.client')
      .factory('otusjs.otus.client.OtusProjectConfigurationResourceFactory', Factory);

   Factory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

   function Factory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
      var SUFFIX = '/configuration/project';

      var self = this;
      self.create = create;

      function create() {
         var restPrefix = OtusRestResourceContext.getRestPrefix();
         var token = OtusRestResourceContext.getSecurityToken();
         var headers = HeaderBuilderFactory.create(token);
         var headersPublishTemplate = HeaderBuilderFactory.create(token);
         headersPublishTemplate.setContentType('application/json; charset=utf-8');

         var config = {
            allowNewParticipants: {
               method: 'PUT',
               url: restPrefix + SUFFIX + '/participant/registration/:permission',
               headers: headers.json,
               params: {
                  'permission': '@permission'
               }
            },
            getProjectConfiguration: {
               method: 'GET',
               url: restPrefix + SUFFIX,
               headers: headers.json
            },
            getVisualIdentity: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/visual-identity',
               headers: headers.json
            },
            updateVisualIdentity: {
               method: 'POST',
               url: restPrefix + SUFFIX + '/visual-identity',
               headers: headers.json
            }
         };
         return $resource({}, {}, config);
      }
      return self;

   }
}());
