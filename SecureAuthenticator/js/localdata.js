(function () {
    "use strict";



    window.Data = {

        getAccounts: function () {
            var accounts = localStorage.getItem("accounts");
            return accounts ? JSON.parse(accounts) : [];
        },

        saveAccounts: function (value) {
            localStorage.setItem("accounts", JSON.stringify(value));
        },
    };

})();