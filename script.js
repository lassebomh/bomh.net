
var pf_div = document.getElementById("profile-div");
var arrow_img = document.getElementById("writings");

window.onresize = function(event) {
	// if (window.innerWidth < 1250) {

	// }
	// else
	if (window.innerWidth < 1250 || window.innerWidth/window.innerHeight > 1) {
		pf_div.style.marginLeft = (window.innerWidth/2 - 600/2).toString()+"px";
		arrow_img.style.visibility = 'hidden';
	}
	else {
		pf_div.style.marginLeft = (window.innerWidth/2 - 1080/2).toString()+"px";
		arrow_img.style.visibility = 'visible';
	}
};

window.onresize();