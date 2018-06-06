// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var name = $("[name=name]").val().trim();

        if(name !== "") {
            var newRestaurant = {
                name: name
            };

            // Send the POST request.
            $.ajax("/api/restaurant", {
                type: "POST",
                data: newRestaurant
            }).then(function() {
                // console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            });
        }
        else {
            $("[name=name]").val("");
        }
    });
});
