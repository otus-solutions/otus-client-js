(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.HeaderBuilderFactory', factory);

    function factory() {
        var self = this;
        self.create = create;

        function create(token) {
            return new Headers(token);
        }

        return self;

    }

    function Headers(token) {
        var self = this;
        self.setContentType = setContentType;

        self.json = {
            'Authorization': 'Bearer ' + token
        };

        function setContentType(contentType) {
          self.json['Content-type'] = contentType;
        }
    }

}());
