var current = 8;
var counter = 0;
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
	$.get('http://localhost:8080/', function (response) {
	  // use response here; jQuery passes it as the first parameter
		// alert(response)
    if(response === 'None') {
      getImages = false;
      return;
    }
    var bg = document.getElementById('bg');
    bg.style.backgroundImage = 'url('+response+')';
	});
}

function loadImages(number){
  for (i=0; i <number; i++) {
    if (getImages) {
      newImage();
    }
  }
  current= current + numToLoad;
}

$(document).scroll(function(){
    if($(this).scrollTop()>=$(".bg"+current).position().top && getImages){
        loadImages(numToLoad);
    }
})

$(document).ready(function() {
	for (i=0; i <numToLoad; i++) {
    // newImage();
  }
  // loadImages(numToLoad);
  // skrollr = skrollr.init();
  // skrollr.refresh();
  startTime();
  var next = document.getElementById('next');
  next.onclick = newImage;
})