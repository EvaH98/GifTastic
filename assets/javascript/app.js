//Initial Array of moods

var moods = ["Happy", "Sad", "Angry", "Hungry"]

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

//This adds more moods to the array
$("#add-mood").on("click", function(event) {
  event.preventDefault();

  // Get the input from the textbox
  var mood = $("#mood-input").val().trim();

  // The mood from the textbox is then added to our moods array
  moods.push(mood);
  $("#mood-input").val("");

  // Redraw the mood buttons
  renderButtons();
});

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

		$("#mood-view").empty();

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


      	$("#mood-view").append(moodDiv);
   
	}
});
}

//This function will animate a still Gif or stop a moving Gif
function animateGif () {

	var state = $(this).find("img").attr("data-state");

  	// Make the Gif either animated or still depending on the "data-state" value
  	if (state === "still") {
    	$(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    	$(this).find("img").attr("data-state", "animate");
  	} else {
    	$(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    	$(this).find("img").attr("data-state", "still");
  }
}


$(document).ready(function() {
  renderButtons();
});

$(document).on("click", ".mood-btn", displayMoodGifs);
$(document).on("click", ".moodGif", animateGif);





