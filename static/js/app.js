

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

        var initial_value = "940";

        function filterSamples(InitialData) {
            return InitialData.id == initial_value;
        }

        // 2. Use filter() to pass the function as its argument
        var filteredsamples = data.samples.filter(filterSamples);

        // 3. Use the map method 
        var otu_ids = filteredsamples.map(samples => samples.otu_ids);
        var sample_values = filteredsamples.map(samplesm => samplesm.sample_values);
        var otu_labels = filteredsamples.map(samplest => samplest.otu_labels);

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


    });
}
// Initializes the page with a default plot
init();

