

var b = document.getElementById("ball0");

var bx = 0;
var by = 0;

function runFunction() {
	bx += 1;
	by += 1;
	b.style.left = bx.toString()+"px";
	b.style.top = by.toString()+"px";
}

var t=setInterval(runFunction,1000/60);


