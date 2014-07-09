$(document).ready(function () {
    if (navigator.onLine) {
        $('.online-status').html('<h4 class="alert alert-success">Status: Online</h4>');
    } else {
        $('.online-status').html('<h4 class="alert alert-danger">Status: OFFLINE</h4>');
        $('.submit-button').prop('href', 'javascript:alert("You must be online to submit a form")');
    }
    $('.sigPad').signaturePad({ drawOnly: true });
});