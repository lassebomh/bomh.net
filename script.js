
var earth = document.getElementById("earth");
var sun = document.getElementById("sun");
var mars = document.getElementById("mars");
var moon = document.getElementById("moon");

var objs = [earth, sun, mars, moon];
objs.forEach(setupPlanets);

function setupPlanets(item, index) {
	item.mass = [1, 1, 1, 1][index]
	item.pos_x = 400+Math.random()*1000;
	item.pos_y = 100+Math.random()*700;
	item.dx = 0;
	item.dy = 0;
}

// 	obj.style.top = "400px";
// 	obj.style.left = "400px";

function tick() {

	function iter_obj_0(self_obj, index) {
		// console.log("---------");
		function iter_obj_1(other_obj, index) {
			
			if (self_obj == other_obj) {
				return;
			}
			if (!(self_obj.pos_x == other_obj.pos_x && self_obj.pos_y == other_obj.pos_y)) {
				self_obj.dx += 0.0001 * -(other_obj.mass*(self_obj.pos_x-other_obj.pos_x))/((Math.pow(self_obj.pos_x-other_obj.pos_x, 2)+Math.pow(self_obj.pos_y-other_obj.pos_y, 2), (3/2)));
				self_obj.dy += 0.0001 * -(other_obj.mass*(self_obj.pos_y-other_obj.pos_y))/((Math.pow(self_obj.pos_x-other_obj.pos_x, 2)+Math.pow(self_obj.pos_y-other_obj.pos_y, 2), (3/2)));
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
