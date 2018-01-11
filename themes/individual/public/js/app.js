$(function() {

	//for ie8
    var alertFallback = false;
    if (typeof console === "undefined" || typeof console.log === "undefined") {
        console = {};
        if (alertFallback) {
            console.log = function(msg) {
                alert(msg);
            };
        } else {
            console.log = function() {};
        }
    }

    $.itexUp({
        elementID: 'up', //ID элемента
        showButtonHeight: 300, //Высота прокрутки в пикселя, когда появляется кнопка
        speed: 1000 //Скорость прокрутки в милисекундах
    });

    $('table').wrap('<div class="table-responsive">');
});


$(document).ready(function() {
	$('.hrefpop').fancybox();
	
    $('.navN .firstpage').attr('title', 'На первую');
    $('.navN .lastpage').attr('title', 'На последнюю');
	$('.navN .nextpage').attr('title', 'На следущую');
	$('.navN .prevpage').attr('title', 'На предыдущую');

	// img alt fix
	$('img').each(function(){
		if (!$(this).attr('alt')) { $(this).attr('alt',""); }
	});
});
