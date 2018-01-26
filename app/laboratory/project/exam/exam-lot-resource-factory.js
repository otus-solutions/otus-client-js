(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ExamLot', ExamLot);

    ExamLot.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ExamLot($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/laboratory-project/exam-lot';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                getAliquots: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/aliquots',
                    headers: headers.json
                },
                getAliquotsByCenter: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/aliquots/:center',
                    headers: headers.json,
                    params: {
                        'center': '@center'
                    }
                },
                getAvailableExams: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/available-exams/:center',
                    headers: headers.json,
                    params: {
                        'center': '@center'
                    }
                },
                getLots: {
                    method: 'GET',
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                createLot: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json,
                    data: {
                        'sampleLot': '@sampleLot'
                    }
                },
                updateLot: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX,
                    headers: headers.json,
                    data: {
                        'sampleLot': '@sampleLot'
                    }
                },
                deleteLot: {
                    method: 'DELETE',
                    url: restPrefix + SUFFIX + '/:id',
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
