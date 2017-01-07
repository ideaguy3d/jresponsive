/**
 * Created by Julius Alvarado on 1/3/2017.
 */

// primitive d3 bar chart.
(function () {
    "use strict";
    console.log("ja - draw.data.js invoked.");
    var w = 200, h = 100, padding = 2, dataset = [5, 10, 15, 20, 12];

    var svg = d3.select('#basic-bars').append('svg').attr('height', h).attr('width', w);
    svg.selectAll('rect').data(dataset).enter().append('rect')
        .attr('x', function (datasetElem, zIndex) {
            return zIndex * (w / dataset.length);
        })
        .attr('y', function (datasetElem, zIndex) {
            return h - datasetElem * 4;
        })
        .attr('width', w / dataset.length - padding)
        .attr('height', function (datasetElem, zIndex) {
            return datasetElem * 4;
        });
}());

// basic bar chart
(function () {
    "use strict";
    // dataset determines height of bars
    var w = 300, h = 125, padding = 2, rectWidth,
        dataset = [5, 19, 15, 7, 17, 12, 24, 20, 10, 9];

    var svg = d3.select('#bar-chart').append('svg').attr('width', w).attr('height', h);

    function colorPicker(dataValue) {
        if (dataValue <= 20) return 'red';
        else if (dataValue <= 50) return 'orange';
        else if (dataValue <= 70) return 'blue';
        else if (dataValue > 71) return 'green';
        else return '#333';
    }

    svg.selectAll('rect').data(dataset).enter().append('rect')
        .attr({
            x: function (datasetElem, zIndex) {
                return zIndex * (w / dataset.length);
            },
            y: function (datasetElem) {
                return h - datasetElem * 4;
            },
            width: function(){
                rectWidth = w / dataset.length - 2;
                return rectWidth;
            },
            height: function (dataElem, zIndex) {
                return dataElem * 4
            },
            fill: function (dataElem) {
                return colorPicker((dataElem * 4));
            }
        });
    svg.selectAll('text').data(dataset).enter().append('text')
        .text(function (datasetElem) {
            return datasetElem;
        })
        .attr({
            'text-anchor': 'middle',
            x: function (datasetElem, index) {
                return index * (w / dataset.length) + rectWidth/2.4;
            },
            y: function(dataElem, index){
                return (h - dataElem*4) + 14;
            },
            "font-size": 14,
            "fill": "whitesmoke",
            "font-weight": 'bold'
        });
}());


//\\