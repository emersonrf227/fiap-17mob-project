var app = {
    initialize: function() {
        document.addEventListener('deviceready', () => {
            window.plugins.OneSignal.setRequiresUserPrivacyConsent(true);

            window.plugins.OneSignal
                .startInit("8f8dff53-7aa9-4845-8cd4-447e264df600")
                .handleNotificationOpened((jsonData) => {
                    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                })
                .endInit();

            window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
                console.log("User accepted notifications: " + accepted);
            });
        }, false);
    },
};

app.initialize();