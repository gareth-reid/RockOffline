/// <reference path="./jquery.d.ts" />
/*
depends on:
HTML 5 storage capability
Browsers supported: IE 8+ and current version of Firefox, Safari, Opera and Chrome
jQuery 1.5 : tested in this version only, try it out on lower versions if you like
json2.js : Douglas Crockford GitHUB -> https://github.com/douglascrockford/JSON-js
instance methods:
$('form').rockOffline('remove'); // removes all data associated with the forms matching the selector
*/
(function ($, JSON, w) {
    function removeData(dbType) {
        var keys = [], db;
        if (!w.sessionStorage || !w.localStorage) {
            return;
        }
        db = (dbType === 'local') ? w.localStorage : w.sessionStorage;
        for (var key in db) {
            if (key.indexOf('rockOffline-') === 0) { keys.push(key); }
        }
        for (var i = 0; i < keys.length; i++) {
            delete db[keys[i]];
        }
    };
    $.fn.rockOffline = function () {
        var $self = $(this), config, formKey,
        nonCheckableSelector = 'input[type="text"],input[type="password"],input[type="email"],input[type="hidden"],input[type="url"],input[type="tel"],input[type="search"],textarea,select',
        checkableSelector = 'input[type="checkbox"],input[type="radio"]',
        passwordSelector = 'input[type="password"]',
        remove = false;

        var input_types = ['color', 'date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'range', 'search', 'tel', 'time', 'url', 'week'];
        for (var i in input_types) {
            var e = document.createElement('input');
            e.type = input_types[i];
            if (e.type == input_types[i]) {
                nonCheckableSelector = nonCheckableSelector + ',input[type="' + e.type + '"]';
            }
        }
        var allSelector = nonCheckableSelector + ',' + checkableSelector;

        function encode(str) {
            if (!str) { return ''; }
            return $('<div />').text(str).html().replace('"', '&quote;');
        }
        function persist($form, key) {
            var formData = [];
            $form.find(allSelector).each(function () {
                var $this = $(this);
                if (!config.skipSelector || !$this.is(config.skipSelector)) {
                    if ($this.is(nonCheckableSelector)) {
                        if ($this.is(passwordSelector) && !config.persistPasswords) { return; }
                        formData[formData.length] = {
                            selector: $this[0].nodeName.toLowerCase() +
                                    '[name="' + encode($this.attr('name')) + '"]',
                            val: $this.val()
                        };
                    } else if ($this.is(checkableSelector)) {
                        if ($this.attr('checked')) {
                            formData[formData.length] = {
                                selector: $this[0].nodeName.toLowerCase() +
                                        '[name="' + encode($this.attr('name')) + '"][value="' + encode($this.val()) + '"]',
                                val: 'checked'
                            };
                        }
                    }
                }
            });
            db[key] = JSON.stringify(formData);
        }
        if (typeof (w.sessionStorage) === 'undefined' || typeof (w.localStorage) === 'undefined') {
            return $self;
        }
        if ($self.data('rockOffline-defined')) {
            config = $self.data('rockOffline-config');
            if (arguments.length > 0 && $.isPlainObject(arguments[0])) {
                config = $.extend(config, arguments[0]);
                return $self;
            } else if (arguments.length > 0 && arguments[0] === 'remove') {
                remove = true;
            } else {
                return $self;
            }

        } else {
            $self.data('rockOffline-defined', true);
            config = {
                persistPasswords: false,
                skipSelector: null,
                persistLocal: false,
                autoPersist: true,
                id: ''
            };
            if (arguments.length > 0 && $.isPlainObject(arguments[0])) {
                config = $.extend(config, arguments[0]);
            }
            $self.data('rockOffline-config', config);
        }
        db = config.persistLocal ? w.localStorage : w.sessionStorage;
        $('form').each(function () {
            var $this = $(this);
            $this.data('rockOffline-index', $this.index());
        });
        $self.each(function () {
            var $this = $(this),
                key = config.id;//'rockOffline-' + window.location.pathname + '-' + $this.data('rockOffline-index'),
            dbObj = db[key], persistTimeout = null;
            if ($this[0].nodeName !== 'FORM') {
                throw 'rockOffline - must be called on form elements only';
            }
            if (remove) {
                $this.unbind('blur.rockOffline focus.rockOffline click.rockOffline keyup.rockOffline submit.rockOffline change.rockOffline');
                delete db[key];
                return;
            }
            if (dbObj) {
                dbObj = $.parseJSON(dbObj);
                for (var i = 0; i < dbObj.length; i++) {
                    $this.find(dbObj[i].selector).each(function () {
                        var $this = $(this);
                        if ($this.is(checkableSelector)) {
                            $this.attr('checked', true);
                        } else {
                            try { $this.val(dbObj[i].val); } catch (e) { }
                        }
                    });
                }
            }
            $this.bind('submit.rockOffline', function (ev) {
                persist($this, key);
            });
            if (config.autoPersist) {
                $this.bind('blur.rockOffline focus.rockOffline click.rockOffline keyup.rockOffline change.rockOffline', function () {
                    if (persistTimeout !== null) {
                        window.clearTimeout(persistTimeout);
                        persistTimeout = null;
                    }
                    persistTimeout = window.setTimeout(function () { persist($this, key); }, 250);
                });
            }
        });
        return $self;
    };
    $.fn.rockOffline.removeSession = function () {
        removeData('session');
    };
    $.fn.rockOffline.removeLocal = function () {
        removeData('local');
    };
    $.fn.rockOffline.removeAll = function () {
        $.fn.rockOffline.removeSession();
        $.fn.rockOffline.removeLocal();
    };
})(jQuery, JSON, window);