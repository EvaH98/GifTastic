//Initial Array of moods

var moods = ["Happy", "Sad", "Angry", "Hungry"]

//This function will re-render the HTML to display the appropriate content
function displayMoodGifs() {

	var mood = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nRm8yx7PNmCAqAcIMSRMnye9fP48tV4y" + mood + "&limit=10&offset=0&lang=en";

	//ajax call 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(respnse) {

		//Records the gif in the console
		console.log(queryURL);
		console.log(respnse);

	});
}

//This function will display gif data
function renderButtons() {

	//prevent repeated buttons
	$("#buttons-view").empty();

	//loop through the array of moods
	for (var i = 0; i < moods.length; i++) {
		var a = $("<button>");
		a.attr("data-name", moods[i]);
		a.text(moods[i]);
		$("#buttons-view").append(a);
	}
} 

//This function will handle events when a button is called

