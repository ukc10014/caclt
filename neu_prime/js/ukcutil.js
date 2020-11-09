/*Utility js*/

/*Function to generate date time string, where e is the HTML target*/
var updt = function (e) {
	var formt = d3.utcFormat("%Y-%m-%dT%H:%M:%S.%LZ")
	document.getElementById(e).innerHTML = formt((new Date));
}


