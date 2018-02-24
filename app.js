// main document ready function to check if dom is loaded fully or not
$(document).ready(function () {
  $(".loader").hide();
  $("#maincontainer").hide();
  $(".loader2").hide();
  

  // var myFacebookToken =
  //   "EAACEdEose0cBALJ2ip1ATzHR9bTqJRxOX93Ywx7K25WEBGrCAYRkLQYsh5FbiuLfePEa0wvSHlKQxbLbzljwSQc2nAGsep2DoCEWRSUU2MroVuR8OKpewhRXGZBLMjoamxwSZBJfvPiY14I9ZBxZC2OljtZBNQZBQPLJZAzwK0nFuUM2wX1ZACNZC2l7yEzHkRBpVQRU0JHiDDgZDZD";

  var feeddata =
    '<div class="card bg-primary mt-2 fa fa-2x"><div class="card-body">Your Latest Posts</div></div>';
  //function to fetch basic info from Facebook
  function getFacebookInfo() {

    var myFacebookToken1=$("#fbtokenprofile").val();
    $.ajax(
      "https://graph.facebook.com/v2.12/me?fields=id%2Cname%2Cbirthday%2Cfeed.limit(20)%2Cemail%2Crelationship_status%2Cabout&access_token=" +
      myFacebookToken1, {
        success: function (response) {
          $("#name").text(response.name);
          $("#email").text(response.email);
          $("#bday").text(response.birthday);

          $("#proflink").html(
            '<a target="blank" href="https://facebook.com/' +
            response.id +
            '">https://facebook.com/' +
            response.id +
            "</a>"
          );

          $("#relstatus").text(response.relationship_status);
          $("#about").text(response.about);

        },
        error: function (request, errorType, errorMessage) {
          //do anything
          // console.log(request);
          // console.log(errorType);

          // alert(errorMessage);
        },

        timeout: 3000, // in ms

        beforeSend: function () {
          $(".loader").show();
        },

        complete: function () {
          $("#maincontainer").show();
          $(".loader").hide();
          $("#fbtokenprofile").hide();
        }
      } //end argument list
    ); // end ajax call
  } // end get facebook info

  //function to fetch Facebook news feed
  function getFacebookFeed() {

    var myFacebookToken2=$("#fbfeed").val();

    $.ajax(
      "https://graph.facebook.com/v2.12/me?fields=id%2Cname%2Cbirthday%2Cfeed.limit(40)%2Cemail%2Crelationship_status%2Cabout&access_token=" +
      myFacebookToken2, {
        success: function (response) {
          jQuery.each(response.feed.data, function (i, val) {
            if (val.story && val.id) {
              feeddata +=
                '<div class="card bg-white text-white mt-2"><div class="card-body"><a style="text-decoration: none;" href="https://facebook.com/' +
                val.id +
                '">' +
                val.story +
                "</a></div></div>";
            }
          });

          $("#feed").html(feeddata);
        },
        error: function (request, errorType, errorMessage) {
          // console.log(request);
          // console.log(errorType);

          // alert(errorMessage);
        },

        timeout: 3000, // in ms

        beforeSend: function () {
          $(".loader2").show();
        },

        complete: function () {
          $(".loader2").hide();
        }
      } //end argument list
    ); // end ajax call
  }

  $("#fb_btn").on("click", getFacebookInfo);//button click event for fetch Facebook basic info
  $("#fetchfeed").on("click", getFacebookFeed);//button click event for fetch Facebook news feed
});