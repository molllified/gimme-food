var current = 0;
var counter = 1;
var numToLoad= 10;
var skrollr;
var getImages= true;
var MONTHS_CONST = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DAYS_CONST = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        break;

        case 38: // up
        break;

        case 39: // right
          console.log('right');
          newImage();
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
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
  if (hour < 12) {
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
  $("#bg"+current).toggleClass("active");
	current = current + 1;
  $("#bg"+current).toggleClass("active");

  if (current % 5 == 0) {
    loadImages();
  }
  //swap out active transition stuff
}

function loadImages(number){
  $.get('http://localhost:8080/', function (response) {
    // use response here; jQuery passes it as the first parameter
    // alert(response)
    if(response === 'None') {
      getImages = false;
      return;
    }
    var list = response.split(',');
    for (i=0; i< list.length; i++){
      var newdiv = document.createElement('div');
      newdiv.setAttribute('class',"bg");
      newdiv.setAttribute('id',"bg"+counter);
      newdiv.style.backgroundImage = 'url('+list[i]+')';
      document.body.appendChild(newdiv);
      counter +=1;
    }
    // var bg = document.getElementById('bg');
    // bg.style.backgroundImage = 'url('+response+')';
  });
}

$(document).ready(function() {
	loadImages();
  startTime();
  startDate();
  var next = document.getElementById('next');
  next.onclick = newImage;
})