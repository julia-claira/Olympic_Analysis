function init() {

    //get reference to dropdown element in html
    var selectName = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        //console.log(data);
        //use the name list for selecting sample?
        var selectedNames = data.names;

        selectedNames.forEach((sample) => {
            selectName.append("option").text(sample).property("value", sample);
        });

        var defaultName = selectedNames[0];
        
        buildChart(defaultName);
        buildMeta(defaultName);
    });
}

init();