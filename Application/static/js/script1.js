var svgWidth = 900;
var svgHeight = 900;

var margin = {
  top: 20,
  right: 40,
  bottom: 120,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("viewBox", `0 0 900 900`)

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "danceability";

// function used for updating x-scale var upon click on axis label
function xScale(hairData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(hairData, d => d[chosenXAxis]) * 0.8,
      d3.max(hairData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "danceability") {
    label = "Danceability";
  }
  else if (chosenXAxis === "energy") {
    label = "Energy";
  } else {
    label = "Speechiness";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`Tempo: ${d.tempo}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.json("/static/json/jsonData.json").then(function(hairData, err) {

  // parse data
  hairData.forEach(function(data) {
    data.danceability = +data.danceability;
    data.tempo = +data.tempo;
    //energy
    data.speechiness = +data.speechiness;
    data.energy = +data.energy;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(hairData, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(hairData, d => d.tempo)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(hairData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.tempo))
    .attr("r", 8)
    .attr("fill", "green")
    .attr("opacity", ".5");

  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var danceabilityLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "danceability") // value to grab for event listener
    .classed("active", true)
    .text("Danceability");

  var speechinessLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "speechiness") // value to grab for event listener
    .classed("inactive", true)
    .text("Speechiness");

  var energyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "energy") // value to grab for event listener
    .classed("inactive", true)
    .text("Energy");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Tempo");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(hairData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "speechiness") {
          speechinessLabel
            .classed("active", true)
            .classed("inactive", false);
          danceabilityLabel
            .classed("active", false)
            .classed("inactive", true);
          energyLabel
            .classed("active", false)
            .classed("inactive", true);
        } else if (chosenXAxis === "danceability"){
          speechinessLabel
            .classed("active", false)
            .classed("inactive", true);
          danceabilityLabel
            .classed("active", true)
            .classed("inactive", false);
          energyLabel
            .classed("active", false)
            .classed("inactive", true);
        } else if (chosenXAxis === "energy") {
          speechinessLabel
            .classed("active", false)
            .classed("inactive", true);
          danceabilityLabel
            .classed("active", false)
            .classed("inactive", true);
          energyLabel
            .classed("active", true)
            .classed("inactive", false);
        } else {

        }
      }
    });
}).catch(function(error) {
  console.log(error);
});
