//super super fun time wee yay.js
console.log("peepeepoopoo");
var mooseclick=false;
var wooseclick=false;
var aooseclick=false;
var cooseclick=true;
var booseclick=false;
// $(document).ready(function() {


$( "#booton" ).on( "click", function( ) {
    console.log("peepeepoopoo");
    if(wooseclick){
        compareBtnClick();
        $( "#forecast" ).removeClass( "d-none",60 );
    }
    if(booseclick){
        yelp();
        $("#yelp").removeClass("d-none",60);
    }
    // clickMe();
    // printo();
     if(!mooseclick){
     mooseclick=true;
     $( "#home" ).addClass( "d-none",60 );
    // $( "#resun" ).removeClass( "d-none",60 );
     }

  });
// });

$( "#home-tab" ).on( "click", function( ) {
    console.log("home_unlock");
    resetclick();
    mooseclick=false;
    $("#home").removeClass("d-none",60);
    console.log(mooseclick);

});

$( "#weather-tab" ).on( "click", function( ) {
    console.log("weather_unlock");
    resetclick();
    
    wooseclick=true;
    $("#weather-tab").addClass("font-weight-heavy",30)
    console.log(wooseclick);

});
  
$( "#cinfo-tab" ).on( "click", function( ) {
    console.log("cinfo_unlock");
    resetclick();
    cooseclick=true;
    console.log(cooseclick);


  });

$( "#bus-tab" ).on( "click", function( ) {
    console.log("bus_unlock");
    resetclick();
    booseclick=true;
    console.log(booseclick);

    

  });

$( "#avoid-tab" ).on( "click", function( ) {
    console.log("avoid_unlock");
    resetclick();
    aooseclick=true;
    console.log(aooseclick);

    

  });

function resetclick(){

    if(wooseclick){
        console.log("weather_close");
        wooseclick=false;
        $("#forecast").addClass("d-none",60);
    }
    if(cooseclick){
        console.log("cinfo_close");   
        cooseclick=false;
    }
    if(booseclick){
        console.log("bus_close");
        booseclick=false;
        $("#yelp").addClass("d-none",60);
    }
    mooseclick=false;
    aooseclick=false;
}


function printo(){
    var yay='Thank you!', nay='Please enter the three required integers in order to achieve a desired result.';
    console.log(mooseclick);
    if (mooseclick)
    {
        document.getElementById("err").innerHTML = nay;
        return;
    }
    document.getElementById("err").innerHTML = yay;

}

function clickMe() {
    //if output gives errors, it's probably receiving it as a string and not an integer. 
    //In which case, wrap it with parseInt() to cast to int
    var one = getVal("one");
    var two = getVal("two");
    var three = getVal("three");
  
    var arr = [one, two, three];
    console.log(typeof arr[0]);
    var max = Math.max.apply(Math, arr); 
    console.log(max);
    var min = Math.min.apply(Math, arr);
    var ran = max-min;
    var mean = (one+two+three)/3;
    var med=median(arr);

    sendResult(min, max, med, ran, mean);
  }

  function getVal(elem) {
    var val = parseInt(document.getElementById(elem).value);
    if(isNaN(val))
        {
            mooseclick=true;
        }
    if(!isNaN(val))
    {
        mooseclick=false;
    }
        console.log(val);
    return val;
  }

  function sendResult(min, max, med, ran, mean) {
    document.getElementById("max").innerHTML = max;
    document.getElementById("min").innerHTML = min;
    document.getElementById("med").innerHTML = med;
    document.getElementById("ran").innerHTML = ran;
    document.getElementById("mean").innerHTML = mean;

  }


  $(function() {

    $("#city1").on("input", cityInput);
 });
 
 // Called when city input values change
 function cityInput(e) {
    // Extract the text from city input that triggered the callback
    const cityId = e.target.id;
    const city = $(`#${cityId}`).val().trim();
    
    // Only show error message if no city 
    if (city.length === 0) {
       showElement("error-value-" + cityId);      
    }
    else {
       hideElement("error-value-" + cityId);
    }
 }


  function yelp(){
    console.log("yelpcall");
    const city1 = $("#city1").val().trim();
    var CITY = city1;
    var myurl = "http://52.91.156.204:8080/https://api.yelp.com/v3/businesses/search?location=" + CITY;
    $.ajax({
       url: myurl,
       headers: {
        'Authorization':'Bearer eTFFe41PY3fW6sZUph2s6jYZyYqA6Yi2_5d88yYAUPSCts6Y8wEISL4FpaBjWU9ZALdvF53L07MKXEikvor2pzDtNbgwVl4MKVRQhDm5lj9tV2AD6p-mdvMH--SqX3Yx',
    },
       method: 'GET',
       dataType: 'json',
       success: function(data){
           // Grab the results from the API JSON return
           var totalresults = data.total;
           // If our results are greater than 0, continue
           if (totalresults > 0){
               // Display a header on the page with the number of results
               $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
               // Itirate through the JSON array of 'businesses' which was returned by the API
               $.each(data.businesses, function(i, item) {
                   // Store each business's object in a variable
                   var id = item.id;
                   var alias = item.alias;
                   var phone = item.display_phone;
                   var image = item.image_url;
                   var name = item.name;
                   var rating = item.rating;
                   var reviewcount = item.review_count;
                   var address = item.location.address1;
                   var city = item.location.city;
                   var state = item.location.state;
                   var zipcode = item.location.zip_code;
                   // Append our result into our page
                   $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');
             });
           } else {
               // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
               $('#results').append('<h5>We discovered no results!</h5>');
           }
       }
    });      

  }

  



