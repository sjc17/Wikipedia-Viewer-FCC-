$(document).ready(function() {
  $("h2").on("click",function() { 
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

  $("#search-bar").on("submit", function(e) {
    // Why does preventDefault() make it work?
    e.preventDefault();
    $.ajax({
      type: "GET",
      // Why is callback=? required?
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search=" + $("input:text").val(),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        console.log("success");
        var displayHTML = "<h1>"+data[0]+"<\/h1>";
        for (i=0; i<data[1].length; i++) {
          displayHTML += "<div class='container'><h3>" + data[1][i] + "<\/h3>";
          displayHTML += "<p>" + data[2][i] + "<\/p>";
          displayHTML += "<a href='" + data[3][i] + "' target='_blank'>" + data[3][i] + "<\/a><\/div>";
        }
        console.log(displayHTML);
        document.getElementById("display-results").innerHTML = displayHTML;
      },
      error: function(errorMessage) {
        console.log(errorMessage);
      }
    });  
  });
});
