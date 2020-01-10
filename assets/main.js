//check if at war
$.ajax( {
	url: "https://en.wikipedia.org/w/api.php",
	jsonp: "callback", 
	dataType: 'jsonp', 
	data: { 
		action: "parse", 
		page: "List of wars involving the United States", 
		// page: "Cheese", 
		format: "json" 
	},
	xhrFields: { withCredentials: true },
	success: function(response) { 
		var wiki = response; 
		var wikitext = JSON.stringify(wiki,null,'\t');
		var n = wikitext.search("-present");
		//console.log(n);
		if (n > 1){$('#result').append('YES');}else{$('#result').append('NO!!!');}
	}
});

function getWikiImg(title,callback){
	//console.log("PRE callback title: "+title);//+" source: "+wikiResponse.query.pages[pageID].thumbnail.source);

$.ajax( {
	url: "https://en.wikipedia.org/w/api.php",
	jsonp: "callback", 
	dataType: 'jsonp', 
	data: { 
		action: "query", 
		titles: title, 
		prop: "pageimages",
		format: "json",
		pithumbsize: "360"
	},
	xhrFields: { withCredentials: true },
	
	success: function(response) { 
		
		var wikiResponse = response;
		
		for (const x in response.query.pages){

			var pageID = x;

			//console.log('callback x: '+x);
			//console.log("POST callback title: "+title);//+" source: "+wikiResponse.query.pages[pageID].thumbnail.source);

		}
		//console.log(pageID);
		//console.log(wikiResponse);

		//if (wikiResponse.query.pages[pageID].thumbnail.source){
		var imgUrl = wikiResponse.query.pages[pageID].thumbnail.source;
		//console.log('callback pageID: '+pageID+' POST callback title: '+title+' imgUrl: '+imgUrl);

		callback(imgUrl);
		//}
		//console.log('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/'+imgTitle+'/240px-'+imgTitle);
		}
});


	//var imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tippecanoe.jpg/240px-Tippecanoe.jpg";
	//https://en.wikipedia.org/w/api.php?action=query&titles=Tecumseh%27s_War&prop=pageimages&format=json&pithumbsize=240
	//return imgUrl;
}
