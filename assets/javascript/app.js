//Initial Array of moods

var moods = ["Happy", "Sad", "Angry", "Hungry"]

//This function will re-render the HTML to display the appropriate content
function displayMoodGifs() {

	var mood = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&rating=pg-13&limit=20&api_key=nRm8yx7PNmCAqAcIMSRMnye9fP48tV4y";

	//ajax call 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {

		var dataArray = response.data;

		for (var i = 0; i < dataArray.length; i++){

		//tried showDiv and #gif-area with same results. 
		var moodDiv = $("<div>");

		moodDiv.addClass("moodGif");

		var pRating = $("<p>").html("Rating: " + dataArray[i].rating);

		moodDiv.append(pRating);

		var newImg = $("<img>");

		newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      	newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      	newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      	newImg.attr("data-state", "still");
      	moodDiv.append(newImg);

        //
        $("#mood-view").prepend(newImg);


//$("#gif-area").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url +'">');

    
	}
});
}

function animateMood () {
	
}

	

//This function will display gif data
function renderButtons() {

	//prevent repeated buttons
	$("#buttons-view").empty();

	//loop through the array of moods
	for (var i = 0; i < moods.length; i++) {
		var a = $("<button>");
		a.addClass("mood-btn");
		a.attr("data-name", moods[i]);
		a.text(moods[i]);
		$("#buttons-view").append(a);
	}
} 

//This function will handle events when a button is called
$("#add-mood").on("click", function(event) {
	event.preventDefault();

	var mood = $("#mood-input").val().trim();
	moods.push(mood);
	renderButtons();
});

$(document).on("click", ".mood-btn", displayMoodGifs);
renderButtons();

