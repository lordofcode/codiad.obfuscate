(function(global, $){

    var codiad = global.codiad;

    $(function() {
        codiad.obfuscate.init();
    });

    codiad.obfuscate = {
       
        init: function() {
        },

        doRename: function() {
            codiad.filemanager.renameNode($('#context-menu').attr('data-path'));
            this.inject(0);
        },

        getUniqueGuid: function() {
            // 8-4-4-4-12
            var validItems = [];
            for (k=0;k<10;k++) {
                validItems.push(k);
            }
            for (k=65;k<71;k++) {
                validItems.push(String.fromCharCode(k));
            }
            var resultGuid = '';
            for (k=0; k < 32; k++) {
                var rnd = Math.floor(Math.random() * validItems.length);
                resultGuid += validItems[rnd];
                switch(resultGuid.length) {
                    case 8:
                    case 13:
                    case 18:
                    case 23:
                        resultGuid += '-';
                        break;
                }
            }

            return resultGuid;
        },

        inject: function(counter) {
            counter++;
            try{
                if (counter >= 10) {
                    return;
                } 
                if ($('#modal-content form').is(":visible") == false) {
                    var instance = this;
                    var paramcounter = counter;
                    setTimeout(function(){instance.inject(paramcounter)}, 1000);
                }
                else {
                    $('#modal-content form input[name="object_name"]').val(this.getUniqueGuid()+'.zip');
                }
            }
            catch(e){ console.log(e); }
        }
    };
})(this, jQuery);