(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{X3Nw:function(t,s,i){},gqvv:function(t,s,i){"use strict";i.r(s);var a={name:"zoomControl",props:{position:{type:String,default:""},map:{type:Object,default:()=>({})},mapOptions:{type:Object,default:()=>({})}},data:()=>({disabledIn:!1,disabledOut:!1}),computed:{},methods:{zoomIn(){this.disabledIn||(this._log("map start zoomIn..."),this.map.zoomIn()),this.judge()},zoomOut(){this.disabledOut||(this._log("map start zoomOut..."),this.map.zoomOut()),this.judge()},judge(){const t=this.map.getZoom();t>=this.mapOptions.maxZoom?(this.disabledIn=!0,this.disabledOut=!1):t<=this.mapOptions.minZoom?(this.disabledIn=!1,this.disabledOut=!0):(this.disabledIn=!1,this.disabledOut=!1)}}},o=(i("q9Md"),i("KHd+")),e=Object(o.a)(a,function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"zoom-panel"},[s("div",{staticClass:"bar-item bar-btn bar-zoom-plus richway-touch-btn"},[s("i",{staticClass:"richway-icon icon-plus",class:{disabled:this.disabledIn},on:{click:this.zoomIn}})]),this._v(" "),s("div",{staticClass:"bar-item bar-btn bar-zoom-reduce richway-touch-btn"},[s("i",{staticClass:"richway-icon icon-reduce",class:{disabled:this.disabledOut},on:{click:this.zoomOut}})])])},[],!1,null,"790ae3e8",null);e.options.__file="zoom.vue";s.default=e.exports},q9Md:function(t,s,i){"use strict";var a=i("X3Nw");i.n(a).a}}]);