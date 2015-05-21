
angular.module('ngCordova', [
  'ngCordova.plugins'
]);
angular.module('ngCordova.plugins', [	 'camera',	 'fileTransfer']);//#### Begin Individual Plugin Code ####// install   :   cordova plugin add cordova-plugin-camera
// link      :   https://github.com/apache/cordova-plugin-camera

angular.module('ngCordova.plugins.camera', [])

  .factory('$cordovaCamera', ['$q', function ($q) {

    return {
      getPicture: function (options) {
        var q = $q.defer();

        if (!navigator.camera) {
          q.resolve(null);
          return q.promise;
        }

        navigator.camera.getPicture(function (imageData) {
          q.resolve(imageData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },

      cleanup: function () {
        var q = $q.defer();

        navigator.camera.cleanup(function () {
          q.resolve();
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);
// install   :     cordova plugin add cordova-plugin-file-transfer
// link      :     https://github.com/apache/cordova-plugin-file-transfer

angular.module('ngCordova.plugins.fileTransfer', [])

  .factory('$cordovaFileTransfer', ['$q', '$timeout', function ($q, $timeout) {
    return {
      download: function (source, filePath, options, trustAllHosts) {
        var q = $q.defer();
        var ft = new FileTransfer();
        var uri = (options && options.encodeURI === false) ? source : encodeURI(source);

        if (options && options.timeout !== undefined && options.timeout !== null) {
          $timeout(function () {
            ft.abort();
          }, options.timeout);
          options.timeout = null;
        }

        ft.onprogress = function (progress) {
          q.notify(progress);
        };

        q.promise.abort = function () {
          ft.abort();
        };

        ft.download(uri, filePath, q.resolve, q.reject, trustAllHosts, options);
        return q.promise;
      },

      upload: function (server, filePath, options, trustAllHosts) {
        var q = $q.defer();
        var ft = new FileTransfer();
        var uri = (options && options.encodeURI === false) ? server : encodeURI(server);

        if (options && options.timeout !== undefined && options.timeout !== null) {
          $timeout(function () {
            ft.abort();
          }, options.timeout);
          options.timeout = null;
        }

        ft.onprogress = function (progress) {
          q.notify(progress);
        };

        q.promise.abort = function () {
          ft.abort();
        };

        ft.upload(filePath, uri, q.resolve, q.reject, options, trustAllHosts);
        return q.promise;
      }
    };
  }]);
