/**
 * Created by Julius Alvarado on 1/3/2017.
 */

// primitive d3 bar chart.
(function(){
    "use strict";
    console.log("ja - draw.data.js invoked.");
    var w = 200, h = 100, padding = 2, dataset = [5,10,15,20,12];

    var svg = d3.select('#basic-bars').append('svg').attr('height', h).attr('width', w);
    svg.selectAll('rect').data(dataset).enter().append('rect')
        .attr('x', function(datasetElem, zIndex){
            return zIndex * (w / dataset.length);
        })
        .attr('y', function(datasetElem, zIndex){
            return h - datasetElem * 4;
        })
        .attr('width', w / dataset.length - padding)
        .attr('height', function(datasetElem, zIndex){
            return datasetElem * 4;
        });
}());

// basic bar chart
(function(){
    "use strict";

    var w = 300, h = 100, padding = 2, dataset = [5, 7, 10, 25, 17];

    var svg = d3.select('#bar-chart').append('svg').attr('width', w).attr('height', h);

    svg.selectAll('rect').data(dataset).enter().append('rect')
        .attr('x', function(datasetElem, zIndex){
            return zIndex * (w / dataset.length);
        })
        .attr('y', function(datasetElem){
            console.log("ja: h - datasetElem = "+ (h - datasetElem));
            return h - datasetElem;
        })
        .attr('width', w / dataset.length - padding)
        .attr('height', function(datasetElem, zIndex){
            return datasetElem;
        });
}());


//\\