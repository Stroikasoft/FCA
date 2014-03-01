var app = (function (win) {
    'use strict';

    // Global error handling
    var showAlert = function(message, title, callback) {

        navigator.notification.alert(message, callback || function () {
        }, title, 'OK');
    };

    var showError = function(message) {

        showAlert(message, 'Error occured');
    };

    win.addEventListener('error', function (e) {

        e.preventDefault();

        var message = e.message + "' from " + e.filename + ":" + e.lineno;

        showAlert(message, 'Error occured');

        return true;
    });

    // Global confirm dialog
    var showConfirm = function(message, title, callback) {

        navigator.notification.confirm(message, callback || function () {
        }, title, ['OK', 'Cancel']);
    };

    var isApiKeySet = (appSettings.everlive.apiKey !== '$EVERLIVE_API_KEY$');

    if (!isApiKeySet) {
        alert('Backend Services API Key is not set.');
        return;
    }

    var fixViewResize = function () {
        if (device.platform === 'iOS') {
            setTimeout(function() {
                $(document.body).height(window.innerHeight);
            }, 10);
        }
    };

    // Handle device back button tap
  
 

   
    // Handle "orientationchange" event
    document.addEventListener('orientationchange', fixViewResize);

    // Initialize Everlive SDK
    var el = new Everlive({
        apiKey: appSettings.everlive.apiKey,
        scheme: appSettings.everlive.scheme
    });

    var emptyGuid = '00000000-0000-0000-0000-000000000000';

    var AppHelper = {

        // Return user profile picture url
      

        // Return current activity picture url
        resolvePictureUrl: function (id) {

            if (id && id !== emptyGuid) {
                return el.Files.getDownloadUrl(id);
            } else {
                return '';
            }
        },

        // Date formatter. Return date in d.m.yyyy format
        formatDate: function (dateString) {

            var months = [
                'Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'
            ];
            var date = new Date(dateString);
            var year = date.getFullYear();
            var month = months[ date.getMonth() ];
            var day = date.getDate();

            return month + ' ' + day + ', ' + year;
        },

        // Current user logout

    };

    var os = kendo.support.mobileOS,
        statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';

    // Initialize KendoUI mobile application
    var mobileApp = new kendo.mobile.Application(document.body, {
        transition: 'slide',
        statusBarStyle: statusBarStyle,
        skin: 'flat'
    });

    var getYear = (function () {
        var currentTime = new Date();
        return currentTime.getFullYear();
    }());

    return {
        showAlert: showAlert,
        showError: showError,
        showConfirm: showConfirm,
        mobileApp: mobileApp,
        helper: AppHelper,
        everlive: el,
        getYear: getYear
    };

}(window));

