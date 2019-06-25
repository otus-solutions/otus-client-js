(function() {
   'use strict';

   angular
      .module('otus.client')
      .factory('otusjs.otus.client.OtusConfigurationResourceFactory', Factory);

   Factory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

   function Factory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
      var SUFFIX = '/configuration';      

      var self = this;
      self.create = create;

      function create() {
         var restPrefix = OtusRestResourceContext.getRestPrefix();
         var token = OtusRestResourceContext.getSecurityToken();
         var headers = HeaderBuilderFactory.create(token);
         var headersPublishTemplate = HeaderBuilderFactory.create(token);
         headersPublishTemplate.setContentType('application/json; charset=utf-8');

         var config = {
            getSurveys: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/surveys',
               headers: headers.json
            },
            getAllSurveys: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/surveys/all',
               headers: headers.json
            },
            getByAcronym: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/surveys/:acronym',
               headers: headers.json
            },
            getSurveyVersions: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/surveys/:acronym/versions',
               headers: headers.json,
               params: {
                'acronym': '@acronym'
               }
            },
            updateSurveyTemplateType: {
               method: 'PUT',
               url: restPrefix + SUFFIX + '/surveys/:acronym/type',
               data: {
                  'newSurveyFormType': '@newSurveyFormType'
               },
               headers: headers.json,
               params: {
                  'acronym': '@acronym'
               }
            },
            publishTemplate: {
               method: 'POST',
               url: restPrefix + SUFFIX + '/publish/template',
               headers: headersPublishTemplate.json
            },
            deleteSurveyTemplate: {
               method: 'DELETE',
               url: restPrefix + SUFFIX + '/surveys/:acronym',
               headers: headers.json
            }
         };
         return $resource({}, {}, config);
      }
      return self;

   }
}());
