(function(){
    'use strict';

    $(".form-ajax").submit(function(event) {
        event.preventDefault();

        var data = $(this).serialize();
        var action = $(this).attr('action');

        $.ajax({
            type: "POST",
            url: action,
            data: data,
            dataType: 'json',
            success: function( data ) {
                console.log(data);
                if(data.error){
                    return swal("Oops...", data.message, "error");
                }

                swal("Parabens!", data.message, "success");
            }
        });

    });

})();