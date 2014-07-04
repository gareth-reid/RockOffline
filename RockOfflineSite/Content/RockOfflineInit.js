$(document).ready(function () {
    var form = $('.persist-local');
    var id = form.attr('data-id-val');//would prefer data-id-val but most mvc form helpers dont allow this

    form.dumbFormState({
        persistPasswords: false, // default is false, recommended to NOT do this
        persistLocal: true, // default is false, persists in sessionStorage or to localStorage
        skipSelector: null, // takes jQuery selector of items you DO NOT want to persist
        autoPersist: true, // true by default, false will only persist on form submit
        id: id
    });
    $('.persist-local').submit(function () {
        if (navigator.onLine) {
            localStorage.removeItem(form.attr('dataidval'));
            return true; //submit
        }
        return false;
    });
});
