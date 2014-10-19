var current = 0;
var counter = 1;
var numToLoad= 10;
var skrollr;
var getImages= true;

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){
      startTime()
    }, 500);
}

function checkTime(i) {
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
  var next = document.getElementById('next');
  next.onclick = newImage;
})