var data_global_1 = 0;
var data_global_2 = 0;
var data_global_3 = 0;
var data_global_4 = 0;
var data_global_5 = 0;
var data_global_6 = 0;
var data_global_7 = 0;
var data_global_8 = 0;
var data_global_9 = 0;
$.ajax({
  type:"POST",
  async: false,
  url: '/plot',
  success: function(d1){
    console.log("abc" + d1);
    data_global_1 = d1.data1;
    data_global_2 = d1.data2;
    data_global_3 = d1.data3;
    data_global_4 = d1.data4;
    data_global_5 = d1.data5;
    data_global_6 = d1.data6;
    data_global_7 = d1.data7;
    data_global_8 = d1.data8;
    data_global_9 = d1.data9;
  }
})

var y1 = 0;
var y2 = 0;
var data_1 = [];
var data_2 = [];
var dataSeries_1 = { type: "line" };
var dataSeries_2 = { type: "line" };
var dataSeries_3 = { type: "line" };
var dataSeries_4 = { type: "line" };
var dataSeries_5 = { type: "line" };
var dataSeries_6 = { type: "line" };
var dataSeries_7 = { type: "line" };
var dataSeries_8 = { type: "line" };
var dataSeries_9 = { type: "line" };
var dataPoints_1 = [];
var dataPoints_2 = [];
var dataPoints_3 = [];
var dataPoints_4 = [];
var dataPoints_5 = [];
var dataPoints_6 = [];
var dataPoints_7 = [];
var dataPoints_8 = [];
var dataPoints_9 = [];
for (var i = 0; i < data_global_1.length; i += 1) {
  y1 = data_global_1[i];
  dataPoints_1.push({
    x: (i*92.8) / 1000,
    y: y1
  });
}
for (var i = 0; i < data_global_2.length; i += 1) {
  y2 = data_global_2[i];
  dataPoints_2.push({
    x: (i*92.8) / 1000,
    y: y2
  });
}
for (var i = 0; i < data_global_3.length; i += 1) {
  y1 = data_global_3[i];
  dataPoints_3.push({
    x: (i*92.8) / 1000,
    y: y1
  });
}
for (var i = 0; i < data_global_4.length; i += 1) {
  y1 = data_global_4[i];
  dataPoints_4.push({
    x: (i*92.8) / 1000,
    y: y1
  });
}
for (var i = 0; i < data_global_5.length; i += 1) {
  y1 = data_global_5[i];
  dataPoints_5.push({
    x: (i*92.8) / 1000,
    y: y1
  });
}
for (var i = 0; i < data_global_6.length; i += 1) {
  y1 = data_global_6[i];
  dataPoints_6.push({
    x: (i*92.8) / 1000,
    y: y1
  });
}
for (var i = 0; i < data_global_7.length; i += 1) {
  y1 = data_global_7[i];
  dataPoints_7.push({
    x: (i*92.8) / 1000,
    y: y1
  });
}
for (var i = 0; i < data_global_8.length; i += 1) {
  y1 = data_global_8[i];
  dataPoints_8.push({
    x: (i*92.8) / 1000,
    y: y1
  });
}
for (var i = 0; i < data_global_9.length; i += 1) {
  y1 = data_global_9[i];
  dataPoints_9.push({
    x: (i*92.8) / 1000,
    y: y1
  });
}
dataSeries_1.dataPoints = dataPoints_1;
dataSeries_2.dataPoints = dataPoints_2;
dataSeries_3.dataPoints = dataPoints_3;
dataSeries_4.dataPoints = dataPoints_4;
dataSeries_5.dataPoints = dataPoints_5;
dataSeries_6.dataPoints = dataPoints_6;
dataSeries_7.dataPoints = dataPoints_7;
dataSeries_8.dataPoints = dataPoints_8;
dataSeries_9.dataPoints = dataPoints_9;
data_1.push(dataSeries_1);
data_2.push(dataSeries_2);
console.log("sb",dataPoints_1, dataPoints_2);
// max_1 = Math.max(data_points_5);
// max_2 = Math.max(data_point_6);
// energy_max = Math.max(max_1,max_2);
window.onload = function() {
  var chart1 = new CanvasJS.Chart("chartContainer", {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "frequency flow of Song"
    },
    axisX: {
      lableAngle:30,
      suffix:"s"
    },
    axisY: {
      includeZero: false,
      maximum: 6000,
      minimum: 0,
      suffix:"HZ"
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
    },
    data: [{
      type:"line",
      name: "First Audio",
      showInLegend: true,
      markerSize: 0,
      dataPoints: dataPoints_1
    },
    {
      type: "line",
      name: "Second Audio",
      showInLegend: true,
      markerSize: 0,
      dataPoints: dataPoints_2
    }]
  });

  var chart2 = new CanvasJS.Chart("chartContainer1", {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "Spectral Flatness of Songs"
    },
    axisX: {
      lableAngle:30,
      suffix:"s"
    },
    axisY: {
      includeZero: false,
      maximum: 1,
      minimum: 0,
      suffix:""
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
    },
    data: [{
      type:"line",
      name: "First Audio",
      showInLegend: true,
      markerSize: 0,
      dataPoints: dataPoints_3
    },
    {
      type: "line",
      name: "Second Audio",
      showInLegend: true,
      markerSize: 0,
      dataPoints: dataPoints_4
    }]
  });

  var chart3 = new CanvasJS.Chart("chartContainer2", {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "Energy of Songs"
    },
    axisX: {
      lableAngle:30,
      suffix:"s"
    },
    axisY: {
      includeZero: false,
      maximum: 4000000,
      minimum: 0,
      suffix:""
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
    },
    data: [{
      type:"line",
      name: "First Audio",
      showInLegend: true,
      markerSize: 0,
      dataPoints: dataPoints_5
    },
    {
      type: "line",
      name: "Second Audio",
      showInLegend: true,
      markerSize: 0,
      dataPoints: dataPoints_6
    }]
  });

  var chart4 = new CanvasJS.Chart("chartContainer3", {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "Centroid of Song"
    },
    axisX: {
      lableAngle:30,
      suffix:"s"
    },
    axisY: {
      includeZero: false,
      maximum: 1000,
      minimum: 0,
      suffix:""
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
    },
    data: [{
      type:"line",
      name: "First Audio",
      showInLegend: true,
      markerSize: 0,
      dataPoints: dataPoints_7
    },
    {
      type: "line",
      name: "Second Audio",
      showInLegend: true,
      markerSize: 0,
      dataPoints: dataPoints_8
    }]
  });

  var chart5 = new CanvasJS.Chart("chartContainer4", {
    // zoomEnabled: true,
    // animationEnabled: true,
    // title: {
    //   text: "Match Plot of Songs"
    // },
    // axisX: {
    //   lableAngle:30,
    //   suffix:"s"
    // },
    // axisY: {
    //   maximum: 2,
    //   minimum: -1,
    //   suffix:""
    // },
    // toolTip: {
    //   shared: true
    // },
    // legend: {
    //   cursor: "pointer",
    //   verticalAlign: "top",
    //   horizontalAlign: "center",
    //   dockInsidePlotArea: true,
    //   itemclick: toogleDataSeries
    // },
    // data: [{
    //   type:"line",
    //   name: "Match percentage",
    //   showInLegend: true,
    //   markerSize: 0,
    //   dataPoints: dataPoints_9}]

    animationEnabled: true,
    zoomEnabled: true,
    title:{
      text: "Match Plot of the Songs"
    },
    axisX: {
      lableAngle:30,
      suffix:"s"
    },
    axisY:{
      maximum: 2,
      minimum: -1,
      suffix:""
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
    },
    data: [{
      type: "scatter",
      name: "Match percentage",
      showInLegend: true,
      color: "black",
      markerSize: 5,
      dataPoints: dataPoints_9}]
  });

chart1.render();
chart2.render();
chart3.render();
chart4.render();
chart5.render();


function toogleDataSeries(e){
  if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else{
    e.dataSeries.visible = true;
  }
  chart.render();
}
}
$(function(){
  $('#button4').click(function(e){
    //alert('waiting');
    $("#spinner").html("<img src= ./stylesheets/Ellipsis.svg>");
  });
})
