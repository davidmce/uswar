$(document).ready(function () {
    $("button#loadYear").click(function () {
        if ($("input#queryYear").val() != "") {
            yearQ = $("input#queryYear").val();
        } else {
            yearQ = 1776;
        }
        $('#load_space').empty();
        $('#allYearsSM').addClass('d-none');
        $('#allYears').removeClass('d-md-block');
        $('#allYearsSM').removeClass('d-md-none');
        $('#allYears > .btn-group').children().remove();
        var i = 0;
        $("#load_space").append('<li class="list-group-item" ><h5 class="text-center display-3 mb-5">' + yearQ + '</h5></li>');
        warArray.forEach(function (item) {
            if (yearQ >= item[3] && yearQ <= item[4]) {
                warRenderList(item);
                i++;
            }
        });
        warArray.forEach(function (item) {
            if (yearQ >= item[3] && yearQ <= item[4]) {
                if (item[6]) {
                    $('#war_li_' + item[0] + ' img').attr('src', item[6]);
                } else {
                    getWikiImg(item[1], function (imgURL) {
                        $('#war_li_' + item[0] + ' img').attr('src', imgURL);
                    });
                }
            }
        });
        if (i == 0) {
            peaceRenderList(yearQ);
        }
    });
    $("button#loadAll").click(function () {
        $('#load_space').empty();
        $('#allYearsSM').removeClass('d-none');
        $('#allYears').addClass('d-md-block');
        $('#allYearsSM').addClass('d-md-none');
        $('#allYears > .btn-group').children().remove();
        $("#allYears > .btn-group").append('<a class="btn btn-secondary btn-sm" href="#yearLookup">Top</a>');
        var i;
        $("#load_space").append('<li class="list-group-item" ><h5 class="text-center display-3 mb-5">1776</h5></li>');
        var currentYear = new Date().getFullYear() - 1;
        var nowar = 0;
		var lastwar = 0;
		
        for (i = 1775; i <= currentYear; i++) {
            if (i % 10 === 0) {
                $("#load_space").append('<li class="list-group-item" id="' + i + '" ><h5 class="text-center display-3 mb-4 mt-2">' + i + '</h5></li>');
                $("#allYears > .btn-group").append('<a class="btn btn-secondary btn-sm" href="#' + i + '">' + i + '</a>');
                nowar = 0;
            }
			
            //$.each(warArray, function (k, val) {
			for (var w = lastwar; w < warArray.length; w++){
				//console.log("w: "+w);
				//console.log("lastwar: "+lastwar);
				//console.log("i: "+i);
				if(warArray[w][3] == i){
					warRenderList(warArray[w]);
                    nowar++;
					lastwar = w;
					//console.log(warArray[w][3] + "->"+i);
				
				}
			}
           /* $.each(warArray, function (k, val) {
                if (val[3] == i) {
                    warRenderList(val);
                    nowar++;
                }
            });*/
            if (i % 10 === 9 && nowar === 0) {
                peaceRenderDecade(i)
            }

        }
        warArray.forEach(function (item) {
            if (item[6]) {
                $('#war_li_' + item[0] + ' img').attr('src', item[6]);
            } else {
                getWikiImg(item[1], function (imgURL) {
                    $('#war_li_' + item[0] + ' img').attr('src', imgURL);
                });
            }
        });
    });
});

function renderDecade(dec){
	var endDec = dec + 9;
	var decArray = [];
	for (i = dec; i <= endDec; i++) {
		//console.log("dec: "+dec+"\ni: "+i+"\nendDec: "+endDec);
			for (var w = 0; w < warArray.length; w++){
				
				if(warArray[w][3] == i && decArray.indexOf(warArray[w][0]) === -1){					
					//warRenderList(warArray[w]);
					decArray.push(warArray[w][0]);
				}else{
					if(warArray[w][4] == i && decArray.indexOf(warArray[w][0]) === -1){
						//warRenderList(warArray[w]);
						decArray.push(warArray[w][0]);
					}
				}
			}
        }
		/*then we use the decArray to render a timeline graph of the decade*/
		console.log(decArray);	
}

