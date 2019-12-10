
var earth = document.getElementById("earth");
var sun = document.getElementById("sun");
var mars = document.getElementById("mars");
var moon = document.getElementById("moon");

var objs = [earth, sun, mars, moon];

var centerpos = [800, 400];
var centerdist = 200;

function randCircPoint(d){
	var angle = Math.random()*2*Math.PI;
	return [centerpos[0] + Math.cos(angle)*centerdist*d, centerpos[1] + Math.sin(angle)*centerdist];
}

earth.mass = 1;
[earth.pos_x, earth.pos_y] = randCircPoint(1);
console.log(randCircPoint(1))
earth.dx = 1;
earth.dy = 1;

console.log(earth.pos_x);

sun.mass = 20;
sun.pos_x = centerpos[0];
sun.pos_y = centerpos[1];
sun.dx = 1;
sun.dy = 1;


mars.mass = 0.8;
[mars.pos_x, mars.pos_y] = randCircPoint(1.4);
mars.dx = 1;
mars.dy = 1;

moon.mass = 0.1;
[moon.pos_x, moon.pos_y] = randCircPoint(0.9);
moon.dx = 1;
moon.dy = 1;


function tick() {

	function iter_obj_0(self_obj, index) {
		function iter_obj_1(other_obj, index) {
			
			if (self_obj == other_obj) {
				return;
			}
			if (!(self_obj.pos_x == other_obj.pos_x && self_obj.pos_y == other_obj.pos_y)) {
				self_obj.dx += 0.00001 * -(other_obj.mass*(self_obj.pos_x-other_obj.pos_x))/((Math.pow(self_obj.pos_x-other_obj.pos_x, 2)+Math.pow(self_obj.pos_y-other_obj.pos_y, 2), (3/2)));
				self_obj.dy += 0.00001 * -(other_obj.mass*(self_obj.pos_y-other_obj.pos_y))/((Math.pow(self_obj.pos_x-other_obj.pos_x, 2)+Math.pow(self_obj.pos_y-other_obj.pos_y, 2), (3/2)));
			}
		}
		objs.forEach(iter_obj_1);
	}
	objs.forEach(iter_obj_0);

	function set_obj_x(item, index) {
		item.pos_x += item.dx;
		item.pos_y += item.dy;
		item.style.left = (item.pos_x).toString()+"px";
		item.style.top = (item.pos_y).toString()+"px";
	}

	objs.forEach(set_obj_x);
}

var t=setInterval(tick, 1000/60);
