var max_width = 800;
var ks_width = ks_height = $(window).width();
if( ks_width > max_width ){
	ks_width = ks_height = max_width;
}

var kstri_svg = d3.select("#coolstri-vis")
	.append("svg")
	.attr("width", ks_width)
	.attr("height", ks_height);

var kstri_data = [];

function reloadtri(){
kstri_data = 
[
 { x: ks_width*.625, y: ks_height*.5 },
 { x: ks_width*.5, y: ks_height*.6 }, 
 { x: ks_width*.5, y: ks_height*.8 }, 
 { x: ks_width*.5, y: ks_height*.6 },
 { x: ks_width*.625, y: ks_height*.5 },
 { x: ks_width*.75 , y: ks_height*.6 },
 { x: ks_width*.75 , y: ks_height*.8 },
 { x: ks_width*.5, y: ks_height }, 
 { x: ks_width*.25, y: ks_height*.8 },
 { x: ks_width*.25, y: ks_height*.6 },
 { x: ks_width*.375, y: ks_height*.5 },
 { x: ks_width*.5, y: ks_height*.4 },
 { x: ks_width*.5, y: ks_height*.2 },
 { x: ks_width*.5, y: ks_height*.4 },
 { x: ks_width*.375, y: ks_height*.5 },  
 { x: ks_width*.25, y: ks_height*.4 },
 { x: ks_width*.25, y: ks_height*.2 },   
 { x: ks_width*.5, y: 0 },  
 { x: ks_width*.75, y: ks_height*.2 },  
 { x: ks_width*.75, y: ks_height*.4 },
 { x: ks_width*.625, y: ks_height*.5 }
];
}

reloadtri();

var kstri_newData = coolstriSubdivide(0);
coolstriDraw(kstri_newData);

/* DRAW FUNCTION */
function coolstriDraw(data) {
	d3.select("#coolstri-vis").selectAll("path").remove();

	var x = d3.scale.linear().domain([0, 800]).range([100, 700]);	
	var y = d3.scale.linear().domain([0, 800]).range([600, 50]);

	var line = d3.svg.line()
		.x(function(d, i) { return x(d.x); })
		.y(function(d, i) { return y(d.y); })
		.interpolate("linear");

	var path = kstri_svg.append("path")
		.attr("d", line(data) )
		.attr("stroke", "#000000")
		.attr("stroke-width", 2)
		.attr("fill", "#ffffff");
}

/* SUBDIVIDE FUNCTION */
function coolstriSubdivide(numTimes) {
	var pts = kstri_data;
	
	for (j = 0; j < numTimes; j++) {
		for (i = pts.length-1; i > 0; i--) { 
			var d = Math.sqrt( (pts[i].x - pts[i-1].x) * (pts[i].x - pts[i-1].x) + (pts[i].y - pts[i-1].y) * (pts[i].y - pts[i-1].y) );

			var p2 = { x: (2 * pts[i-1].x + pts[i].x) / 3, y: (2 * pts[i-1].y + pts[i].y) / 3 };	
			var p4 = { x: (pts[i-1].x + 2 * pts[i].x) / 3, y: (pts[i-1].y + 2 * pts[i].y) / 3 };	
			var p3x = p2.x + p4.x * Math.cos(60 * Math.PI / 180) - p4.y * Math.sin(60 * Math.PI / 180) - p2.x * Math.cos(60 * Math.PI / 180) + p2.y * Math.sin(60 * Math.PI / 180);
			var p3y = p2.y + p4.x * Math.sin(60 * Math.PI / 180) + p4.y * Math.cos(60 * Math.PI / 180) - p2.x * Math.sin(60 * Math.PI / 180) - p2.y * Math.cos(60 * Math.PI / 180);
			var p3 = { x: p3x, y: p3y };
	
			pts.splice(i, 0, p2, p3, p4);
		}
	}
	
	return pts;
	
}

/* SLIDER */
var kstri_check = 0;
$("#coolstri-slider").on("change mousemove", function() {

	var ks_value = $(this).val();
	$('#coolstri-output').html(ks_value);
	
	if (ks_value != kstri_check) {
		kstri_check = ks_value;
		reloadtri();

		kstri_newData = coolstriSubdivide(ks_value);
		coolstriDraw(kstri_newData);
	}

});

