
var earth = document.getElementById("earth");
var sun = document.getElementById("sun");
var mars = document.getElementById("mars");

var objs = [earth, sun, mars];

var centerpos = [800, 400];
var centerdist = 300;

function randCircPoint(d){
	var angle = Math.random()*2*Math.PI;
	return [centerpos[0] + Math.cos(angle)*centerdist*d, centerpos[1] + Math.sin(angle)*centerdist];
}

earth.mass = 1;
[earth.pos_x, earth.pos_y] = [centerpos[0], centerpos[1]+150];
earth.dx = 1.5;
earth.dy = 0;

sun.mass = 20;
sun.pos_x = centerpos[0];
sun.pos_y = centerpos[1];
sun.dx = 0.045;
sun.dy = 0;

mars.mass = 0.8;
[mars.pos_x, mars.pos_y] = [centerpos[0], centerpos[1]-300];
mars.dx = -3;
mars.dy = 0;

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
