# FastWidget.js
a mini fast UI framework of browser 

##example
```
<div id="panel_stat"></div>
<script src="./fastwidget.js"></script>
<script>

var keys = ["language", "rank", "star", "operate"];
var vals = [
   ["C", 1, "*****"],
   ["lua", 1, "*****"],
   ["C++", 1, "****"],
   ["js", 1, "****"],
   ["golang", 1, "****"]
];

var Widget = FastWidget;
var table = Widget("table", {class:"table", border:"1"});
table.new("caption", "The Languages");
var tr = table.new("thead").new("tr");
tr.batch("th", keys);
var tbody = table.new("tbody");
for (var i = 0; i < vals.length; i++) {
	var val = vals[i];
	var tr = tbody.new("tr");
	tr.batch("td", val);
	tr.new("td", "<a href=''>Button</a>");
}

//display at dom "panel_stat"
table.show('panel_stat');

</script>
```
result:
```
<table class="table" border="1">
	<caption>The Languages</caption>
	<thead>
		<tr><th>language</th><th>rank</th><th>star</th><th>operate</th></tr>
	</thead>
	<tbody>
		<tr><td>C</td><td>1</td><td>*****</td><td><a href="">Button</a></td></tr>
		<tr><td>lua</td><td>1</td><td>*****</td><td><a href="">Button</a></td></tr>
		<tr><td>C++</td><td>1</td><td>****</td><td><a href="">Button</a></td></tr>
		<tr><td>js</td><td>1</td><td>****</td><td><a href="">Button</a></td></tr>
		<tr><td>golang</td><td>1</td><td>****</td><td><a href="">Button</a></td></tr>
	</tbody>
</table>
``