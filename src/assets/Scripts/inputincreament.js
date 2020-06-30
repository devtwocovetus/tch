jQuery(document).ready(function(){
    // This button will increment the value
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        //var currentVal = parseInt($('input[name='+fieldName+']').val());
        var currentVal = parseInt($('.' + fieldName).val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            //$('input[name='+fieldName+']').val(currentVal + 1);
            $('.' + fieldName).val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            //$('input[name='+fieldName+']').val(0);
            $('.' + fieldName).val(20);
        }
    });
    // This button will decrement the value till 20
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        //var currentVal = parseInt($('input[name='+fieldName+']').val());
        var currentVal = parseInt($('.' + fieldName).val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 20) {
            // Decrement one
            //$('input[name='+fieldName+']').val(currentVal - 1);
            if (currentVal >= 21) {
                $('.' + fieldName).val(currentVal - 1);
            }
        } else {
            // Otherwise put a 0 there
            $('.' + fieldName).val(20);
        }
    });
});