function peaceRender(year) {
    $("#load_space").append('<div class="col-sm-6 col-md-4" id="peaceCol">');
    $("#load_space #peaceCol").append('<div class="card" id="peaceCard">');
    $("#load_space #war_" + item[0]).append('<img width="220px" class="align-self-start mr-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Flag_of_the_United_States_%281877%E2%80%931890%29.svg/300px-Flag_of_the_United_States_%281877%E2%80%931890%29.svg.png">');
    $("#load_space #peaceCard").append('<h2 class="card-header">No War!</h2>');
    $("#load_space #peaceCard").append('<div class="card-body"><h5 class="card-title">' + year + '</h5>');
    $("#load_space #peaceCard .card-body").append('<p class="card-text">This is one of the few years where the US was involved in no armed conflict or war.</p>');
}

function peaceRenderList(year) {

    $("#load_space").append('<li class="media" id="peaceli">');
    $("#load_space #peaceli").append('<img width="220px" class="align-self-start mr-3 d-none d-sm-block" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Flag_of_the_United_States_%281877%E2%80%931890%29.svg/300px-Flag_of_the_United_States_%281877%E2%80%931890%29.svg.png">');
    $("#load_space #peaceli").append('<div class="media-body" id="peaceMedia">');
    $("#load_space #peaceMedia").append('<h2 class="mt-0 mb-1">No War!</h2>');
    $("#load_space #peaceMedia").append('<p class="card-text">This is one of the few years where the US was involved in no armed conflict or war.</p>');
}

function peaceRenderDecade(year) {
    decade = year - 9;
    $("#load_space").append('<li class="media" id="peaceli_' + decade + '">');
    $('#load_space #peaceli_' + decade).append('<img width="220px" class="align-self-start mr-3 d-none d-sm-block" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/US_Peace_flag.svg/220px-US_Peace_flag.svg.png">');
    $('#load_space #peaceli_' + decade).append('<div class="media-body peaceMedia">');
    $('#load_space #peaceli_' + decade + ' .peaceMedia').append('<h2>No War this decade!</h2>');
    $('#load_space #peaceli_' + decade + ' .peaceMedia').append('<p>This has only happened <strong>twice</strong> in the history of the United States!</h2>');
}

function warRenderList(item) {
    $("#load_space").append('<li class="media border-bottom pb-4 mb-4" id="war_li_' + item[0] + '">');
    $("#load_space #war_li_" + item[0]).append('<img width="220px" class="align-self-start mr-3 d-none d-sm-block" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Flag_of_the_United_States_%281877%E2%80%931890%29.svg/180px-Flag_of_the_United_States_%281877%E2%80%931890%29.svg.png">');
    $("#load_space #war_li_" + item[0]).append('<div class="media-body">');
    $("#load_space #war_li_" + item[0] + ' .media-body').append('<h2 class="mt-0 mb-">' + item[1] + '</h2>');
    $("#load_space #war_li_" + item[0] + ' .media-body').append('<img class="mb-2 d-block d-sm-none rounded mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Flag_of_the_United_States_%281877%E2%80%931890%29.svg/180px-Flag_of_the_United_States_%281877%E2%80%931890%29.svg.png">');
    $("#load_space #war_li_" + item[0] + ' .media-body').append('<p class="lead">' + item[3] + '-' + item[4] + '</p>');
    $("#load_space #war_li_" + item[0] + " .media-body").append('<p class="">' + item[2] + '</p>');
    $("#load_space #war_li_" + item[0] + " .media-body").append('<a rel="ext" class="btn btn-primary" href="' + item[5] + '">Find out more on Wikipedia</a>');
}

function checkYear(data) {
    if (data.value < 1776) {
        $('#queryYear').val(1776)
    }
    var currentYear = new Date().getFullYear();
    if (data.value > currentYear) {
        $('#queryYear').val(currentYear)
    }
}