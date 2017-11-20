$("#speed-control").on('change', function(){
	var val = $(this).val();
	val = Math.sqrt(val)
	val /= 200;
	dt = val;

})
$("#time-function-control").on('change', function(){
	var val = $(this).val();
	timeFunction = val;

})
$(document).on('mousedown', function(e){
	var tag = e.target.tagName.toLowerCase();
	if(tag != "canvas"){
		controls.enabled = false;
	}
})
$(document).on("mouseup", function(e){
	controls.enabled = true;
})

function updatePointsUI(){
	$("#points-wrapper").html("");

	var str = "";

	if(selected.length > 0){
		var tmpStr = "";
		tmpStr += "<h4 style='text-align:center'>Points</h4>";
		tmpStr += "<div target = 'all' class='color-row'>"
		tmpStr += "ALL: "
		tmpStr += "r:"
		tmpStr += "<input color='r' class='color-input'>"
		tmpStr += "g:"
		tmpStr += "<input color='g' class='color-input'>"
		tmpStr += "b:"
		tmpStr += "<input color='b' class='color-input'>"
		tmpStr += "</div>";
		str += tmpStr;
	}
	for(var i = 0; i < selected.length; i++){
		var tmpStr = "";
		tmpStr += "<div target = '"+i+"' class='color-row'>"
		tmpStr += i+": "
		tmpStr += "r:"
		tmpStr += "<input color='r' class='color-input individual r' value = '" + selected[i].target.r + "'>"
		tmpStr += "g:"
		tmpStr += "<input color='g' class='color-input individual g' value = '" + selected[i].target.g + "'>"
		tmpStr += "b:"
		tmpStr += "<input color='b' class='color-input individual b' value = '" + selected[i].target.b + "'>"
		tmpStr += "</div>";
		str += tmpStr;
	}

	$("#points-wrapper").html(str);

	$(".color-input").on("change", function(){
		$(this).blur();
		var target = $(this).closest(".color-row").attr('target');
		var val = $(this).val();
		var color = $(this).attr("color");
		if(target == "all"){
			
			if(color == "r"){
				console.log("changing all colors");
				$(".color-input.individual.r").val(val);
				$(".color-input.individual.r").trigger("change");
			}
			if(color == "g"){
				console.log("changing all colors");
				$(".color-input.individual.g").val(val);
				$(".color-input.individual.g").trigger("change");
			}
			if(color == "b"){
				console.log("changing all colors");
				$(".color-input.individual.b").val(val);
				$(".color-input.individual.b").trigger("change");
			}
			return;

		}

		target = parseInt(target);
		if(color == "r"){
			selected[target].target.r = val;
		}
		if(color == "g"){
			selected[target].target.g = val;
		}
		if(color == "b"){
			selected[target].target.b = val;
		}
		computeSurface();

	})

}
