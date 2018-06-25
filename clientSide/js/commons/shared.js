// Revealing Module Pattern (less use of the global scope)
let commons =
    ( function(){

        function LocalStorageService () {
            this.setItem = (key, value) => {
                value = JSON.stringify(value);
                localStorage.setItem(key, value);
            }

            this.getItem = (key) => {
                let items = localStorage.getItem(key);
                return JSON.parse(items);
            }
        }

        function setStyle(styleName) {
            localStorage.setItem('style', styleName);
            changeStyleClass (styleName);
        }

        function changeStyleClass (param) {
            if (param === "dark") {
                $(".js-switcher").addClass("dark").removeClass("light");
            } else {
                $(".js-switcher").addClass("light").removeClass("dark");
            }
        }

        $(document).ready(function(){

            setStyle(localStorage.getItem('style') || 'light');

            // style Toggle function runs, When pressed -change style- button
            $("#styleBtn").click (function (){
                let cStyle = localStorage.getItem('style');
                if (cStyle == "light") {
                    cStyle = "dark";
                } else {
                    cStyle = "light";
                }
                setStyle(cStyle);
            });
        });

        // Can be reached the LocalStorageService so: "commons.LocalStorageService"
        return {
            LocalStorageService,
        };
})();