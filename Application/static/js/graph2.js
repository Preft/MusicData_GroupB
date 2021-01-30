//set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 150, left: 60},
width = 600 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

// Add SVG
var svg = d3.select("#graph2").append("svg").attr("viewBox", `0 0 600 600`).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Initialize Axis
var x = d3.scaleBand().range([ 0, width ]).padding(0.2);
var xAxis = svg.append("g").attr("transform", "translate(0," + height + ")")

var y = d3.scaleLinear().range([ height, 0]);
var yAxis = svg.append("g").attr("class", "myYaxis")

//Update Bar Chart
function updateBarChart(selectedVar) {

// Parse the Data
    d3.json("/static/json/jsonData.json", function(data) {
    var allValues = [];
    var topValues = [];
    var outp = [];
    data.forEach(function(d) {
        d.popularity = +d.popularity;
        d.energy = +d.energy;
        d.loudness = +d.loudness;
        d.name = d.name;
        allValues.push(d.popularity)
    });
    // Grab indexes of greatest pop
    for (let i = 0; i < allValues.length; i++) {
        outp.push(i);
        if (outp.length > 10) {
            outp.sort(function(a, b) { return allValues[b] - allValues[a]; });
            outp.pop();

        }
    }
    for (let j = 0; j < outp.length; j++) {
        topValues.push(data[outp[j]]);
    }
    
    // Add X Axis
    x.domain(topValues.map(function(d) { return d.name; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))
    xAxis.selectAll("g.tick").attr("text-anchor", "start");

    // Add Y axis
    y.domain([0, d3.max(topValues, function(d) { return +d[selectedVar] }) ]);
    yAxis.attr("class", "stuff").transition().duration(1000).call(d3.axisLeft(y));

    //Grab and update bars
    var bars = svg.selectAll("rect").data(topValues)
    bars.enter().append("rect").merge(bars).transition().duration(1000)
    .attr("x", function(d) { return x(d.name); })
    .attr("y", function(d) { return y(d[selectedVar]); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d[selectedVar]); })
    .attr("fill", "green")
})
}

// Initialize plot
updateBarChart("energy")
