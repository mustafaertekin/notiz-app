// Revealing Module Pattern (less use of the global scope)
let commons =
    ( function(){


        class HttpService
        {
            static async findAll() {
                let response = await fetch(restUrl);
                return await response.json();
            }

            static async findById(id) {
                let response = await fetch(`${restUrl}/${id}`);
                return await response.json();
            }

            static async create(data) {
                return await fetch(restUrl, {
                    body: JSON.stringify(data),
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(response => response.json()) // parses response to JSON
            }

            static async update(data) {
                return await fetch(`${restUrl}/${data._id}`, {
                    body: JSON.stringify(data), // must match 'Content-Type' header
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(response => response.json()) // parses response to JSON
            }

            static async remove(id) {
                return await fetch("http://localhost:8000/notes/" + id, {
                    method: 'DELETE'
                })
                    .then(response => response.json());
            }
        }





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