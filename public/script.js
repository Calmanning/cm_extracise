function getWorkouts() {
    $("#results").empty();
    $getJSON("/all", function (data) {
        for (const i = 0; i < data.length; i++) {
            $("#results").prepend("<p class='data-entry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
                data[i]._id + ">" + data[i].title + "</span><span class='delete'>X</span></p>");
        }
    })
}

getWorkouts();

$(document).on("click", "#newExercise", function () {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/newExercise",
        data: {
            title: $("#workoutTitle").val(),
            exercise: $("#activity").val(),
            created: Date.now()
        }
    }).then(function (data) {
        $("#results").prepend("<p class='data-entry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
            data._id + ">" + data.title + "</span><span class='delete'>X</span></p>");
        // Clear the activity and title inputs on the page
        $("#activity").val("");
        $("#title").val("");
    })
})

$("#clear-all").on("click", function () {
    $.ajax({
        type: "DELTE",
        dataType: "json",
        url: "/clear",
        success: function () {
            $("#results").empty()
        }
    })
})

$(document).on("click", ".delete", function () {
    const exerciseId = $(this).parent();

    $.ajax({
        type: "DELETE",
        url: "/delete/" + exerciseId.attr("data-id"),
        success: function (response) {
            exerciseId.remove()
            $("#activity").val("");
            $("#workoutTitle").val("");
            $("#action-button").html("<buttton id='newExercise'> Submit </button>")
        }
    })

})

$(document).on("click", ".dataTitle", function () {
    const updatingWorkout = $(this);

    $.ajax({
        type: "GET",
        url: "/find/" + updatingWorkout.attr("data-id"),
        success: function (data) {
            $("#activity").val(data.activity);
            $("#workoutTitle").val(data.activity);
            $("#action-button").html("<buttton id='update' data-id='" + data._id + "'> Update</button>")
        }
    })
})

$(document).on("click", "#update", function () {
    const updatingId = $(this);

    $.ajax({
        type: "GET",
        url: "/update/",
        dataType: "json",
        data: {
            title: $("#workoutTitle").val(),
            activity: $("#activity").val()
        },
        success: function (data) {
            $("#activity").val("")
            $("#workoutTitle").val("")
            $("#action-button").html("<button id='newExercise'> Submit</button>")
            getWorkouts();
        }
    })
})