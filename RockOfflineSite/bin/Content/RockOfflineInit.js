$(document).ready(function () {
    var form = $('.persist-local');
    var id = form.attr('data-id-val');

    form.dumbFormState({
        persistPasswords: false, // default is false, recommended to NOT do this
        persistLocal: true, // default is false, persists in sessionStorage or to localStorage
        skipSelector: null, // takes jQuery selector of items you DO NOT want to persist
        autoPersist: true, // true by default, false will only persist on form submit
        id: id
    });
    $('.persist-local').submit(function () {
        //alert(localStorage.getItem('dumbFormState-/Home/Index-2'));
        if (navigator.onLine) {
            return true; //submit
        }
        return false;
    });
});
