

var b = document.getElementById("ball0");

var bx = 400;
var by = 400;

var vbx = 0;
var vby = 2;

var gx = 500;
var gy = 500;

function runFunction() {
	vby += (gy-by)/10000;
	vbx += (gx-bx)/10000;
	bx += vbx;
	by += vby;
	console.log(by-gy, by-gy);
	b.style.left = bx.toString()+"px";
	b.style.top = by.toString()+"px";
}

var t=setInterval(runFunction,1000/60);


