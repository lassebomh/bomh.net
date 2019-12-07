

var b = document.getElementById("ball0");

var bx = 400;
var by = 400;

var vbx = 0;
var vby = 0;

var gx = 400;
var gy = 800;

function runFunction() {
	vby += 1;
	vbx += 0;
	//vbx += 0.2;
	//vby += 0.01;
	bx += vby;
	by += vbx;
	console.log(vbx, vby);
	b.style.left = bx.toString()+"px";
	b.style.top = by.toString()+"px";
}

var t=setInterval(runFunction,1000/60);


