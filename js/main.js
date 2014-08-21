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
		var newdiv = document.createElement('div');
		newdiv.setAttribute('class',"bg "+ "bg"+counter);
    newdiv.setAttribute('data-center', "background-position: 50% 0px;");
    newdiv.setAttribute('data-top-bottom', "background-position: 50% -100px;");
    newdiv.setAttribute('data-anchor-target', ".bg"+counter);
		newdiv.style.backgroundImage = 'url('+response+')';
		newdiv.innerHTML="<div class='wrapper'><div class='container'><h1>hello</h1></div></div>"
		document.body.appendChild(newdiv);
    skrollr.refresh();
    skrollr.refresh($('.bg'+counter));
    counter = counter +1;
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
    newImage();
  }
  loadImages(numToLoad);
  skrollr = skrollr.init();
  skrollr.refresh();
})