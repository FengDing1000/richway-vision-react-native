(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"9qON":function(t,e,i){"use strict";var a=i("d1Jq");i.n(a).a},IqV1:function(t,e,i){"use strict";i.d(e,"b",function(){return a}),i.d(e,"a",function(){return s});var a=[{code:"OVERFLZ",title:"超汛限",color:"#008000"},{code:"OVERDSFLZ",title:"超设计",color:"#ff9900"},{code:"OVERCKFLZ",title:"超校核",color:"#ff0000"},{code:"NORMAL",title:"水库"}],s=[{code:"0",title:"0",color:"#fff"},{code:"0.1_10",title:"0.1-10",color:"rgba(151,242,151, 1)"},{code:"10_25",title:"10-25",color:"rgba(61,206,61, 1)"},{code:"25_50",title:"25-50",color:"rgba(106, 206, 242, 1)"},{code:"50_100",title:"50-100",color:"rgba(106,206,242, 1)"},{code:"100_250",title:"100-250",color:"rgba(242,16,242, 1)"},{code:"250",title:">250",color:"rgba(160,16,61, 1)"}]},NmCb:function(t,e,i){"use strict";i.r(e);var a=i("P2sY"),s=i.n(a),r=i("FyfS"),n=i.n(r),o=i("QbLZ"),c=i.n(o),l=i("vDqi"),u=i.n(l),p=i("IqV1"),d=i("WIBD").mapState,h={name:"worker",components:{},props:{map:{type:Object,default:function(){return{}}}},data:function(){return{setTimeOutId:null,source:null,ruleForm:{detectionType:"reservoir"},reservoirTypeListByColor:p.b,workTypeList:[],workList:[],filterInfo:{},filterDataList:[],tableDataList:[],tableRows:20,tablePage:0}},computed:c()({},d(["rem"])),mounted:function(){this._log("monitorGzshzh work has mounted"),this.currentRegionInfo=(window._RichWay.$map||{}).currentRegionInfo||{},this.handleSearch()},activated:function(){this._log("work: activated"),this.createWorkSiteMarker(),this.setTimeOutSearch()},deactivated:function(){this._log("work: deactivated"),this.cancelSearch(),this.clearWorkSiteMarker(),clearTimeout(this.setTimeOutId)},methods:{setTimeOutSearch:function(){var t=this;this.setTimeOutId=setTimeout(function(){t.handleSearch()},18e4)},cancelSearch:function(){"function"==typeof(this.source||{}).cancel&&this.source.cancel()},handleSearch:function(){var t=this;this.cancelSearch(),this.$nextTick(function(){var e={};t.workList=[],t.filterDataList=[],t.tableDataList=[];var i=u.a.CancelToken;t.source=i.source(),e.cancelToken=t.source.token,t.$getData.GetWorkAllMonitor(e).then(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.workList=e.data||[]}).always(function(){t.filterDataListFun(),t.setTimeOutSearch()})})},filterDataListFun:function(){this.filterDataList=[];var t=this.workList,e=Array.isArray(t),i=0;for(t=e?t:n()(t);;){var a;if(e){if(i>=t.length)break;a=t[i++]}else{if((i=t.next()).done)break;a=i.value}var s=a;((s.RES_NAME||"").indexOf(this.filterInfo.siteName)>-1||!this.filterInfo.siteName)&&this.filterDataList.push(s)}this.createWorkSiteMarker(),this.tablePage=0},getSiteType:function(t){return this.reservoirTypeListByColor.find(function(e){return(t||"").toUpperCase()===e.code})},createWorkSiteMarker:function(){var t=this;this.clearWorkSiteMarker();var e=[],i=this.filterDataList,a=Array.isArray(i),r=0;for(i=a?i:n()(i);;){var o;if(a){if(r>=i.length)break;o=i[r++]}else{if((r=i.next()).done)break;o=r.value}var c=o,l="";"reservoir"===this.ruleForm.detectionType&&(l=c.overGrz>0?this.getSiteType("overGrz"):c.overWrz>0?this.getSiteType("overWrz"):this.getSiteType("NORMAL")),c.options=s()({bindPopup:!0,clickFun:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments[1];t._log("1111",e,i),t.showMarkerDetail(e,i)}},l),c.lttd=c.LOW_LEFT_LAT,c.lgtd=c.LOW_LEFT_LONG,e.push(c)}this.$mapLayersFun.MapBusinessLayersReservoirSiteBroadcastFun(e)},clearWorkSiteMarker:function(){this.$mapLayersFun.MapBusinessLayersReservoirSiteBroadcastFun([])},showMarkerDetail:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments[1];this.$getData.GetWorkAllMonitor({pid:e.PID}).then(function(){var e,a={},s=[];"object"==typeof a&&(s.push('<div class="panel-header">'+(a.name||"--")+"</div>"),s.push('<ul class="panel-content richway-clear">'),s.push('<li><div><span class="left">所属乡镇：</span><span class="right">'+(a.name||"--")+'</span></div><div><span class="left">所属小流域：</span><span class="right">效那马家小流域</span></div></li>'),s.push('<li><div><span class="left">影响户数(户)：</span><span class="right">'+(a.etCount||"--")+'</span></div><div><span class="left">影响人口(人)：</span><span class="right">'+(a.ptCount||"--")+"</span></div></li>"),s.push('<li><div><span class="left">防汛责任人：</span><span class="right">'+(a.name||"--")+'</span></div><div><span class="left">关联测站：</span><span class="right">乐望站</span></div></li>'),s.push('<li><div><span class="left">防洪能力：</span><span class="right">'+(a.fhnl||"--")+'</span></div><div><span class="left">成灾水位：</span><span class="right">'+(a.ccz||"--")+"m</span></div></li>"),s.push('<li><div class="footer"><span class="left">相关图集：</span><span class="right" onclick="window._Subscribe.create(`'+t.imgBroadcastKey+"`).trigger(`data`, `"+(a.fhxzPic||"1.jpg")+'`);">防洪现状图</span><span class="right" onclick="window._Subscribe.create(`'+t.imgBroadcastKey+"`).trigger(`data`, `"+(a.danadPic||"2.jpg")+'`);">危险区示意图</span></div></li>'),s.push("</ul>")),e='<div class="danad-detail-panel">'+s.join("")+"</div>",i.setContent(e)})}}},f=(i("9qON"),i("KHd+")),v=Object(f.a)(h,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"worker-panel"},t._l(10,function(e){return i("p",{key:e},[t._v("这里是worker")])}))},[],!1,null,null,null);v.options.__file="index.vue";e.default=v.exports},d1Jq:function(t,e,i){}}]);