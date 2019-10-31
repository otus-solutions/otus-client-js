(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.SurveyGroupResourceFactory', SurveyGroupResourceFactory);

  SurveyGroupResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function SurveyGroupResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/survey';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        addNewSurveyGroup: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/new-group',
          headers: headers.json,
          data: {
            'surveyGroupJson': '@surveyGroupJson'
          }
        },

        getListOfSurveyGroups: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/groups',
          headers: headers.json
        },
        updateSurveyGroupName: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/update-group-name',
          headers: headers.json,
          data: {
            'updateSurveyGroupNameDto': '@updateSurveyGroupNameDto'
          }
        },

        updateSurveyGroupAcronyms: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/update-group',
          headers: headers.json,
          data: {
            'surveyGroupJson': '@surveyGroupJson'
          }
        },

        deleteSurveyGroup: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/delete-group',
          headers: headers.json,
          data: {
            'updateSurveyGroupNameDto': '@updateSurveyGroupNameDto'
          }
        },

        getSurveyGroupsByUser: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/groups-by-user',
          headers: headers.json
        }
      });
    }

    return self;
  }

}());
