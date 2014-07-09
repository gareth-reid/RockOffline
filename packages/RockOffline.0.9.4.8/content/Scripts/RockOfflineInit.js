

$(document).ready(function () {
    $('.persist-local').each(function () {
        var $this = $(this);
        $this.rockOffline({
            persistPasswords: false, // default is false, recommended to NOT do this
            persistLocal: true, // default is false, persists in sessionStorage or to localStorage
            skipSelector: null, // takes jQuery selector of items you DO NOT want to persist
            autoPersist: true, // true by default, false will only persist on form submit
            id: $this.attr('dataidval'),
        });
    });

    $('.persist-local').submit(function () {
        if (navigator.onLine) {
            localStorage.removeItem(form.attr('dataidval')); //remove it from the cache
            return true; //submit
        }
        return false;
    });
});