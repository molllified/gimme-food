var current = 0;
var counter = 0;
var numToLoad= 10;
var skrollr;
var getImages= true;
var MONTHS_CONST = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DAYS_CONST = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var last_request = new Date().getTime() / 1000;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    document.getElementById("demo").innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
}

function getWeather() {
  $.ajax({
    url : "http://api.wunderground.com/api/5aa85d5ee29b832c/geolookup/conditions/q/IA/Cedar_Rapids.json",
    dataType : "jsonp",
    success : function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_f = parsed_json['current_observation']['temp_f'];
      alert("Current temperature in " + location + " is: " + temp_f);
    }
  });
}

$(document).keydown(function(e) {
    if (e.which == 39) {
      newImage();
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

function startDate() {
  var today = new Date();
  var date = today.getDate();
  var month = MONTHS_CONST[today.getMonth()];
  var day = DAYS_CONST[today.getDay()];

  document.getElementById('datetime').innerHTML = day+', '+month+ ' '+date;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  h = handleHour(h)
  m = addZero(m);
  s = addZero(s);
  document.getElementById('clock').innerHTML = h+":"+m+":"+s;

  var t = setTimeout(function(){
    startTime()
  }, 500);
}

function handleHour(hour) {
  if (hour <= 12) {
    if (hour == 0) {
      return 12;
    }
    return hour;
  }
  else {
    return hour - 12;
  }
}

function addZero(i) {
    if (i<10) {
      i = "0" + i
    };  
    return i;
}

function newImage() {
  var currentTime= new Date().getTime() / 1000;

  if (currentTime - last_request > 1) { 
    $("#bg"+current).toggleClass("active");
  	current = current + 1;
    $("#bg"+current).toggleClass("active");

    document.getElementById('food_title').innerText = document.getElementById('bg'+current).firstChild.innerText;
    if (current % 5 == 0) {
      loadImages();
    }
  }
  last_request = currentTime;
}

function loadImages(number){
  $('.background').load('http://localhost:8080/', function(response) {
    if(response === 'None') {
      getImages = false;
      return;
    }
    var list = response.split(',');
    for (i=0; i< list.length; i++){
      var current = list[i];
      var separator = current.indexOf(' ');
      var image_link = current.substring(0, separator);
      var title = current.substring(separator+1);

      if (image_link === '') {
        continue;
      }
      var newdiv = document.createElement('div');

      if (counter == 0) {
        newdiv.setAttribute('class',"bg active hidden");
        document.getElementById('food_title').innerText = title;
      }
      else {
        newdiv.setAttribute('class',"bg");
        newdiv.innerHTML = '<p class=\"hidden\" id=\"title\">'+title+'</p>';
      }
      newdiv.setAttribute('id',"bg"+counter);
      newdiv.style.backgroundImage = 'url('+image_link+')';
      document.body.appendChild(newdiv);

      if (counter ==0){
        setTimeout(function(){
          $('.vignette').fadeIn(200);
          $('.vignette').removeClass('hidden');
          $('#bg0').fadeIn(500);
          $('#bg0').removeClass('hidden');
        }, 150);
      }
      counter +=1;
    }
  });
}

$(document).ready(function() {
	loadImages();
  startTime();
  startDate();
  // getLocation();
  var next = document.getElementById('next');
  next.onclick = newImage;
})