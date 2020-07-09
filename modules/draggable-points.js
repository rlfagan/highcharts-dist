/*
 Highcharts JS v8.1.2 (2020-07-09)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define("highcharts/modules/draggable-points",["highcharts"],function(r){e(r);e.Highcharts=r;return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){function r(e,q,l,r){e.hasOwnProperty(q)||(e[q]=r.apply(null,l))}e=e?e._modules:{};r(e,"modules/draggable-points.src.js",[e["Core/Globals.js"],e["parts/Point.js"],e["Core/Utilities.js"]],function(e,q,l){function r(a){return{left:"right",
right:"left",top:"bottom",bottom:"top"}[a]}function K(a){var b=["draggableX","draggableY"],c;m(a.dragDropProps,function(a){a.optionName&&b.push(a.optionName)});for(c=b.length;c--;)if(a.options.dragDrop[b[c]])return!0}function L(a){var b=a.series?a.series.length:0;if(a.hasCartesianSeries&&!a.polar)for(;b--;)if(a.series[b].options.dragDrop&&K(a.series[b]))return!0}function M(a){var b=a.series,c=b.options.dragDrop||{};a=a.options&&a.options.dragDrop;var d,f;m(b.dragDropProps,function(a){"x"===a.axis&&
a.move?d=!0:"y"===a.axis&&a.move&&(f=!0)});return(c.draggableX&&d||c.draggableY&&f)&&!(a&&!1===a.draggableX&&!1===a.draggableY)&&b.yAxis&&b.xAxis}function w(a,b){return"undefined"===typeof a.chartX||"undefined"===typeof a.chartY?b.pointer.normalize(a):a}function x(a,b,c,d){var f=b.map(function(b){return t(a,b,c,d)});return function(){f.forEach(function(a){a()})}}function N(a,b,c){var d=b.dragDropData.origin;b=d.chartX;d=d.chartY;var f=a.chartX;a=a.chartY;return Math.sqrt((f-b)*(f-b)+(a-d)*(a-d))>
c}function O(a,b,c){var d={chartX:a.chartX,chartY:a.chartY,guideBox:c&&{x:c.attr("x"),y:c.attr("y"),width:c.attr("width"),height:c.attr("height")},points:{}};b.forEach(function(b){var c={};m(b.series.dragDropProps,function(d,f){d=b.series[d.axis+"Axis"];c[f]=b[f];c[f+"Offset"]=d.toPixels(b[f])-(d.horiz?a.chartX:a.chartY)});c.point=b;d.points[b.id]=c});return d}function P(a){var b=a.series,c=[],d=b.options.dragDrop.groupBy;b.isSeriesBoosting?b.options.data.forEach(function(a,d){c.push((new b.pointClass).init(b,
a));c[c.length-1].index=d}):c=b.points;return a.options[d]?c.filter(function(b){return b.options[d]===a.options[d]}):[a]}function D(a,b){var c=P(b),d=b.series,f=d.chart,n;v(d.options.dragDrop&&d.options.dragDrop.liveRedraw,!0)||(f.dragGuideBox=n=d.getGuideBox(c),f.setGuideBoxState("default",d.options.dragDrop.guideBox).add(d.group));f.dragDropData={origin:O(a,c,n),point:b,groupedPoints:c,isDragging:!0}}function Q(a,b){var c=a.point,d=p(c.series.options.dragDrop,c.options.dragDrop),f={},n=a.updateProp,
B={};m(c.series.dragDropProps,function(a,b){if(!n||n===b&&a.resize&&(!a.optionName||!1!==d[a.optionName]))if(n||a.move&&("x"===a.axis&&d.draggableX||"y"===a.axis&&d.draggableY))f[b]=a});(n?[c]:a.groupedPoints).forEach(function(c){B[c.id]={point:c,newValues:c.getDropValues(a.origin,b,f)}});return B}function E(a,b){var c=a.dragDropData.newPoints;b=!1===b?!1:p({duration:400},a.options.chart.animation);a.isDragDropAnimating=!0;m(c,function(a){a.point.update(a.newValues,!1)});a.redraw(b);setTimeout(function(){delete a.isDragDropAnimating;
a.hoverPoint&&!a.dragHandles&&a.hoverPoint.showDragHandles()},b.duration)}function F(a){var b=a.series&&a.series.chart,c=b&&b.dragDropData;!b||!b.dragHandles||c&&(c.isDragging&&c.draggedPastSensitivity||c.isHoveringHandle===a.id)||b.hideDragHandles()}function G(a){var b=0,c;for(c in a)Object.hasOwnProperty.call(a,c)&&b++;return b}function H(a){for(var b in a)if(Object.hasOwnProperty.call(a,b))return a[b]}function R(a,b){if(!b.zoomOrPanKeyPressed(a)){var c=b.dragDropData;var d=0;if(c&&c.isDragging){var f=
c.point;d=f.series.options.dragDrop;a.preventDefault();c.draggedPastSensitivity||(c.draggedPastSensitivity=N(a,b,v(f.options.dragDrop&&f.options.dragDrop.dragSensitivity,d&&d.dragSensitivity,2)));c.draggedPastSensitivity&&(c.newPoints=Q(c,a),b=c.newPoints,d=G(b),b=1===d?H(b):null,f.firePointEvent("drag",{origin:c.origin,newPoints:c.newPoints,newPoint:b&&b.newValues,newPointId:b&&b.point.id,numNewPoints:d,chartX:a.chartX,chartY:a.chartY},function(){var b=f.series,c=b.chart,d=c.dragDropData,e=p(b.options.dragDrop,
f.options.dragDrop),g=e.draggableX,k=e.draggableY;b=d.origin;var h=a.chartX-b.chartX,y=a.chartY-b.chartY,u=h;d=d.updateProp;c.inverted&&(h=-y,y=-u);if(v(e.liveRedraw,!0))E(c,!1),f.showDragHandles();else if(d){g=h;c=y;u=f.series;k=u.chart;d=k.dragDropData;e=u.dragDropProps[d.updateProp];var l=d.newPoints[f.id].newValues;var q="function"===typeof e.resizeSide?e.resizeSide(l,f):e.resizeSide;e.beforeResize&&e.beforeResize(k.dragGuideBox,l,f);k=k.dragGuideBox;u="x"===e.axis&&u.xAxis.reversed||"y"===e.axis&&
u.yAxis.reversed?r(q):q;g="x"===e.axis?g-(d.origin.prevdX||0):0;c="y"===e.axis?c-(d.origin.prevdY||0):0;switch(u){case "left":var m={x:k.attr("x")+g,width:Math.max(1,k.attr("width")-g)};break;case "right":m={width:Math.max(1,k.attr("width")+g)};break;case "top":m={y:k.attr("y")+c,height:Math.max(1,k.attr("height")-c)};break;case "bottom":m={height:Math.max(1,k.attr("height")+c)}}k.attr(m)}else c.dragGuideBox.translate(g?h:0,k?y:0);b.prevdX=h;b.prevdY=y}))}}}function A(a,b){var c=b.dragDropData;if(c&&
c.isDragging&&c.draggedPastSensitivity){var d=c.point,f=c.newPoints,e=G(f),g=1===e?H(f):null;b.dragHandles&&b.hideDragHandles();a.preventDefault();b.cancelClick=!0;d.firePointEvent("drop",{origin:c.origin,chartX:a.chartX,chartY:a.chartY,newPoints:f,numNewPoints:e,newPoint:g&&g.newValues,newPointId:g&&g.point.id},function(){E(b)})}delete b.dragDropData;b.dragGuideBox&&(b.dragGuideBox.destroy(),delete b.dragGuideBox)}function S(a){var b=a.container,c=e.doc;L(a)&&(x(b,["mousedown","touchstart"],function(b){b=
w(b,a);var c=a.hoverPoint,d=p(c&&c.series.options.dragDrop,c&&c.options.dragDrop),e=d.draggableX||!1;d=d.draggableY||!1;a.cancelClick=!1;!e&&!d||a.zoomOrPanKeyPressed(b)||a.hasDraggedAnnotation||(a.dragDropData&&a.dragDropData.isDragging?A(b,a):c&&M(c)&&(a.mouseIsDown=!1,D(b,c),c.firePointEvent("dragStart",b)))}),x(b,["mousemove","touchmove"],function(b){R(w(b,a),a)}),t(b,"mouseleave",function(b){A(w(b,a),a)}),a.unbindDragDropMouseUp=x(c,["mouseup","touchend"],function(b){A(w(b,a),a)}),a.hasAddedDragDropEvents=
!0,t(a,"destroy",function(){a.unbindDragDropMouseUp&&a.unbindDragDropMouseUp()}))}var t=l.addEvent,T=l.clamp,p=l.merge,m=l.objectEach,v=l.pick;"";var g=e.seriesTypes;l=function(a){a=a.shapeArgs||a.graphic.getBBox();var b=a.r||0,c=a.height/2;return[["M",0,b],["L",0,c-5],["A",1,1,0,0,0,0,c+5],["A",1,1,0,0,0,0,c-5],["M",0,c+5],["L",0,a.height-b]]};var z=g.line.prototype.dragDropProps={x:{axis:"x",move:!0},y:{axis:"y",move:!0}};g.flags&&(g.flags.prototype.dragDropProps=z);var h=g.column.prototype.dragDropProps=
{x:{axis:"x",move:!0},y:{axis:"y",move:!1,resize:!0,beforeResize:function(a,b,c){var d=c.series.translatedThreshold,f=a.attr("y");b.y>=c.series.options.threshold?(b=a.attr("height"),a.attr({height:Math.max(0,Math.round(b+(d?d-(f+b):0)))})):a.attr({y:Math.round(f+(d?d-f:0))})},resizeSide:function(a,b){var c=b.series.chart.dragHandles;a=a.y>=(b.series.options.threshold||0)?"top":"bottom";b=r(a);c[b]&&(c[b].destroy(),delete c[b]);return a},handlePositioner:function(a){var b=a.shapeArgs||a.graphic.getBBox();
return{x:b.x,y:a.y>=(a.series.options.threshold||0)?b.y:b.y+b.height}},handleFormatter:function(a){var b=a.shapeArgs||{};a=b.r||0;b=b.width||0;var c=b/2;return[["M",a,0],["L",c-5,0],["A",1,1,0,0,0,c+5,0],["A",1,1,0,0,0,c-5,0],["M",c+5,0],["L",b-a,0]]}}};g.bullet&&(g.bullet.prototype.dragDropProps={x:h.x,y:h.y,target:{optionName:"draggableTarget",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){var b=a.targetGraphic.getBBox();return{x:a.barX,y:b.y+b.height/2}},handleFormatter:h.y.handleFormatter}});
g.columnrange&&(g.columnrange.prototype.dragDropProps={x:{axis:"x",move:!0},low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){a=a.shapeArgs||a.graphic.getBBox();return{x:a.x,y:a.y+a.height}},handleFormatter:h.y.handleFormatter,propValidate:function(a,b){return a<=b.high}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){a=a.shapeArgs||a.graphic.getBBox();return{x:a.x,y:a.y}},handleFormatter:h.y.handleFormatter,
propValidate:function(a,b){return a>=b.low}}});g.boxplot&&(g.boxplot.prototype.dragDropProps={x:h.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.lowPlot}},handleFormatter:h.y.handleFormatter,propValidate:function(a,b){return a<=b.q1}},q1:{optionName:"draggableQ1",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.q1Plot}},handleFormatter:h.y.handleFormatter,
propValidate:function(a,b){return a<=b.median&&a>=b.low}},median:{axis:"y",move:!0},q3:{optionName:"draggableQ3",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.q3Plot}},handleFormatter:h.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.median}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.highPlot}},handleFormatter:h.y.handleFormatter,propValidate:function(a,
b){return a>=b.q3}}});g.ohlc&&(g.ohlc.prototype.dragDropProps={x:h.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotLow}},handleFormatter:h.y.handleFormatter,propValidate:function(a,b){return a<=b.open&&a<=b.close}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotHigh}},handleFormatter:h.y.handleFormatter,propValidate:function(a,
b){return a>=b.open&&a>=b.close}},open:{optionName:"draggableOpen",axis:"y",move:!0,resize:!0,resizeSide:function(a){return a.open>=a.close?"top":"bottom"},handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotOpen}},handleFormatter:h.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.low}},close:{optionName:"draggableClose",axis:"y",move:!0,resize:!0,resizeSide:function(a){return a.open>=a.close?"bottom":"top"},handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotClose}},
handleFormatter:h.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.low}}});if(g.arearange){z=g.columnrange.prototype.dragDropProps;var I=function(a){a=a.graphic?a.graphic.getBBox().width/2+1:4;return[["M",0-a,0],["a",a,a,0,1,0,2*a,0],["a",a,a,0,1,0,-2*a,0]]};g.arearange.prototype.dragDropProps={x:z.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return(a=a.lowerGraphic&&a.lowerGraphic.getBBox())?{x:a.x+a.width/2,y:a.y+
a.height/2}:{x:-999,y:-999}},handleFormatter:I,propValidate:z.low.propValidate},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return(a=a.upperGraphic&&a.upperGraphic.getBBox())?{x:a.x+a.width/2,y:a.y+a.height/2}:{x:-999,y:-999}},handleFormatter:I,propValidate:z.high.propValidate}}}g.waterfall&&(g.waterfall.prototype.dragDropProps={x:h.x,y:p(h.y,{handleFormatter:function(a){return a.isSum||a.isIntermediateSum?null:h.y.handleFormatter(a)}})});
if(g.xrange){var J=function(a,b){var c=a.series,d=c.xAxis,f=c.yAxis,e=c.chart.inverted;b=d.toPixels(a[b],!0);var g=f.toPixels(a.y,!0);a=c.columnMetrics?c.columnMetrics.offset:-a.shapeArgs.height/2;e&&(b=d.len-b,g=f.len-g);return{x:Math.round(b),y:Math.round(g+a)}};l=g.xrange.prototype.dragDropProps={y:{axis:"y",move:!0},x:{optionName:"draggableX1",axis:"x",move:!0,resize:!0,resizeSide:"left",handlePositioner:function(a){return J(a,"x")},handleFormatter:l,propValidate:function(a,b){return a<=b.x2}},
x2:{optionName:"draggableX2",axis:"x",move:!0,resize:!0,resizeSide:"right",handlePositioner:function(a){return J(a,"x2")},handleFormatter:l,propValidate:function(a,b){return a>=b.x}}};g.gantt&&(g.gantt.prototype.dragDropProps={y:l.y,start:p(l.x,{optionName:"draggableStart",validateIndividualDrag:function(a){return!a.milestone}}),end:p(l.x2,{optionName:"draggableEnd",validateIndividualDrag:function(a){return!a.milestone}})})}"gauge pie sunburst wordcloud sankey histogram pareto vector windbarb treemap bellcurve sma map mapline".split(" ").forEach(function(a){g[a]&&
(g[a].prototype.dragDropProps=null)});var U={"default":{className:"highcharts-drag-box-default",lineWidth:1,lineColor:"#888",color:"rgba(0, 0, 0, 0.1)",cursor:"move",zIndex:900}},V={className:"highcharts-drag-handle",color:"#fff",lineColor:"rgba(0, 0, 0, 0.6)",lineWidth:1,zIndex:901};e.Chart.prototype.setGuideBoxState=function(a,b){var c=this.dragGuideBox;b=p(U,b);a=p(b["default"],b[a]);return c.attr({className:a.className,stroke:a.lineColor,strokeWidth:a.lineWidth,fill:a.color,cursor:a.cursor,zIndex:a.zIndex}).css({pointerEvents:"none"})};
q.prototype.getDropValues=function(a,b,c){var d=this,f=d.series,e=p(f.options.dragDrop,d.options.dragDrop),g={},C=a.points[d.id],h;for(h in c)if(Object.hasOwnProperty.call(c,h)){if("undefined"!==typeof l){var l=!1;break}l=!0}m(c,function(a,c){var h=C[c],n=f[a.axis+"Axis"];n=n.toValue((n.horiz?b.chartX:b.chartY)+C[c+"Offset"]);var k=a.axis.toUpperCase(),m=f[k.toLowerCase()+"Axis"].categories?1:0;m=v(e["dragPrecision"+k],m);var p=v(e["dragMin"+k],-Infinity);k=v(e["dragMax"+k],Infinity);m&&(n=Math.round(n/
m)*m);n=T(n,p,k);l&&a.propValidate&&!a.propValidate(n,d)||"undefined"===typeof h||(g[c]=n)});return g};e.Series.prototype.getGuideBox=function(a){var b=this.chart,c=Infinity,d=-Infinity,f=Infinity,e=-Infinity,g;a.forEach(function(a){(a=a.graphic&&a.graphic.getBBox()||a.shapeArgs)&&(a.width||a.height||a.x||a.y)&&(g=!0,c=Math.min(a.x,c),d=Math.max(a.x+a.width,d),f=Math.min(a.y,f),e=Math.max(a.y+a.height,e))});return g?b.renderer.rect(c,f,d-c,e-f):b.renderer.g()};q.prototype.showDragHandles=function(){var a=
this,b=a.series,c=b.chart,d=c.renderer,f=p(b.options.dragDrop,a.options.dragDrop);m(b.dragDropProps,function(e,g){var h=p(V,e.handleOptions,f.dragHandle),l={className:h.className,"stroke-width":h.lineWidth,fill:h.color,stroke:h.lineColor},m=h.pathFormatter||e.handleFormatter,k=e.handlePositioner,n=e.validateIndividualDrag?e.validateIndividualDrag(a):!0;e.resize&&n&&e.resizeSide&&m&&(f["draggable"+e.axis.toUpperCase()]||f[e.optionName])&&!1!==f[e.optionName]&&(c.dragHandles||(c.dragHandles={group:d.g("drag-drop-handles").add(b.markerGroup||
b.group)}),c.dragHandles.point=a.id,k=k(a),l.d=m=m(a),!m||0>k.x||0>k.y||(l.cursor=h.cursor||"x"===e.axis!==!!c.inverted?"ew-resize":"ns-resize",(h=c.dragHandles[e.optionName])||(h=c.dragHandles[e.optionName]=d.path().add(c.dragHandles.group)),h.translate(k.x,k.y).attr(l),x(h.element,["touchstart","mousedown"],function(b){b=w(b,c);var d=a.series.chart;d.zoomOrPanKeyPressed(b)||(d.mouseIsDown=!1,D(b,a),d.dragDropData.updateProp=b.updateProp=g,a.firePointEvent("dragStart",b),b.stopPropagation(),b.preventDefault())}),
t(c.dragHandles.group.element,"mouseover",function(){c.dragDropData=c.dragDropData||{};c.dragDropData.isHoveringHandle=a.id}),x(c.dragHandles.group.element,["touchend","mouseout"],function(){var b=a.series.chart;b.dragDropData&&a.id===b.dragDropData.isHoveringHandle&&delete b.dragDropData.isHoveringHandle;b.hoverPoint||F(a)})))})};e.Chart.prototype.hideDragHandles=function(){this.dragHandles&&(m(this.dragHandles,function(a,b){"group"!==b&&a.destroy&&a.destroy()}),this.dragHandles.group&&this.dragHandles.group.destroy&&
this.dragHandles.group.destroy(),delete this.dragHandles)};t(q,"mouseOver",function(){var a=this;setTimeout(function(){var b=a.series,c=b&&b.chart,d=c&&c.dragDropData,e=c&&c.is3d&&c.is3d();!c||d&&d.isDragging&&d.draggedPastSensitivity||c.isDragDropAnimating||!b.options.dragDrop||e||(c.dragHandles&&c.hideDragHandles(),a.showDragHandles())},12)});t(q,"mouseOut",function(){var a=this;setTimeout(function(){a.series&&F(a)},10)});t(q,"remove",function(){var a=this.series.chart,b=a.dragHandles;b&&b.point===
this.id&&a.hideDragHandles()});e.Chart.prototype.zoomOrPanKeyPressed=function(a){var b=this.userOptions.chart||{},c=b.panKey&&b.panKey+"Key";return a[b.zoomKey&&b.zoomKey+"Key"]||a[c]};t(e.Chart,"render",function(){this.hasAddedDragDropEvents||S(this)})});r(e,"masters/modules/draggable-points.src.js",[],function(){})});
//# sourceMappingURL=draggable-points.js.map