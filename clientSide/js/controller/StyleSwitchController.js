(function($, storage){

    const THEME_STORAGE_KEY = "theme";
    const THEME_DARK = "dark";
    const THEME_LIGHT = "light";

    function setStyle(theme) {
        storage.add(THEME_STORAGE_KEY, theme);

        if (theme === THEME_DARK) {
            $(".js-switcher").addClass(THEME_DARK).removeClass(THEME_LIGHT);
        } else {
            $(".js-switcher").addClass(THEME_LIGHT).removeClass(THEME_DARK);
        }
    }

    $(document).ready(function(){
        setStyle(storage.get(THEME_STORAGE_KEY) || THEME_LIGHT);
        // style Toggle function runs, When pressed -change style- button
        $("#styleBtn").click(function (){
            let cStyle = storage.get(THEME_STORAGE_KEY);
            setStyle(cStyle === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
        });
    });

})(jQuery, services.storage);