function getWorkouts () {
    $("#results").empty();
    $getJSON("/all", function(data) {
        for (const i = 0; i< data.length; i++) {
            $("#results").prepend("<p class='data-entry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
            data[i]._id + ">" + data[i].title + "</span><span class='delete'>X</span></p>");
        }
    })
}

getWorkouts();

$(document).on("click", "#newExercise", function() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/newExercise"
        data: {
            title: $("#workoutTitle").val(),
            exercise: $("#activity").val(),
            created: Date.now()
        }
    }).then(function(data) {
        $("#results").prepend("<p class='data-entry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
        data._id + ">" + data.title + "</span><span class='delete'>X</span></p>");
        // Clear the note and title inputs on the page
        $("#note").val("");
        $("#title").val("");
    })
})

$("#clear-all").on("click", function() {
    $.ajax({
        type: "DELTE",
        datatype: "json",
        url: "/clear",
        success: function() {
            $("#results")
        }
    })
})