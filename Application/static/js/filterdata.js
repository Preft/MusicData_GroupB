// Declare Variables
var form = d3.select("#date-filter");
var button = d3.select("#filter-btn");

//////////////////////////////
// Action Function Declared //
//////////////////////////////

DataGenerator=(truthValue)=>{
//Grab Data
d3.json("/static/json/jsonData.json").then(function(mydata, err) {
    for(let k=0; k<mydata.length; k++ ){
        mydata.name = toString(mydata.name);
        mydata.artists = toString(mydata.artists);
        mydata.year = parseInt(mydata.year);
        mydata.acousticness = parseFloat(mydata.acousticness);
        mydata.danceability = parseFloat(mydata.danceability);
        mydata.duration_ms = parseFloat(mydata.duration_ms);
        mydata.energy = parseFloat(mydata.energy);
        mydata.loudness = parseFloat(mydata.loudness);
        mydata.popularity = parseFloat(mydata.popularity);
    }

// Display Data function declared
DisplayData=(selectedData)=> {
    let SightingsTable = d3.select("tbody");
    SightingsTable.html("");
    selectedData.forEach(obj => {
        let item = SightingsTable.append("tr");
        item.append("td").text(`${obj.name}`);
        item.append("td").text(`${obj.artists}`);
        item.append("td").text(`${obj.year}`);
        item.append("td").text(`${obj.acousticness}`);
        item.append("td").text(`${obj.danceability}`);
        item.append("td").text(`${obj.duration_ms}`);
        item.append("td").text(`${obj.energy}`);
        item.append("td").text(`${obj.loudness}`);
        item.append("td").text(`${obj.popularity}`);
      });
}

// Filter Data function declared
filterItemDisplay=()=> {
    let searchParam = [];
    //Grab Data
    let inputNameElement = d3.select("#name");
    let inputNameValue = inputNameElement.property("value");

    let inputArtistsElement = d3.select("#artists");
    let inputArtistsValue = inputArtistsElement.property("value");

    let inputYearElement = d3.select("#year");
    let inputYearValue = inputYearElement.property("value");
    var filteredData = mydata;

    // Filter Data
    if (inputNameValue != "") {
        inputNameValue = inputNameValue.toLowerCase();
        var filteredData = filteredData.filter(filteredData => {
            return filteredData.name.toLowerCase().includes(inputNameValue)
        });
        searchParam.push(`Song: ${inputNameValue}`);
    }

    if (inputArtistsValue != "") {
        inputArtistsValue = inputArtistsValue.toLowerCase();

        var filteredData = filteredData.filter(filteredData => {
            return filteredData.artists.toLowerCase().includes(inputArtistsValue)
        });
        searchParam.push(`Artist: ${inputArtistsValue}`);
    }

    if (inputYearValue != "") {
        var filteredData = filteredData.filter(filteredData => filteredData.year === inputYearValue);
        searchParam.push(`Year: ${inputYearValue}`);
    }
    DisplayData(filteredData);
    // If obj is empty, then alert user.
    if (Object.keys(filteredData).length === 0) {
        var searchParamString ="";
            for (let i=0; i<searchParam.length; i++) {
                    searchParamString += `\r\n${searchParam[i]}`;
            }
        document.getElementById('name').value = '';
        document.getElementById('artists').value = '';
        document.getElementById('year').value = '';
        alert(`No results came up for the following search paramaters: ${searchParamString} \r\nPlease try again.`);
        DisplayData(mydata);
    }  
}

// Decide if Filter is On or Off
if (truthValue === true) {
    filterItemDisplay();
} else {
    DisplayData(mydata);
}


}).catch(function(err) {
    console.log(err);
});
}


////////////////////////////////////////////
// Event Listeners and Default Initiaters //
////////////////////////////////////////////


// Initialize Data
defaultFunction=()=>{
    DataGenerator(false);
}
//  Filter Data
filterFunction=()=>{
    DataGenerator(true);
}
// Event Listeners
defaultFunction();
form.on("submit", filterFunction);
button.on("click", filterFunction);




