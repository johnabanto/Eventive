// converts nav bar buttons to drop down menu view
$('.handle').on('click', function(){
	$('nav ul').toggleClass('showing');
})

// keeps nav bar buttons on active state
$('#btn').click(function(){
    if($(this).hasClass('active')){
        $(this).removeClass('active')
    } else {
        $(this).addClass('active')
    }
});