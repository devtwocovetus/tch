//Product slider

$(document).on('ready', function () {

    $(".center").slick({
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed: 1600,
        arrows: false,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                centerMode: false
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }]

    });
    
    $(".relatedslider").slick({
        dots: false,
        infinite: true,
        centerMode: true,
        slidesToShow: 2,
        slidesToScroll: 0,
        autoplay: false,
        arrows: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                centerMode: false
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }]

    });

});

// $(".click-eventbtn").click(function(){
//   $(".listing-showhide").addClass("listingoption-showhide");
//   $(".questionyn-wrapper").addClass("questionynoption-showhide");
// });
// $(".click-eventbtn1").click(function(){
//   $(".question-content-wrapper").addClass("question-content-showhide");  
// });


//Datepicker
$('.timepicker').timepicki();

// Add div script

 var counter = 1;

function addInput(divName, template) {
    
    if (counter == 100) {
        document.getElementById("add_more_text").remove();
    } else {
        var newdiv = document.createElement('div');
        newdiv.innerHTML = document.getElementById(divName).innerHTML;
        newdiv.className = 'added';
        document.getElementById(template).appendChild(newdiv);
        counter++;
    }

    var selectElements = document.querySelectorAll('select');
    for (var i = 0; i < selectElements.length; i++) {
        selectElements[i].id = 'id-' + i;
        selectElements[i].name = 'div' + i;
    }
     $('.timepicker').timepicki();
}

function removeInput(obj) {
    if (obj.parentNode.className == 'added') {
        obj.parentNode.parentNode.removeChild(obj.parentNode);
        counter--;
    }
}

// Custom file input
$('.custom-file-input').on('change',function(){
    //get the file name
    var fileName = $(this).val();
    //replace the "Choose a file" label
    $(this).next('.custom-file-label').html(fileName);
})