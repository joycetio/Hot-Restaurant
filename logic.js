var type = "mr+nobody";
    var queryURL = "http://www.omdbapi.com/?t=" + type + "&y=&plot=short&r=json";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Getting the first row of the table
      var firstRowTds = $("table")
        .children()
        .eq(1)
        .children("tr")
        .eq(0)
        .children("td");

      // Setting the inner text of each td in the first row
      firstRowTds.eq(0).text(response.Title);

      firstRowTds.eq(1).text(response.Year);

      firstRowTds.eq(2).text(response.Actors);
    });