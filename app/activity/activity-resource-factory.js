(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ActivityResourceFactory', ActivityResourceFactory);

  ActivityResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ActivityResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/participants/:rn/activities';
    var UPDATE_CHECKER ='/update-checker-activity';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        create: {
          method: 'POST',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          params: {
            'id': '@id',
            'rn': '@rn'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          data: {
            'activity': '@activity'
          },
          params: {
            'id': '@id',
            'rn': '@rn'
          }
        },
        listAll: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        getById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id': '@id',
            'rn': '@rn'
          }
        },
        addActivityRevision: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/revision',
          headers: headers.json,
          data: {
            'activityRevision': '@activityRevision'
          }
        },
        getActivityRevisions: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/revision/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },
        deleteById: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          data: {
            'activity': '@activity'
          },
          params: {
            'id': '@id',
            'rn': '@rn'
          }
        },
        updateCheckerActivity: {
          method: 'PUT',
          url: restPrefix + SUFFIX + UPDATE_CHECKER,
          headers: headers.json,
          data: {
            'checkerUpdated': '@checkerUpdated'
          }
        },
        getAllByStageGroup: {
          method: 'GET',
          url: restPrefix + SUFFIX +'/by-stage',
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        discard: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/discard' + '/:id',
          headers: headers.json,
          params: {
            'id': '@id',
            'rn': '@rn'
          }
        }
      });
    }

    return self;
  }

}());

