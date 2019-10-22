$(document).ready(function(){
  		$("button#loadYear").click(function(){
			
			if($("input#queryYear").val() !=""){yearQ = $("input#queryYear").val();}else{yearQ=1776;}
			$('#load_space').empty();
			$('#allYearsSM').addClass('d-none');
			$('#allYears').removeClass('d-md-block');
			$('#allYearsSM').removeClass('d-md-none');
			//console.log("year: "+yearQ);
			var i = 0;
			$("#load_space").append('<li class="list-group-item" ><h5 class="text-center display-3 mb-5">'+yearQ+'</h5></li>');
			warArray.forEach(function(item){
				if(yearQ>=item[3] && yearQ<=item[4]){
					console.log("start: "+item[3]+" end: "+item[4]);
					warRenderList(item);

					i++;
				}
			});
			warArray.forEach(function(item){
				if(yearQ>=item[3] && yearQ<=item[4]){
					/*getWikiImg(item[1], function(imgURL){
						if(imgURL!=""){
							$('#war_li_'+item[0]+' img').attr('src',imgURL);
							console.log(item[0]+" - "+imgURL)
						}
					});*/
					if(item[6]){
						console.log("array image: "+item[6]);
						$('#war_li_'+item[0]+' img').attr('src',item[6]);
					}else{
						getWikiImg(item[1], function(imgURL){
							$('#war_li_'+item[0]+' img').attr('src',imgURL);						
							console.log("wiki image: "+imgURL);
						});
					}
				}
			});
			
			if(i==0){peaceRenderList(yearQ);}
		});
		$("button#loadAll").click(function(){
			$('#load_space').empty();
			//$('#allYears').removeClass('d-none');
			$('#allYearsSM').removeClass('d-none');
			$('#allYears').addClass('d-md-block');
			$('#allYearsSM').addClass('d-md-none');
			console.log('pressed all');
			var i;
			$("#load_space").append('<li class="list-group-item" ><h5 class="text-center display-3 mb-5">1776</h5></li>');

			//$("#load_space").append('<div class="accordion">')
			//$("#load_space .accordion").append('<div class="card">');
			//$("#load_space .accordion .card").append('<div class="card-header">');
			//$("#load_space .accordion .card .card-header").append('<div class="h5"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">1776</button></h5>');
			//$("#load_space .accordion .card").append('<div class="card-body">');
			var currentYear = new Date().getFullYear();
			for(i = 1775; i <= currentYear; i++){
				if(i%10 === 0){
					$("#load_space").append('<li class="list-group-item" id="'+i+'" ><h5 class="text-center display-3 mb-4 mt-2">'+i+'</h5></li>');
					$("#allYears > .btn-group").append('<a class="btn btn-secondary btn-sm" href="#'+i+'">'+i+'</a>');
				}
				$.each(warArray, function(k, val)
				{
					if(val[3]==i){
						//console.log(val);
						warRenderList(val);
					}
				});
				/*warArray.forEach(function(item){
					if(i>=item[3]){
						warRenderList(item);
					}
				});*/
			}
			warArray.forEach(function(item){
				if(item[6]){
					console.log("array image: "+item[6]);
					$('#war_li_'+item[0]+' img').attr('src',item[6]);
				}else{
					
					/* some kind of issue recalling the "pages" on some of these. Seem to work, but return errors too */
					
					getWikiImg(item[1], function(imgURL){
						$('#war_li_'+item[0]+' img').attr('src',imgURL);						
						console.log("wiki image: "+imgURL);
					});
				}
			});

		});

	});	
	function peaceRender(year){
		$("#load_space").append('<div class="col-sm-6 col-md-4" id="peaceCol">');
		$("#load_space #peaceCol").append('<div class="card" id="peaceCard">');
		$("#load_space #war_"+item[0]).append('<img width="220px" class="align-self-start mr-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Flag_of_the_United_States_%281877%E2%80%931890%29.svg/300px-Flag_of_the_United_States_%281877%E2%80%931890%29.svg.png">');
		$("#load_space #peaceCard").append('<h2 class="card-header">No War!</h2>');
		$("#load_space #peaceCard").append('<div class="card-body"><h5 class="card-title">'+year+'</h5>');
		$("#load_space #peaceCard .card-body").append('<p class="card-text">This is one of the few years where the US was involved in no armed conflict or war.</p>');
	}
	function peaceRenderList(year){
		
		$("#load_space").append('<li class="media" id="peaceli">');
		$("#load_space #peaceli").append('<img width="220px" class="align-self-start mr-3 d-none d-sm-block" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Flag_of_the_United_States_%281877%E2%80%931890%29.svg/300px-Flag_of_the_United_States_%281877%E2%80%931890%29.svg.png">');
		$("#load_space #peaceli").append('<div class="media-body" id="peaceMedia">');
		$("#load_space #peaceMedia").append('<h2 class="mt-0 mb-1">No War!</h2>');
		//$("#load_space #peaceMedia").append('<p class="lead">'+year+'</p>');
		$("#load_space #peaceMedia").append('<p class="card-text">This is one of the few years where the US was involved in no armed conflict or war.</p>');
	}
	function warRenderList(item){		

		$("#load_space").append('<li class="media border-bottom pb-4 mb-4" id="war_li_'+item[0]+'">');
		$("#load_space #war_li_"+item[0]).append('<img width="220px" class="align-self-start mr-3 d-none d-sm-block" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Flag_of_the_United_States_%281877%E2%80%931890%29.svg/180px-Flag_of_the_United_States_%281877%E2%80%931890%29.svg.png">');
		$("#load_space #war_li_"+item[0]).append('<div class="media-body">');
		$("#load_space #war_li_"+item[0]+' .media-body').append('<h2 class="mt-0 mb-">'+item[1]+'</h2>');
		$("#load_space #war_li_"+item[0]+' .media-body').append('<img class="mb-2 d-block d-sm-none rounded mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Flag_of_the_United_States_%281877%E2%80%931890%29.svg/180px-Flag_of_the_United_States_%281877%E2%80%931890%29.svg.png">');
		$("#load_space #war_li_"+item[0]+' .media-body').append('<p class="lead">'+item[3]+'-'+item[4]+'</p>');
		$("#load_space #war_li_"+item[0]+" .media-body").append('<p class="">'+item[2]+'</p>');
		$("#load_space #war_li_"+item[0]+" .media-body").append('<a rel="ext" class="btn btn-primary" href="'+item[5]+'">Find out more on Wikipedia</a>');
	}
	/*function warRenderCard(item){	7	
		$("#load_space").append('<div class="col-sm-6 col-md-4" id="warCol_'+item[0]+'">');
		$("#load_space #warCol_"+item[0]).append('<div class="card" id="war_card_'+item[0]+'">');
		$("#load_space #war_card_"+item[0]).append('<img height="300px" class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Flag_of_the_United_States_%281877%E2%80%931890%29.svg/100px-Flag_of_the_United_States_%281877%E2%80%931890%29.svg.png">');
		$("#load_space #war_card_"+item[0]).append('<h2 class="card-header">'+item[1]+'</h2>');
		$("#load_space #war_card_"+item[0]).append('<div class="card-body"><h5 class="card-title">'+item[3]+'-'+item[4]+'</h5>');
		$("#load_space #war_card_"+item[0]+" .card-body").append('<p class="card-text">'+item[2]+'</p>');
		$("#load_space #war_card_"+item[0]+" .card-body").append('<a rel="ext" class="btn btn-primary" href="'+item[5]+'">Find out more on Wikipedia</a>');
		//Footer $("#load_space #war_"+item[0]).append('<div class="card-footer text-center text-muted">');
		$("#load_space").append('<br />');
	}*/

	function checkYear(data){
		if(data.value<1776){$('#queryYear').val(1776)}
		var currentYear = new Date().getFullYear();
		if(data.value>currentYear){$('#queryYear').val(currentYear)}
	}