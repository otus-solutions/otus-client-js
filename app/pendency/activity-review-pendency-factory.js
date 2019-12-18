(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ActivityReviewPendencyFactory', ActivityReviewPendencyFactory);

  ActivityReviewPendencyFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ActivityReviewPendencyFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/pendency/activity-review-pendency';

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
          data: {
            'pendencyActivityReview': '@pendencyActivityReview'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          data: {
            'pendencyActivityReview': '@pendencyActivityReview'
          },
          params: {
            'id': '@id'
          }
        },
        getAllByUser: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:id',
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
            'pendencyActivityReview': '@pendencyActivityReview'
          },
          params: {
            'id': '@id'
          }
        }
      });
    }

    return self;
  }

}());