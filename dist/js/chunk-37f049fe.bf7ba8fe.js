(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37f049fe"],{"35ea":function(e,t,n){},"3db0":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"loaderMesh-container"},[n("drag-plane",{attrs:{amount:2,width:"100%",height:e.height+"px",showDragsign:!1},scopedSlots:e._u([{key:"view1",fn:function(){return[n("collapse-layout",{attrs:{icon:"#iconkucunfenxi",label:"导入模型"},scopedSlots:e._u([{key:"container",fn:function(){return[n("div",{staticClass:"model-generate"},[n("el-input",{attrs:{size:"mini",placeholder:"输入需要导入的模型http地址"},model:{value:e.modelAddress,callback:function(t){e.modelAddress=t},expression:"modelAddress"}}),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.loadModel}},[e._v(" 导入 ")])],1)]},proxy:!0}])})]},proxy:!0},{key:"view2",fn:function(){return[n("collapse-layout",{attrs:{icon:"#iconkucunfenxi",label:"几何配置"},scopedSlots:e._u([{key:"container",fn:function(){return[n("geometry-setting-module")]},proxy:!0}])}),n("collapse-layout",{attrs:{icon:"#iconkucunfenxi",label:"变换配置"},scopedSlots:e._u([{key:"container",fn:function(){return[n("basic-transform-model")]},proxy:!0}])})]},proxy:!0}])})],1)},r=[],a=(n("d3b7"),n("3ca3"),n("ddb0"),n("a9e3"),n("159b"),n("6fab")),i=n("597a"),c=n("35bb"),s=n("2209"),l=n("ec26"),d=function(){return n.e("chunk-a73f6972").then(n.bind(null,"06c9"))},u=function(){return n.e("chunk-83f1e74e").then(n.bind(null,"5dea"))},f={components:{dragPlane:a["a"],collapseLayout:i["a"],basicTransformModel:d,geometrySettingModule:u},props:{height:{type:Number}},data:function(){return{modelAddress:""}},methods:{loadModel:function(){var e=this;c["a"].load({assets:[this.modelAddress]},(function(t){var n={model:{},geometry:{}},o=t.structureMap.get(e.modelAddress),r=t.configMap,a=function t(o){if("Mesh"===o.type){var a=Object(s["r"])("Model",{vid:Object(l["a"])()});if(o.geometry){var i=Object(s["r"])("LoadGeometry",Object.assign({},r.get(o.geometry),{vid:Object(l["a"])(),url:o.geometry}));a.geometry=i.vid,n.model[a.vid]=a,n.geometry[i.vid]=i,e.$store.commit("geometry/add",i),e.$store.commit("model/add",a)}}o.children&&o.children.length&&o.children.forEach((function(e){t(e)}))};a(o)}))}},created:function(){}},m=f,p=(n("73f1"),n("2877")),y=Object(p["a"])(m,o,r,!1,null,"034c1619",null);t["default"]=y.exports},"73f1":function(e,t,n){"use strict";n("35ea")}}]);