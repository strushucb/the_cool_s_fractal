var max_width = 800;
var ks_width = ks_height = $(window).width();
if( ks_width > max_width ){
	ks_width = ks_height = max_width;
}

var ks_svg = d3.select("#coolsfractal-vis")
	.append("svg")
	.attr("width", ks_width)
	.attr("height", ks_height);

var ks_data = [];

function reload(){
ks_data = 
[
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
 { x: ks_width*.625, y: ks_height*.5 },
 { x: ks_width*.5, y: ks_height*.6 }, 
 { x: ks_width*.5, y: ks_height*.8 }, 
 { x: ks_width*.5, y: ks_height*.6 },
 { x: ks_width*.625, y: ks_height*.5 },
 { x: ks_width*.75 , y: ks_height*.6 },
 { x: ks_width*.75 , y: ks_height*.8 },
 { x: ks_width*.5, y: ks_height }
];
}

reload();

var ks_newData = coolsSubdivide(0);
coolsDraw(ks_newData);

/* DRAW FUNCTION */
function coolsDraw(data) {
	d3.select("#coolsfractal-vis").selectAll("path").remove();

	var x = d3.scale.linear().domain([0, 800]).range([100, 700]);	
	var y = d3.scale.linear().domain([0, 800]).range([600, 50]);

	var line = d3.svg.line()
		.x(function(d, i) { return x(d.x); })
		.y(function(d, i) { return y(d.y); })
		.interpolate("linear");

	var path = ks_svg.append("path")
		.attr("d", line(data) )
		.attr("stroke", "#000000")
		.attr("stroke-width", 2)
		.attr("fill", "#ffffffff");
}


function rotate(cx, cy, x, y, radians) {
//   console.log("rotate: cx: "+cx+", cy: "+cy+", x: "+x+", y: "+y+", radians: "+radians);
  // nx = 0;
  // ny = 0;
   //if(radians == 0){
  //   nx = Math.round(x);
  //   ny = Math.round(y);
  // } else {
     cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = Math.round((cos * (x - cx)) + (sin * (y - cy)) + cx),
      ny = Math.round((cos * (y - cy)) - (sin * (x - cx)) + cy);
  // }
 //  console.log("new x: "+nx+", new y: "+ny);
   return {x:nx,y:ny};
}

/* SUBDIVIDE FUNCTION */
function coolsSubdivide(numTimes) {
	var pts = ks_data;
	var newpts = []
	for (j = 0; j < numTimes; j++) {
		for (i = pts.length-1; i > 0; i--) {
			var rads = Math.atan2(pts[i-1].x - pts[i].x, pts[i-1].y - pts[i].y);
			var centerx = (pts[i].x + pts[i-1].x) / 2;
			var centery = (pts[i].y + pts[i-1].y) / 2;
			
			var dx = pts[i].x - pts[i-1].x;
			var dy = pts[i].y - pts[i-1].y;
			var w = Math.sqrt( dx*dx + dy*dy );
			var h = -w;
			console.log("Make a New S with radians: "+rads+", width: "+w+", height:"+h+", centerx: "+centerx+", centery: "+centery);

//Top of S
			 var p2 = rotate(centerx, centery, centerx, centery-(h/2), rads); 
			 var p3 = rotate(centerx, centery, centerx-.25*w, centery-(h/2)+.2*h, rads); 
			 var p4 = rotate(centerx, centery, centerx-.25*w, centery-(h/2)+.4*h, rads); 
			 var p5 = rotate(centerx, centery, centerx-.125*w, centery, rads); 
			 var p6 = rotate(centerx, centery, centerx, centery-(h/2)+.6*h, rads); 
			 var p7 = rotate(centerx, centery, centerx, centery-(h/2)+.8*h, rads);
			 var p8 = rotate(centerx, centery, centerx, centery-(h/2)+.6*h, rads);
			 var p9 = rotate(centerx, centery, centerx-.125*w, centery, rads);

			 var p10 = rotate(centerx, centery, centerx-.25*w, centery-(h/2)+.6*h, rads);
			 var p11 = rotate(centerx, centery, centerx-.25*w, centery-(h/2)+.8*h, rads);
//Bottom of S
			 var p12 = rotate(centerx, centery, centerx, centery+(h/2), rads);
			 var p13 = rotate(centerx, centery, centerx+.25*w, centery-(h/2)+.8*h, rads); 
			 var p14 = rotate(centerx, centery, centerx+.25*w, centery-(h/2)+.6*h, rads); 
			 var p15 = rotate(centerx, centery, centerx+.125*w, centery, rads);    
			 var p16 = rotate(centerx, centery, centerx, centery-(h/2)+.4*h, rads);  
			 var p17 = rotate(centerx, centery, centerx, centery-(h/2)+.2*h, rads);
			 var p18 = rotate(centerx, centery, centerx, centery-(h/2)+.4*h, rads); 
			 var p19 = rotate(centerx, centery, centerx+.125*w, centery, rads);   
			 var p20 = rotate(centerx, centery, centerx+.25*w, centery-(h/2)+.4*h, rads); 
			 var p21 = rotate(centerx, centery, centerx+.25*w, centery-(h/2)+.2*h, rads); 
			 var p22 = rotate(centerx, centery, centerx, centery-(h/2), rads);

			 var p23 = rotate(centerx, centery, centerx-.25*w, centery-(h/2)+.2*h, rads); 
			 var p24 = rotate(centerx, centery, centerx-.25*w, centery-(h/2)+.4*h, rads); 
			 var p25 = rotate(centerx, centery, centerx-.125*w, centery, rads); 
			 var p26 = rotate(centerx, centery, centerx-.25*w, centery-(h/2)+.6*h, rads);
			 var p27 = rotate(centerx, centery, centerx-.25*w, centery-(h/2)+.8*h, rads);
//Bottom of S
			 var p28 = rotate(centerx, centery, centerx, centery+(h/2), rads);
	
			newpts.push(p28, p27, p26, p25, p24, p23, p22, p21, p20, p19, p18, p17, p16, p15, p14, p13, p12, p11, p10, p9, p8, p7, p6,p5,p4,p3,p2);
			
		}
		pts = newpts;
	}
	if (newpts.length == 0) return pts;
	
	return newpts;
	
}

/* SLIDER */
var ks_check = 0;
$("#coolsfractal-slider").on("change mousemove", function() {

	var ks_value = $(this).val();
	$('#coolsfractal-output').html(ks_value);
	
	if (ks_value != ks_check) {
		ks_check = ks_value;
		reload();

		ks_newData = coolsSubdivide(ks_value);
		coolsDraw(ks_newData);
	}

});

