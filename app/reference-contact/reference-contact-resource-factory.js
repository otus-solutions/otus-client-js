(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ReferenceContactResourceFactory', ReferenceContactResourceFactory);

  ReferenceContactResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ReferenceContactResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/reference-contact';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        createReferenceContact: {
          method: 'POST',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
            'referenceContactJson': '@referenceContactJson'
          }
        },
        updateReferenceContact: {
          method: 'PUT',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
            'referenceContactJson': '@referenceContactJson'
          }
        },
        getAllReferenceContacts: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/:rn",
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        removeReferenceContact: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + "/:id",
          headers: headers.json,
          params: {
            'id': '@id'
          }
        }

      });
    }

    return self;
  }

}());
