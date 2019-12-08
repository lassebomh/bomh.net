

var b = document.getElementById("ball0");

var bx = 800;
var by = 500;

var vbx = 7;
var vby = 0;

var gx = 800;
var gy = 400;

// -(4*gmass*(bx-gx))/((Math.pow((bx-gx), 2)+Math.pow((by-gy)**2), (3/2)))

function runFunction() {
	if (gx != bx && gy != by) {
		vbx += 1000 * -(4*(bx-gx))/(Math.pow(Math.pow(bx-gx, 2)+Math.pow(by-gy, 2), (3/2)))
		vby += 1000 * -(4*(by-gy))/(Math.pow(Math.pow(bx-gx, 2)+Math.pow(by-gy, 2), (3/2)))
	}
	bx += vbx;
	by += vby;
	console.log(by-gy, by-gy);
	b.style.left = bx.toString()+"px";
	b.style.top = by.toString()+"px";
}

var t=setInterval(runFunction,1000/60);


