(function () {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.DatasourceResourceFactory', DatasourceResourceFactory);

    DatasourceResourceFactory.$inject = [
        '$http',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function DatasourceResourceFactory($http, OtusRestResourceContext, HeaderBuilderFactory) {
        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            return new HttpFileUpload($http, OtusRestResourceContext, HeaderBuilderFactory);
        }
        return self;
    }

    function HttpFileUpload($http, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/configuration/datasources';
        var self = this;
        var _restPrefix, _token, _headers;

        self.create = create;
        self.update = update;
        self.list = list;
        self.getByID = getByID;

        _init();

        function _init() {
            _restPrefix = OtusRestResourceContext.getRestPrefix();
            _token = OtusRestResourceContext.getSecurityToken();
            _headers = HeaderBuilderFactory.create(_token);
        }

        function create(formData) {
            _headers.setContentType(undefined);
            return $http({
                method: 'POST',
                url: _restPrefix + SUFFIX,
                data: formData,
                headers: _headers.json,
                transformRequest: angular.identity
            });
        };

        function update(formData) {
            _headers.setContentType(undefined);
            return $http({
                method: 'PUT',
                url: _restPrefix + SUFFIX,
                data: formData,
                headers: _headers.json,
                transformRequest: angular.identity
            });
        };

        function list() {
            return $http({
                method: 'GET',
                url: _restPrefix + SUFFIX,
                headers: _headers.json
            });
        };

        function getByID(id) {
            return $http({
                method: 'GET',
                url: _restPrefix + SUFFIX + '/' + id,
                headers: _headers.json
            });
        };
        return self;
    }
}());
