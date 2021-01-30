var speechiness = []
var tempo = []

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#graph3")
      .append("svg").attr("viewBox", `0 0 600 600`).append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // Initialize the X axis
    var x = d3.scaleBand()
      .range([ 0, width ])
      .padding(0.2);
    var xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
    
    // Initialize the Y axis
    var y = d3.scaleLinear()
      .range([ height, 0]);
    var yAxis = svg.append("g")
      .attr("class", "myYaxis")
    
    
    // A function that create / update the plot for a given variable:
    function update(selectedVar) {
        d3.json('/static/json/jsonData.json', function(data) {

            var Dec1920s = [1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929];
            var Dec1930s = [1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939];
            var Dec1940s = [1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949];
            var Dec1950s = [1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959];
            var Dec1960s = [1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969];
            var Dec1970s = [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979];
            var Dec1980s = [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989];
            var Dec1990s = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999];
            var Dec2000s = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009];
            var Dec2010s = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
            var Dec2020s = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];
            var decades = [Dec1920s, Dec1930s, Dec1940s, Dec1950s, Dec1960s, Dec1970s, Dec1980s, Dec1990s, Dec2000s, Dec2010s, Dec2020s];
            //var decadesString = ["1920s", "1930s", "1940s", "1950s", "1960s", "1970s", "1980s","1990s","2000s", "2010s", "2020s"];        var bins = decades(arr);
            var sum1920s = 0;
            var count1920s = 0;
            var sum1930s = 0;
            var count1930s = 0;
            var sum1940s = 0;
            var count1940s = 0;
            var sum1950s = 0;
            var count1950s = 0;
            var sum1960s = 0;
            var count1960s = 0;
            var sum1970s = 0;
            var count1970s = 0;
            var sum1980s = 0;
            var count1980s = 0;
            var sum1990s = 0;
            var count1990s = 0;
            var sum2000s = 0;
            var count2000s = 0;
            var sum2010s = 0;
            var count2010s = 0;
            var sum2020s = 0;
            var count2020s = 0;
            data.forEach(function(d) {
            
            d.tempo = +d.tempo;
            d.year = +d.year;
            
            d.speechiness = +d.speechiness
              
            if(Dec1920s.includes(d.year)){
                if (selectedVar === 'tempo') {
                sum1920s = sum1920s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                sum1920s = sum1920s + d.speechiness;
                }
                count1920s = count1920s + 1;
            } else if(Dec1930s.includes(d.year)){
                if (selectedVar === 'tempo') {
                  sum1930s = sum1930s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                  sum1930s = sum1930s + d.speechiness;
                }
                  count1930s = count1930s + 1;
            } else if(Dec1940s.includes(d.year)){   
                if (selectedVar === 'tempo') {
                  sum1940s = sum1940s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                  sum1940s = sum1940s + d.speechiness;
                }
                  count1940s = count1940s + 1;
            } else if(Dec1950s.includes(d.year)){   
                if (selectedVar === 'tempo') {
                  sum1950s = sum1950s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                  sum1950s = sum1950s + d.speechiness;
                }
                  count1950s = count1950s + 1;
            } else if(Dec1960s.includes(d.year)){   
                if (selectedVar === 'tempo') {
                  sum1960s = sum1960s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                  sum1960s = sum1960s + d.speechiness;
                }
                  count1960s = count1960s + 1;
            } else if(Dec1970s.includes(d.year)){   
                if (selectedVar === 'tempo') {
                  sum1970s = sum1970s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                  sum1970s = sum1970s + d.speechiness;
                }
                  count1970s = count1970s + 1;
            } else if(Dec1980s.includes(d.year)){   
                if (selectedVar === 'tempo') {
                  sum1980s = sum1980s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                  sum1980s = sum1980s + d.speechiness;
                }
                  count1980s = count1980s + 1;
            } else if(Dec1990s.includes(d.year)){
                if (selectedVar === 'tempo') {
                  sum1990s = sum1990s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                  sum1990s = sum1990s + d.speechiness;
                }
                  count1990s = count1990s + 1;
            } else if(Dec2000s.includes(d.year)){   
                if (selectedVar === 'tempo') {
                  sum2000s = sum2000s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                  sum2000s = sum2000s + d.speechiness;
                }
                  count2000s = count2000s + 1;
            } else if(Dec2010s.includes(d.year)){   
                if (selectedVar === 'tempo') {
                  sum2010s = sum2010s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                  sum2010s = sum2010s + d.speechiness;
                }
                  count2010s = count2010s + 1;
            } else if(Dec2020s.includes(d.year)){
                if (selectedVar === 'tempo') {
                  sum2020s = sum2020s + d.tempo;
                } else if (selectedVar === 'speechiness') {
                  sum2020s = sum2020s + d.speechiness;
                }
                  count2020s = count2020s + 1;
            } else {
                }
                
            }); 
            if(count1920s === 0) {
                var av_20s = 0;
            } else {
                var av_20s = sum1920s/count1920s;
            }

            if(count1930s === 0) {
                var av_30s = 0;
            } else {
                var av_30s = sum1930s/count1930s;
            }

            if(count1940s === 0) {
                var av_40s = 0;
            } else {
                var av_40s = sum1940s/count1940s;;
            }

            if(count1950s === 0) {
                var av_50s = 0;
            } else {
                var av_50s = sum1950s/count1950s;
            }

            if(count1960s === 0) {
                var av_60s = 0;
            } else {
                var av_60s = sum1960s/count1960s;
            }

            if(count1970s === 0) {
                var av_70s = 0;
            } else {
                var av_70s = sum1970s/count1970s;
            }

            if(count1980s === 0) {
                var av_80s = 0;
            } else {
                var av_80s = sum1920s/count1980s;
            }

            if(count1990s === 0) {
                var av_90s = 0;
            } else {
                var av_90s = sum1920s/count1990s;
            }

            if(count2000s === 0) {
                var av_2000s = 0;
            } else {
                var av_2000s = sum2000s/count2000s;
            }

            if(count2010s === 0) {
                var av_2010s = 0;
            } else {
                var av_2010s = sum2010s/count2010s;
            }

            if(count2020s === 0) {
                var av_2020s = 0;
            } else {
                var av_2020s = sum2020s/count2020s;
            }
            
            var final_data = [];
            
            final_data.push({group: '1920s', value: av_20s});
            final_data.push({group: '1930s', value: av_30s});
            final_data.push({group: '1940s', value: av_40s});
            final_data.push({group: '1950s', value: av_50s});
            final_data.push({group: '1960s', value: av_60s});
            final_data.push({group: '1970s', value: av_70s});
            final_data.push({group: '1980s', value: av_80s});
            final_data.push({group: '1990s', value: av_90s});
            final_data.push({group: '2000s', value: av_2000s});
            final_data.push({group: '2010s', value: av_2010s});
            final_data.push({group: '2020s', value: av_2020s});
            console.log(final_data);
            finalFunction(final_data);
          });
    finalFunction=(someData)=> {
      // Update the X axis
      x.domain(someData.map(function(d) { return d.group; }))
      xAxis.call(d3.axisBottom(x))
      xAxis.selectAll(".tick text")
     .attr("font-size","10")
     .attr("text-anchor", "end")
     .attr("rotate","15")
     .attr("font-family","Times New Roman");
      // Update the Y axis
      y.domain([0, d3.max(someData, function(d) { return d.value }) ]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y));
    
      // Create the u variable
      var u = svg.selectAll("rect")
        .data(someData)
    
      u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
          .attr("x", function(d) { return x(d.group); })
          .attr("y", function(d) { return y(d.value); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.value); })
          .attr("fill", "green")
    
      // If less group in the new dataset, I delete the ones not in use anymore
      u
        .exit()
        .remove()
    }
    }

    update('speechiness');