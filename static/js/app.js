

function init() {
    //Load Dropdown
    d3.json("data/samples.json").then((importedData) => {
        // console.log(importedData);
        var data = importedData;
        var selDataset = document.getElementById("selDataset");
        for (element in data.names) {
            var opt = document.createElement("option");
            opt.value = data.names[element];
            opt.innerHTML = data.names[element];
            // then append it to the select element
            selDataset.appendChild(opt);
        };

        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var selectedValue = dropdownMenu.property("value");

        var initial_value = selectedValue;
        var initial_intvalue = selectedValue;

        function filterSamples(InitialData) {
            return InitialData.id == initial_value;
        }

        function filtermetadata(InitialintData) {
            return InitialintData.id == initial_intvalue;
        }

        // 2. Use filter() to pass the function as its argument
        var filteredsamples = data.samples.filter(filterSamples);
        var filteredmetaData = data.metadata.filter(filtermetadata);

        // 3. Use the map method 
        var otu_ids = filteredsamples.map(samples => samples.otu_ids);
        var sample_values = filteredsamples.map(samplesm => samplesm.sample_values);
        var otu_labels = filteredsamples.map(samplest => samplest.otu_labels);

        var ethnicity = filteredmetaData.map(metadata => metadata.ethnicity);
        var age = filteredmetaData.map(metadata => metadata.age);
        var gender = filteredmetaData.map(metadata => metadata.gender);
        var location = filteredmetaData.map(metadata => metadata.location);
        var bbtype = filteredmetaData.map(metadata => metadata.bbtype);
        var wfreq = filteredmetaData.map(metadata => metadata.wfreq);


        // Slice the first 10 objects for plotting
        var Top10otu_ids = otu_ids[0].slice(0, 10);
        var Top10sample_values = sample_values[0].slice(0, 10);
        var Top10otu_labels = otu_labels[0].slice(0, 10);

        Top10otu_idsWithAbv = Top10otu_ids.map(i => 'OTU ' + i);

        var trace1 = {
            x: Top10sample_values,
            y: Top10otu_idsWithAbv,
            type: "bar",
            orientation: "h",
            text: Top10otu_labels
            // hovertext = Top10otu_labels
        };

        var Bardata = [trace1];

        var layout = {
            title: "Data for " + initial_value
        };

        Plotly.newPlot("bar", Bardata, layout);

        var trace2 = {
            x: otu_ids[0],
            y: sample_values[0],
            text: otu_labels[0],
            mode: 'markers',
            marker: {
              color: otu_ids[0],
            //   opacity: [1, 0.8, 0.6, 0.4],
              size: sample_values[0]
            }
          };
          
          var data = [trace2];
          
          var layout = {
            title: 'Marker Size and Color',
            showlegend: false,
            height: 600,
            width: 1200
          };
          
          Plotly.newPlot('bubble', data, layout);

          var metadatadiv = document.getElementById("sample-metadata");
          var metadatatable = document.createElement("table");
          var row = document.createElement("tr");
          var column = document.createElement("td");

          metadatadiv.innerHTML = "";
          column.innerHTML = "id: " + initial_value;
          row.appendChild(column);
          metadatatable.appendChild(row);

        row = document.createElement("tr");
        column = document.createElement("td");
        column.innerHTML = "ethnicity: " + ethnicity;
        row.appendChild(column);
        metadatatable.appendChild(row);

        row = document.createElement("tr");
        column = document.createElement("td");
        column.innerHTML = "gender: " + gender;
        row.appendChild(column);
        metadatatable.appendChild(row);

        row = document.createElement("tr");
        column = document.createElement("td");
        column.innerHTML = "age: " + age;
        row.appendChild(column);
        metadatatable.appendChild(row);

        row = document.createElement("tr");
        column = document.createElement("td");
        column.innerHTML = "location: " + location;
        row.appendChild(column);
        metadatatable.appendChild(row);

        row = document.createElement("tr");
        column = document.createElement("td");
        column.innerHTML = "bbtype: " + bbtype;
        row.appendChild(column);
        metadatatable.appendChild(row);

        row = document.createElement("tr");
        column = document.createElement("td");
        column.innerHTML = "wfreq: " + wfreq;
        row.appendChild(column);
        metadatatable.appendChild(row);

          metadatadiv.appendChild(metadatatable);

    });
}

d3.selectAll("#selDataset").on("change", init);

// Initializes the page with a default plot
init();

