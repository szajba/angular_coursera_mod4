(function() {
    'use strict';
    angular.module('data').service('ImageService', ImageService)
        //There is no point in putting constants in separate files
        .constant('flickImageAPIUrl', 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?');

    ImageService.$inject = ['$http', 'flickImageAPIUrl'];

    function ImageService($http, flickImageAPIUrl) {
        var service = this;

        service.getImage = function(query) {
            return $http({
                method: 'GET',
                url: (flickImageAPIUrl),
                params: {
                    tags: query.replace(/[^a-zA-Z ]/g, "").split('_').join(' '),
                    tagmode: "all",
                    safe_search: 1,
                    content_type: 1,
                    sort: "interestingness-desc",
                    format: "json"
                }
            }).then(function(result) {
                  return result.data.items[0]['media']['m'];
            });
        };
    };
})();
