(function() {
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
        addNewGroup: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/new-group',
          headers: headers.json
        },
        getListOfSurveyGroups: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/group',
          headers: headers.json
        },
        editGroup: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/update-group',
          headers: headers.json
        },
        deleteGroup: {
          method: 'GET',
          // url: restPrefix + SUFFIX + '/?',
          headers: headers.json
        }
      });
    }

    return self;
  }

}());
