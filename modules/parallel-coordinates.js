/*
 Highcharts JS v8.1.2 (2020-07-09)

 Support for parallel coordinates in Highcharts

 (c) 2010-2019 Pawel Fus

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/parallel-coordinates",["highcharts"],function(g){b(g);b.Highcharts=g;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function g(b,k,l,d){b.hasOwnProperty(k)||(b[k]=d.apply(null,l))}b=b?b._modules:{};g(b,"modules/parallel-coordinates.src.js",[b["Core/Axis/Axis.js"],b["parts/Chart.js"],b["Core/Globals.js"],b["Core/Utilities.js"]],
function(b,k,l,d){function g(a){var c=this.series&&this.series.chart,n=a.apply(this,Array.prototype.slice.call(arguments,1)),b;if(c&&c.hasParallelCoordinates&&!p(n.formattedValue)){var e=c.yAxis[this.x];var f=e.options;c=(b=r(f.tooltipValueFormat,f.labels.format))?x(b,t(this,{value:this.y}),c):e.dateTime?c.time.dateFormat(c.time.resolveDTLFormat(f.dateTimeLabelFormats[e.tickPositions.info.unitName]).main,this.y):f.categories?f.categories[this.y]:this.y;n.formattedValue=n.point.formattedValue=c}return n}
var h=d.addEvent,y=d.arrayMax,z=d.arrayMin,p=d.defined,A=d.erase,t=d.extend,x=d.format,m=d.merge,r=d.pick,B=d.setOptions,u=d.splat,C=d.wrap;d=k.prototype;var v={lineWidth:0,tickLength:0,opposite:!0,type:"category"};B({chart:{parallelCoordinates:!1,parallelAxes:{lineWidth:1,title:{text:"",reserveSpace:!1},labels:{x:0,y:4,align:"center",reserveSpace:!1},offset:0}}});h(k,"init",function(a){a=a.args[0];var c=u(a.yAxis||{}),b=[],d=c.length;if(this.hasParallelCoordinates=a.chart&&a.chart.parallelCoordinates){for(this.setParallelInfo(a);d<=
this.parallelInfo.counter;d++)b.push({});a.legend||(a.legend={});"undefined"===typeof a.legend.enabled&&(a.legend.enabled=!1);m(!0,a,{boost:{seriesThreshold:Number.MAX_VALUE},plotOptions:{series:{boostThreshold:Number.MAX_VALUE}}});a.yAxis=c.concat(b);a.xAxis=m(v,u(a.xAxis||{})[0])}});h(k,"update",function(a){a=a.options;a.chart&&(p(a.chart.parallelCoordinates)&&(this.hasParallelCoordinates=a.chart.parallelCoordinates),this.options.chart.parallelAxes=m(this.options.chart.parallelAxes,a.chart.parallelAxes));
this.hasParallelCoordinates&&(a.series&&this.setParallelInfo(a),this.yAxis.forEach(function(a){a.update({},!1)}))});t(d,{setParallelInfo:function(a){var c=this;a=a.series;c.parallelInfo={counter:0};a.forEach(function(a){a.data&&(c.parallelInfo.counter=Math.max(c.parallelInfo.counter,a.data.length-1))})}});h(l.Series,"bindAxes",function(a){if(this.chart.hasParallelCoordinates){var c=this;this.chart.axes.forEach(function(a){c.insert(a.series);a.isDirty=!0});c.xAxis=this.chart.xAxis[0];c.yAxis=this.chart.yAxis[0];
a.preventDefault()}});h(l.Series,"afterTranslate",function(){var a=this.chart,c=this.points,b=c&&c.length,d=Number.MAX_VALUE,e;if(this.chart.hasParallelCoordinates){for(e=0;e<b;e++){var f=c[e];if(p(f.y)){f.plotX=a.polar?a.yAxis[e].angleRad||0:a.inverted?a.plotHeight-a.yAxis[e].top+a.plotTop:a.yAxis[e].left-a.plotLeft;f.clientX=f.plotX;f.plotY=a.yAxis[e].translate(f.y,!1,!0,null,!0);"undefined"!==typeof w&&(d=Math.min(d,Math.abs(f.plotX-w)));var w=f.plotX;f.isInside=a.isInsidePlot(f.plotX,f.plotY,
a.inverted)}else f.isNull=!0}this.closestPointRangePx=d}},{order:1});h(l.Series,"destroy",function(){this.chart.hasParallelCoordinates&&(this.chart.axes||[]).forEach(function(a){a&&a.series&&(A(a.series,this),a.isDirty=a.forceRedraw=!0)},this)});["line","spline"].forEach(function(a){C(l.seriesTypes[a].prototype.pointClass.prototype,"getLabelConfig",g)});var D=function(){function a(a){this.axis=a}a.prototype.setPosition=function(a,b){var c=this.axis,e=c.chart,f=((this.position||0)+.5)/(e.parallelInfo.counter+
1);e.polar?b.angle=360*f:(b[a[0]]=100*f+"%",c[a[1]]=b[a[1]]=0,c[a[2]]=b[a[2]]=null,c[a[3]]=b[a[3]]=null)};return a}(),q;(function(a){function b(a){var b=this.chart,c=this.parallelCoordinates,d=["left","width","height","top"];if(b.hasParallelCoordinates)if(b.inverted&&(d=d.reverse()),this.isXAxis)this.options=m(this.options,v,a.userOptions);else{var e=b.yAxis.indexOf(this);this.options=m(this.options,this.chart.options.chart.parallelAxes,a.userOptions);c.position=r(c.position,0<=e?e:b.yAxis.length);
c.setPosition(d,this.options)}}function d(a){var b=this.chart,c=this.parallelCoordinates;if(c&&b&&b.hasParallelCoordinates&&!this.isXAxis){var d=c.position,e=[];this.series.forEach(function(a){a.visible&&p(a.yData[d])&&e.push(a.yData[d])});this.dataMin=z(e);this.dataMax=y(e);a.preventDefault()}}function g(){this.parallelCoordinates||(this.parallelCoordinates=new D(this))}a.compose=function(a){a.keepProps.push("parallel");h(a,"init",g);h(a,"afterSetOptions",b);h(a,"getSeriesExtremes",d)}})(q||(q={}));
q.compose(b);return q});g(b,"masters/modules/parallel-coordinates.src.js",[],function(){})});
//# sourceMappingURL=parallel-coordinates.js.map