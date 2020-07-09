/*
 Highcharts JS v8.1.2 (2020-07-09)

 Sonification module

 (c) 2012-2019 ystein Moseng

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/sonification",["highcharts"],function(l){b(l);b.Highcharts=l;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function l(d,b,e,p){d.hasOwnProperty(b)||(d[b]=p.apply(null,e))}b=b?b._modules:{};l(b,"modules/sonification/Instrument.js",[b["Core/Globals.js"],b["Core/Utilities.js"]],function(d,b){function e(c){this.init(c)}
var p=b.error,m=b.merge,h=b.pick,y=b.uniqueKey,n={type:"oscillator",playCallbackInterval:20,masterVolume:1,oscillator:{waveformShape:"sine"}};e.prototype.init=function(c){this.initAudioContext()?(this.options=m(n,c),this.id=this.options.id=c&&c.id||y(),this.masterVolume=this.options.masterVolume||0,c=d.audioContext,this.gainNode=c.createGain(),this.setGain(0),(this.panNode=c.createStereoPanner&&c.createStereoPanner())?(this.setPan(0),this.gainNode.connect(this.panNode),this.panNode.connect(c.destination)):
this.gainNode.connect(c.destination),"oscillator"===this.options.type&&this.initOscillator(this.options.oscillator),this.playCallbackTimers=[]):p(29)};e.prototype.copy=function(c){return new e(m(this.options,{id:null},c))};e.prototype.initAudioContext=function(){var c=d.win.AudioContext||d.win.webkitAudioContext,a=!!d.audioContext;return c?(d.audioContext=d.audioContext||new c,!a&&d.audioContext&&"running"===d.audioContext.state&&d.audioContext.suspend(),!!(d.audioContext&&d.audioContext.createOscillator&&
d.audioContext.createGain)):!1};e.prototype.initOscillator=function(c){this.oscillator=d.audioContext.createOscillator();this.oscillator.type=c.waveformShape;this.oscillator.connect(this.gainNode);this.oscillatorStarted=!1};e.prototype.setPan=function(c){this.panNode&&this.panNode.pan.setValueAtTime(c,d.audioContext.currentTime)};e.prototype.setGain=function(c,a){var f=this.gainNode;c*=this.masterVolume;f&&(1.2<c&&(console.warn("Highcharts sonification warning: Volume of instrument set too high."),
c=1.2),a?(f.gain.setValueAtTime(f.gain.value,d.audioContext.currentTime),f.gain.linearRampToValueAtTime(c,d.audioContext.currentTime+a/1E3)):f.gain.setValueAtTime(c,d.audioContext.currentTime))};e.prototype.cancelGainRamp=function(){this.gainNode&&this.gainNode.gain.cancelScheduledValues(0)};e.prototype.setMasterVolume=function(c){this.masterVolume=c||0};e.prototype.getValidFrequency=function(c,a,f){var k=this.options.allowedFrequencies,d=h(f,Infinity),b=h(a,-Infinity);return k&&k.length?k.reduce(function(a,
f){return Math.abs(f-c)<Math.abs(a-c)&&f<d&&f>b?f:a},Infinity):c};e.prototype.clearPlayCallbackTimers=function(){this.playCallbackTimers.forEach(function(c){clearInterval(c)});this.playCallbackTimers=[]};e.prototype.setFrequency=function(c,a){a=a||{};c=this.getValidFrequency(c,a.min,a.max);"oscillator"===this.options.type&&this.oscillatorPlay(c)};e.prototype.oscillatorPlay=function(c){this.oscillatorStarted||(this.oscillator.start(),this.oscillatorStarted=!0);this.oscillator.frequency.setValueAtTime(c,
d.audioContext.currentTime)};e.prototype.preparePlay=function(){this.setGain(.001);"suspended"===d.audioContext.state&&d.audioContext.resume();this.oscillator&&!this.oscillatorStarted&&(this.oscillator.start(),this.oscillatorStarted=!0)};e.prototype.play=function(c){var a=this,f=c.duration||0,k=function(f,b,d){var k=c.duration,e=0,h=a.options.playCallbackInterval;if("function"===typeof f){var m=setInterval(function(){e++;var c=e*h/k;if(1<=c)a[b](f(1),d),clearInterval(m);else a[b](f(c),d)},h);a.playCallbackTimers.push(m)}else a[b](f,
d)};if(a.id)if("suspended"===d.audioContext.state||this.oscillator&&!this.oscillatorStarted)a.preparePlay(),setTimeout(function(){a.play(c)},10);else{a.playCallbackTimers.length&&a.clearPlayCallbackTimers();a.cancelGainRamp();a.stopOscillatorTimeout&&(clearTimeout(a.stopOscillatorTimeout),delete a.stopOscillatorTimeout);a.stopTimeout&&(clearTimeout(a.stopTimeout),delete a.stopTimeout,a.stopCallback&&(a._play=a.play,a.play=function(){},a.stopCallback("cancelled"),a.play=a._play));var b=f<d.sonification.fadeOutDuration+
20;a.stopCallback=c.onEnd;var e=function(){delete a.stopTimeout;a.stop(b)};f?(a.stopTimeout=setTimeout(e,b?f:f-d.sonification.fadeOutDuration),k(c.frequency,"setFrequency",{minFrequency:c.minFrequency,maxFrequency:c.maxFrequency}),k(h(c.volume,1),"setGain",4),k(h(c.pan,0),"setPan")):e()}};e.prototype.mute=function(){this.setGain(.0001,.8*d.sonification.fadeOutDuration)};e.prototype.stop=function(c,a,f){var b=this,e=function(){b.stopOscillatorTimeout&&delete b.stopOscillatorTimeout;try{b.oscillator.stop()}catch(B){}b.oscillator.disconnect(b.gainNode);
b.initOscillator(b.options.oscillator);a&&a(f);b.stopCallback&&b.stopCallback(f)};b.playCallbackTimers.length&&b.clearPlayCallbackTimers();b.stopTimeout&&clearTimeout(b.stopTimeout);c?(b.setGain(0),e()):(b.mute(),b.stopOscillatorTimeout=setTimeout(e,d.sonification.fadeOutDuration+100))};return e});l(b,"modules/sonification/musicalFrequencies.js",[],function(){return[16.351597831287414,17.323914436054505,18.354047994837977,19.445436482630058,20.601722307054366,21.826764464562746,23.12465141947715,
24.499714748859326,25.956543598746574,27.5,29.13523509488062,30.86770632850775,32.70319566257483,34.64782887210901,36.70809598967594,38.890872965260115,41.20344461410875,43.653528929125486,46.2493028389543,48.999429497718666,51.91308719749314,55,58.27047018976124,61.7354126570155,65.40639132514966,69.29565774421802,73.41619197935188,77.78174593052023,82.4068892282175,87.30705785825097,92.4986056779086,97.99885899543733,103.82617439498628,110,116.54094037952248,123.47082531403103,130.8127826502993,
138.59131548843604,146.8323839587038,155.56349186104046,164.81377845643496,174.61411571650194,184.9972113558172,195.99771799087463,207.65234878997256,220,233.08188075904496,246.94165062806206,261.6255653005986,277.1826309768721,293.6647679174076,311.1269837220809,329.6275569128699,349.2282314330039,369.9944227116344,391.99543598174927,415.3046975799451,440,466.1637615180899,493.8833012561241,523.2511306011972,554.3652619537442,587.3295358348151,622.2539674441618,659.2551138257398,698.4564628660078,
739.9888454232688,783.9908719634985,830.6093951598903,880,932.3275230361799,987.7666025122483,1046.5022612023945,1108.7305239074883,1174.6590716696303,1244.5079348883237,1318.5102276514797,1396.9129257320155,1479.9776908465376,1567.981743926997,1661.2187903197805,1760,1864.6550460723597,1975.533205024496,2093.004522404789,2217.4610478149766,2349.31814333926,2489.0158697766474,2637.02045530296,2793.825851464031,2959.955381693075,3135.9634878539946,3322.437580639561,3520,3729.3100921447194,3951.066410048992,
4186.009044809578]});l(b,"modules/sonification/utilities.js",[b["modules/sonification/musicalFrequencies.js"],b["Core/Utilities.js"]],function(b,g){function d(b){this.init(b||[])}var p=g.clamp;d.prototype.init=function(b){this.supportedSignals=b;this.signals={}};d.prototype.registerSignalCallbacks=function(b){var d=this;d.supportedSignals.forEach(function(e){var h=b[e];h&&(d.signals[e]=d.signals[e]||[]).push(h)})};d.prototype.clearSignalCallbacks=function(b){var d=this;b?b.forEach(function(b){d.signals[b]&&
delete d.signals[b]}):d.signals={}};d.prototype.emitSignal=function(b,d){var e;this.signals[b]&&this.signals[b].forEach(function(b){b=b(d);e="undefined"!==typeof b?b:e});return e};return{musicalFrequencies:b,SignalHandler:d,getMusicalScale:function(d){return b.filter(function(b,e){var h=e%12+1;return d.some(function(b){return b===h})})},calculateDataExtremes:function(b,d){return b.series.reduce(function(b,e){e.points.forEach(function(c){c="undefined"!==typeof c[d]?c[d]:c.options[d];b.min=Math.min(b.min,
c);b.max=Math.max(b.max,c)});return b},{min:Infinity,max:-Infinity})},virtualAxisTranslate:function(b,d,e,n){var c=d.max-d.min;b=e.min+Math.abs(e.max-e.min)*(n?d.max-b:b-d.min)/c;return 0<c?p(b,e.min,e.max):e.min}}});l(b,"modules/sonification/instrumentDefinitions.js",[b["modules/sonification/Instrument.js"],b["modules/sonification/utilities.js"]],function(b,g){var d={};["sine","square","triangle","sawtooth"].forEach(function(e){d[e]=new b({oscillator:{waveformShape:e}});d[e+"Musical"]=new b({allowedFrequencies:g.musicalFrequencies,
oscillator:{waveformShape:e}});d[e+"Major"]=new b({allowedFrequencies:g.getMusicalScale([1,3,5,6,8,10,12]),oscillator:{waveformShape:e}})});return d});l(b,"modules/sonification/Earcon.js",[b["Core/Globals.js"],b["Core/Utilities.js"]],function(b,g){function d(b){this.init(b||{})}var p=g.error,m=g.merge,h=g.pick,l=g.uniqueKey;d.prototype.init=function(b){this.options=b;this.options.id||(this.options.id=this.id=l());this.instrumentsPlaying={}};d.prototype.sonify=function(d){var c=m(this.options,d),a=
h(c.volume,1),f=c.pan,e=this,q=d&&d.onEnd,g=e.options.onEnd;c.instruments.forEach(function(d){var c="string"===typeof d.instrument?b.sonification.instruments[d.instrument]:d.instrument,k=m(d.playOptions),n="";if(c&&c.play){if(d.playOptions){k.pan=h(f,k.pan);var x=k.onEnd;k.onEnd=function(){delete e.instrumentsPlaying[n];x&&x.apply(this,arguments);Object.keys(e.instrumentsPlaying).length||(q&&q.apply(this,arguments),g&&g.apply(this,arguments))};d=c.copy();d.setMasterVolume(a);n=d.id;e.instrumentsPlaying[n]=
d;d.play(k)}}else p(30)})};d.prototype.cancelSonify=function(b){var d=this.instrumentsPlaying,a=d&&Object.keys(d);a&&a.length&&(a.forEach(function(a){d[a].stop(!b,null,"cancelled")}),this.instrumentsPlaying={})};return d});l(b,"modules/sonification/pointSonify.js",[b["Core/Globals.js"],b["Core/Utilities.js"],b["modules/sonification/utilities.js"]],function(b,g,e){var d=g.error,m=g.merge,h=g.pick,l={minDuration:20,maxDuration:2E3,minVolume:.1,maxVolume:1,minPan:-1,maxPan:1,minFrequency:220,maxFrequency:2200};
return{pointSonify:function(g){var c,a=this,f=a.series.chart,k=h(g.masterVolume,null===(c=f.options.sonification)||void 0===c?void 0:c.masterVolume),q=g.dataExtremes||{},p=function(b,d,c){if("function"===typeof b)return d?function(d){return b(a,q,d)}:b(a,q);if("string"===typeof b){var f=(d="-"===b.charAt(0))?b.slice(1):b,k=h(a[f],a.options[f]);q[f]=q[f]||e.calculateDataExtremes(a.series.chart,f);return e.virtualAxisTranslate(k,q[f],c,d)}return b};f.sonification.currentlyPlayingPoint=a;a.sonification=
a.sonification||{};a.sonification.instrumentsPlaying=a.sonification.instrumentsPlaying||{};var n=a.sonification.signalHandler=a.sonification.signalHandler||new e.SignalHandler(["onEnd"]);n.clearSignalCallbacks();n.registerSignalCallbacks({onEnd:g.onEnd});!a.isNull&&a.visible&&a.series.visible?g.instruments.forEach(function(c){var e="string"===typeof c.instrument?b.sonification.instruments[c.instrument]:c.instrument,h=c.instrumentMapping||{},g=m(l,c.instrumentOptions),q=e.id,z=function(b){c.onEnd&&
c.onEnd.apply(this,arguments);f.sonification&&f.sonification.currentlyPlayingPoint&&delete f.sonification.currentlyPlayingPoint;a.sonification&&a.sonification.instrumentsPlaying&&(delete a.sonification.instrumentsPlaying[q],Object.keys(a.sonification.instrumentsPlaying).length||n.emitSignal("onEnd",b))};e&&e.play?("undefined"!==typeof k&&e.setMasterVolume(k),a.sonification.instrumentsPlaying[e.id]=e,e.play({frequency:p(h.frequency,!0,{min:g.minFrequency,max:g.maxFrequency}),duration:p(h.duration,
!1,{min:g.minDuration,max:g.maxDuration}),pan:p(h.pan,!0,{min:g.minPan,max:g.maxPan}),volume:p(h.volume,!0,{min:g.minVolume,max:g.maxVolume}),onEnd:z,minFrequency:g.minFrequency,maxFrequency:g.maxFrequency})):d(30)}):n.emitSignal("onEnd")},pointCancelSonify:function(b){var d=this.sonification&&this.sonification.instrumentsPlaying,a=d&&Object.keys(d);a&&a.length&&(a.forEach(function(a){d[a].stop(!b,null,"cancelled")}),this.sonification.instrumentsPlaying={},this.sonification.signalHandler.emitSignal("onEnd",
"cancelled"))}}});l(b,"modules/sonification/chartSonify.js",[b["Core/Globals.js"],b["parts/Point.js"],b["Core/Utilities.js"],b["modules/sonification/utilities.js"]],function(b,g,e,p){function d(b,a){return"function"===typeof a?a(b):v(b[a],b.options[a])}function h(b,a){return b.points.reduce(function(b,c){c=d(c,a);b.min=Math.min(b.min,c);b.max=Math.max(b.max,c);return b},{min:Infinity,max:-Infinity})}function l(b,a,d){var c,f=(a||[]).slice(0);a=null===(c=b.options.sonification)||void 0===c?void 0:
c.defaultInstrumentOptions;var e=function(b){return{instrumentMapping:b.mapping}};a&&f.push(e(a));b.series.forEach(function(b){var a;(b=null===(a=b.options.sonification)||void 0===a?void 0:a.instruments)&&(f=f.concat(b.map(e)))});return f.reduce(function(a,d){Object.keys(d.instrumentMapping||{}).forEach(function(c){c=d.instrumentMapping[c];"string"!==typeof c||a[c]||(a[c]=p.calculateDataExtremes(b,c))});return a},t(d))}function n(a,c){return c.reduce(function(c,d){var f=d.earcon;d.condition?(d=d.condition(a),
d instanceof b.sonification.Earcon?c.push(d):d&&c.push(f)):d.onPoint&&a.id===d.onPoint&&c.push(f);return c},[])}function c(a){return a.map(function(a){var d=a.instrument;d=("string"===typeof d?b.sonification.instruments[d]:d).copy();return t(a,{instrument:d})})}function a(a,b){a.forEach(function(a){a=a.instrument;"string"!==typeof a&&a.setMasterVolume(b)});return a}function f(f,e){var r=e.timeExtremes||h(f,e.pointPlayTime),I=l(f.chart,e.instruments,e.dataExtremes),k=v(e.masterVolume,1),A=c(e.instruments),
q=a(A,k);A=f.points.reduce(function(a,c){var f=n(c,e.earcons||[]),D=p.virtualAxisTranslate(d(c,e.pointPlayTime),r,{min:0,max:e.duration});return a.concat(new b.sonification.TimelineEvent({eventObject:c,time:D,id:c.id,playOptions:{instruments:q,dataExtremes:I,masterVolume:k}}),f.map(function(a){return new b.sonification.TimelineEvent({eventObject:a,time:D,playOptions:{volume:k}})}))},[]);return new b.sonification.TimelinePath({events:A,onStart:function(){if(e.onStart)e.onStart(f)},onEventStart:function(a){var b=
a.options&&a.options.eventObject;if(b instanceof g){if(!b.series.visible&&!b.series.chart.series.some(function(a){return a.visible}))return a.timelinePath.timeline.pause(),a.timelinePath.timeline.resetCursor(),!1;if(e.onPointStart)e.onPointStart(a,b)}},onEventEnd:function(a){var b=a.event&&a.event.options&&a.event.options.eventObject;if(b instanceof g&&e.onPointEnd)e.onPointEnd(a.event,b)},onEnd:function(){if(e.onEnd)e.onEnd(f)}})}function k(a,b,d){var c,f,e,r=d.seriesOptions||{},k=(null===(e=null===
(f=null===(c=a.chart.options.sonification)||void 0===c?void 0:c.defaultInstrumentOptions)||void 0===f?void 0:f.mapping)||void 0===e?void 0:e.pointPlayTime)||"x";c=C(a);return t(c,{dataExtremes:b,timeExtremes:h(a,k),instruments:d.instruments||c.instruments,onStart:d.onSeriesStart||c.onStart,onEnd:d.onSeriesEnd||c.onEnd,earcons:d.earcons||c.earcons,masterVolume:v(d.masterVolume,c.masterVolume)},J(r)?G(r,function(b){return b.id===v(a.id,a.options.id)})||{}:r,{pointPlayTime:k})}function q(a,c,d){if("sequential"===
a||"simultaneous"===a){var f=c.series.reduce(function(a,b){var c;b.visible&&!1!==(null===(c=b.options.sonification)||void 0===c?void 0:c.enabled)&&a.push({series:b,seriesOptions:d(b)});return a},[]);"simultaneous"===a&&(f=[f])}else f=a.reduce(function(a,f){f=u(f).reduce(function(a,f){var e;if("string"===typeof f){var r=c.get(f);r.visible&&(e={series:r,seriesOptions:d(r)})}else f instanceof b.sonification.Earcon&&(e=new b.sonification.TimelinePath({events:[new b.sonification.TimelineEvent({eventObject:f})]}));
f.silentWait&&(e=new b.sonification.TimelinePath({silentWait:f.silentWait}));e&&a.push(e);return a},[]);f.length&&a.push(f);return a},[]);return f}function B(a,c){return c?a.reduce(function(d,f,e){f=u(f);d.push(f);e<a.length-1&&f.some(function(a){return a.series})&&d.push(new b.sonification.TimelinePath({silentWait:c}));return d},[]):a}function w(a){return a.reduce(function(a,b){b=u(b);return a+(1===b.length&&b[0].options&&b[0].options.silentWait||0)},0)}function z(a){var c=a.reduce(function(a,b){(b=
b.events)&&b.length&&(a.min=Math.min(b[0].time,a.min),a.max=Math.max(b[b.length-1].time,a.max));return a},{min:Infinity,max:-Infinity});a.forEach(function(a){var d=a.events,f=d&&d.length,e=[];f&&d[0].time<=c.min||e.push(new b.sonification.TimelineEvent({time:c.min}));f&&d[d.length-1].time>=c.max||e.push(new b.sonification.TimelineEvent({time:c.max}));e.length&&a.addTimelineEvents(e)})}function E(a){return a.reduce(function(a,b){return a+u(b).reduce(function(a,b){return(b=b.series&&b.seriesOptions&&
b.seriesOptions.timeExtremes)?Math.max(a,b.max-b.min):a},0)},0)}function F(a,c){var d=Math.max(c-w(a),0),e=E(a);return a.reduce(function(a,c){c=u(c).reduce(function(a,c){c instanceof b.sonification.TimelinePath?a.push(c):c.series&&(c.seriesOptions.duration=c.seriesOptions.duration||p.virtualAxisTranslate(c.seriesOptions.timeExtremes.max-c.seriesOptions.timeExtremes.min,{min:0,max:e},{min:0,max:d}),a.push(f(c.series,c.seriesOptions)));return a},[]);a.push(c);return a},[])}function x(a,b){var c,d;if(null===
b||void 0===b?0:b.instruments)return b.instruments;var f=(null===(c=a.chart.options.sonification)||void 0===c?void 0:c.defaultInstrumentOptions)||{};return((null===(d=a.options.sonification)||void 0===d?void 0:d.instruments)||[{}]).map(function(a){return{instrument:a.instrument||f.instrument,instrumentOptions:t(f,a,{mapping:void 0,instrument:void 0}),instrumentMapping:t(f.mapping,a.mapping)}})}function C(a){var b,c,d=a.options.sonification||{},f=a.chart.options.sonification||{},e=f.events||{},k=d.events||
{};return{onEnd:k.onSeriesEnd||e.onSeriesEnd,onStart:k.onSeriesStart||e.onSeriesStart,onPointEnd:k.onPointEnd||e.onPointEnd,onPointStart:k.onPointStart||e.onPointStart,pointPlayTime:null===(c=null===(b=f.defaultInstrumentOptions)||void 0===b?void 0:b.mapping)||void 0===c?void 0:c.pointPlayTime,masterVolume:f.masterVolume,instruments:x(a),earcons:d.earcons||f.earcons}}function H(a,b){var c,d,f,e,k;a=a.options.sonification||{};return t({duration:a.duration,afterSeriesWait:a.afterSeriesWait,pointPlayTime:null===
(d=null===(c=a.defaultInstrumentOptions)||void 0===c?void 0:c.mapping)||void 0===d?void 0:d.pointPlayTime,order:a.order,onSeriesStart:null===(f=a.events)||void 0===f?void 0:f.onSeriesStart,onSeriesEnd:null===(e=a.events)||void 0===e?void 0:e.onSeriesEnd,onEnd:null===(k=a.events)||void 0===k?void 0:k.onEnd},b)}"";var G=e.find,J=e.isArray,t=e.merge,v=e.pick,u=e.splat;return{chartSonify:function(a){var c=H(this,a);this.sonification.timeline&&this.sonification.timeline.pause();this.sonification.duration=
c.duration;var d=l(this,c.instruments,c.dataExtremes);a=q(c.order,this,function(a){return k(a,d,c)});a=B(a,c.afterSeriesWait||0);a=F(a,c.duration);a.forEach(function(a){z(a)});this.sonification.timeline=new b.sonification.Timeline({paths:a,onEnd:c.onEnd});this.sonification.timeline.play()},seriesSonify:function(a){var c=this.chart.options.sonification,d=this.options.sonification;a=t({duration:(null===d||void 0===d?void 0:d.duration)||(null===c||void 0===c?void 0:c.duration)},C(this),a);c=f(this,a);
d=this.chart.sonification;d.timeline&&d.timeline.pause();d.duration=a.duration;d.timeline=new b.sonification.Timeline({paths:[c]});d.timeline.play()},pause:function(a){this.sonification.timeline?this.sonification.timeline.pause(v(a,!0)):this.sonification.currentlyPlayingPoint&&this.sonification.currentlyPlayingPoint.cancelSonify(a)},resume:function(a){this.sonification.timeline&&this.sonification.timeline.play(a)},rewind:function(a){this.sonification.timeline&&this.sonification.timeline.rewind(a)},
cancel:function(a){this.pauseSonify(a);this.resetSonifyCursor()},getCurrentPoints:function(){if(this.sonification.timeline){var a=this.sonification.timeline.getCursor();return Object.keys(a).map(function(b){return a[b].eventObject}).filter(function(a){return a instanceof g})}return[]},setCursor:function(a){var b=this.sonification.timeline;b&&u(a).forEach(function(a){b.setCursor(a.id)})},resetCursor:function(){this.sonification.timeline&&this.sonification.timeline.resetCursor()},resetCursorEnd:function(){this.sonification.timeline&&
this.sonification.timeline.resetCursorEnd()}}});l(b,"modules/sonification/Timeline.js",[b["Core/Globals.js"],b["Core/Utilities.js"],b["modules/sonification/utilities.js"]],function(b,g,e){function d(a){this.init(a||{})}function m(a){this.init(a)}function h(a){this.init(a||{})}var l=g.merge,n=g.splat,c=g.uniqueKey;d.prototype.init=function(a){this.options=a;this.time=a.time||0;this.id=this.options.id=a.id||c()};d.prototype.play=function(a){var b=this.options.eventObject,c=this.options.onEnd,d=a&&a.onEnd,
e=this.options.playOptions&&this.options.playOptions.onEnd;a=l(this.options.playOptions,a);b&&b.sonify?(a.onEnd=c||d||e?function(){var a=arguments;[c,d,e].forEach(function(b){b&&b.apply(this,a)})}:void 0,b.sonify(a)):(d&&d(),c&&c())};d.prototype.cancel=function(a){this.options.eventObject.cancelSonify(a)};m.prototype.init=function(a){this.options=a;this.id=this.options.id=a.id||c();this.cursor=0;this.eventsPlaying={};this.events=a.silentWait?[new d({time:0}),new d({time:a.silentWait})]:this.options.events;
this.sortEvents();this.updateEventIdMap();this.signalHandler=new e.SignalHandler(["playOnEnd","masterOnEnd","onStart","onEventStart","onEventEnd"]);this.signalHandler.registerSignalCallbacks(l(a,{masterOnEnd:a.onEnd}))};m.prototype.sortEvents=function(){this.events=this.events.sort(function(a,b){return a.time-b.time})};m.prototype.updateEventIdMap=function(){this.eventIdMap=this.events.reduce(function(a,b,c){a[b.id]=c;return a},{})};m.prototype.addTimelineEvents=function(a){this.events=this.events.concat(a);
this.sortEvents();this.updateEventIdMap()};m.prototype.getCursor=function(){return this.events[this.cursor]};m.prototype.setCursor=function(a){a=this.eventIdMap[a];return"undefined"!==typeof a?(this.cursor=a,!0):!1};m.prototype.play=function(a){this.pause();this.signalHandler.emitSignal("onStart");this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playEvents(1)};m.prototype.rewind=function(a){this.pause();this.signalHandler.emitSignal("onStart");
this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playEvents(-1)};m.prototype.resetCursor=function(){this.cursor=0};m.prototype.resetCursorEnd=function(){this.cursor=this.events.length-1};m.prototype.pause=function(a){var b=this;clearTimeout(b.nextScheduledPlay);Object.keys(b.eventsPlaying).forEach(function(c){b.eventsPlaying[c]&&b.eventsPlaying[c].cancel(a)});b.eventsPlaying={}};m.prototype.playEvents=function(a){var b=this,c=b.events[this.cursor],
d=b.events[this.cursor+a],e=function(a){b.signalHandler.emitSignal("masterOnEnd",a);b.signalHandler.emitSignal("playOnEnd",a)};c.timelinePath=b;if(!1===b.signalHandler.emitSignal("onEventStart",c))e({event:c,cancelled:!0});else if(b.eventsPlaying[c.id]=c,c.play({onEnd:function(a){a={event:c,cancelled:!!a};delete b.eventsPlaying[c.id];b.signalHandler.emitSignal("onEventEnd",a);d||e(a)}}),d){var g=Math.abs(d.time-c.time);1>g?(b.cursor+=a,b.playEvents(a)):this.nextScheduledPlay=setTimeout(function(){b.cursor+=
a;b.playEvents(a)},g)}};h.prototype.init=function(a){this.options=a;this.cursor=0;this.paths=a.paths;this.pathsPlaying={};this.signalHandler=new e.SignalHandler(["playOnEnd","masterOnEnd","onPathStart","onPathEnd"]);this.signalHandler.registerSignalCallbacks(l(a,{masterOnEnd:a.onEnd}))};h.prototype.play=function(a){this.pause();this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playPaths(1)};h.prototype.rewind=function(a){this.pause();
this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playPaths(-1)};h.prototype.playPaths=function(a){var c=n(this.paths[this.cursor]),d=this.paths[this.cursor+a],e=this,g=this.signalHandler,h=0,m=function(b){g.emitSignal("onPathStart",b);e.pathsPlaying[b.id]=b;b[0<a?"play":"rewind"](function(f){f=f&&f.cancelled;var k={path:b,cancelled:f};delete e.pathsPlaying[b.id];g.emitSignal("onPathEnd",k);h++;h>=c.length&&(d&&!f?(e.cursor+=a,n(d).forEach(function(b){b[0<
a?"resetCursor":"resetCursorEnd"]()}),e.playPaths(a)):(g.emitSignal("playOnEnd",k),g.emitSignal("masterOnEnd",k)))})};c.forEach(function(a){a&&(a.timeline=e,setTimeout(function(){m(a)},b.sonification.fadeOutDuration))})};h.prototype.pause=function(a){var b=this;Object.keys(b.pathsPlaying).forEach(function(c){b.pathsPlaying[c]&&b.pathsPlaying[c].pause(a)});b.pathsPlaying={}};h.prototype.resetCursor=function(){this.paths.forEach(function(a){n(a).forEach(function(a){a.resetCursor()})});this.cursor=0};
h.prototype.resetCursorEnd=function(){this.paths.forEach(function(a){n(a).forEach(function(a){a.resetCursorEnd()})});this.cursor=this.paths.length-1};h.prototype.setCursor=function(a){return this.paths.some(function(b){return n(b).some(function(b){return b.setCursor(a)})})};h.prototype.getCursor=function(){return this.getCurrentPlayingPaths().reduce(function(a,b){a[b.id]=b.getCursor();return a},{})};h.prototype.atStart=function(){return!this.getCurrentPlayingPaths().some(function(a){return a.cursor})};
h.prototype.getCurrentPlayingPaths=function(){return n(this.paths[this.cursor])};return{TimelineEvent:d,TimelinePath:m,Timeline:h}});l(b,"modules/sonification/options.js",[],function(){return{sonification:{enabled:!1,duration:2E3,afterSeriesWait:900,masterVolume:1,order:"sequential",defaultInstrumentOptions:{instrument:"sineMusical",minFrequency:392,maxFrequency:1046,mapping:{pointPlayTime:"x",duration:400,frequency:"y"}}}}});l(b,"modules/sonification/sonification.js",[b["Core/Globals.js"],b["Core/Options.js"],
b["parts/Point.js"],b["Core/Utilities.js"],b["modules/sonification/Instrument.js"],b["modules/sonification/instrumentDefinitions.js"],b["modules/sonification/Earcon.js"],b["modules/sonification/pointSonify.js"],b["modules/sonification/chartSonify.js"],b["modules/sonification/utilities.js"],b["modules/sonification/Timeline.js"],b["modules/sonification/options.js"]],function(b,g,e,l,m,h,y,n,c,a,f,k){g=g.defaultOptions;var d=l.addEvent,p=l.extend,w=l.merge;b.sonification={fadeOutDuration:20,utilities:a,
Instrument:m,instruments:h,Earcon:y,TimelineEvent:f.TimelineEvent,TimelinePath:f.TimelinePath,Timeline:f.Timeline};w(!0,g,k);e.prototype.sonify=n.pointSonify;e.prototype.cancelSonify=n.pointCancelSonify;b.Series.prototype.sonify=c.seriesSonify;p(b.Chart.prototype,{sonify:c.chartSonify,pauseSonify:c.pause,resumeSonify:c.resume,rewindSonify:c.rewind,cancelSonify:c.cancel,getCurrentSonifyPoints:c.getCurrentPoints,setSonifyCursor:c.setCursor,resetSonifyCursor:c.resetCursor,resetSonifyCursorEnd:c.resetCursorEnd});
d(b.Chart,"init",function(){this.sonification={}});d(b.Chart,"update",function(a){(a=a.options.sonification)&&w(!0,this.options.sonification,a)})});l(b,"masters/modules/sonification.src.js",[],function(){})});
//# sourceMappingURL=sonification.js.map