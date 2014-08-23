(function () {


    //Data.accounts = [{ name: "test", key: "AAAAAAAAAAAAAAAA" },
    //                { name: "test2", key: "BBBBBBBBBBBBBBBB" },
    //                { name: "test3", key: "CCCCCCCCCCCCCCCC" }];


    var previousValue = 0;
    function updateKeysDisplayed(forceRefresh) {
        var accounts = Data.getAccounts();

        var nowSeconds = new Date().getSeconds();
        if (nowSeconds >= 30)
            nowSeconds -= 30;
        var nowMilli = Math.round(new Date().getMilliseconds() / 100);

        var newValue = nowSeconds * 10 + nowMilli;
        document.getElementById("timer").value = newValue;


        if (newValue < previousValue || forceRefresh) {
            var noAccountDiv = document.getElementById("noAccount");
            if (accounts && accounts.length > 0) {
                var codeTemplate = document.getElementById("codeTemplate").innerHTML;
                var html = "";
                for (var i = 0; i < accounts.length; i++) {
                    var account = accounts[i];
                    html += codeTemplate
                                .replace("{{code}}", Totp.updateOtp(account.key))
                                .replace("{{name}}", account.name);
                }

                var codeContainer = document.getElementById("codes");
                codeContainer.innerHTML = html;
                noAccountDiv.style.display = "none";
            }
            else {
                noAccountDiv.style.display = "block";
            }
        }

        previousValue = newValue;
    }
    updateKeysDisplayed(true);
    setInterval(updateKeysDisplayed, 100);




    var addLink = document.querySelector("a.add");
    addLink.addEventListener("click", function () {
        document.getElementById("tbName").value = "";
        document.getElementById("tbKey").value = "";

        if (document.body.classList.contains("add-account")) {
            document.body.classList.remove("add-account");
        } else {
            document.body.classList.add("add-account");
        }
    });

    var saveLink = document.querySelector("a.save");
    saveLink.addEventListener("click", function () {
        var errorDiv = document.querySelector(".account-error");
        errorDiv.style.visibility = "hidden";

        var accounts = Data.getAccounts();

        var name = document.getElementById("tbName").value;
        var key = document.getElementById("tbKey").value;

        if (!name) {
            errorDiv.innerHTML = "Please enter the account name";
            errorDiv.style.visibility = "visible";
            return;
        }
        if (!key) {
            errorDiv.innerHTML = "Please enter the code";
            errorDiv.style.visibility = "visible";
            return;
        }
        //TODO : check if key is correct

        accounts.push({ name: name, key: key });
        Data.saveAccounts(accounts);

        updateKeysDisplayed(true);
        document.body.classList.remove("add-account");
    });
})();