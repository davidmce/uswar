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