(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40d6be3a"],{"01fa":function(e,l,n){"use strict";n.r(l);var a=function(){var e=this,l=e.$createElement,n=e._self._c||l;return n("div",{staticClass:"materialSettingModule-container"},[n("collapse-layout",{attrs:{label:"基础设置",icon:"#iconshezhi",arrowPosition:"left"},scopedSlots:e._u([{key:"container",fn:function(){return[n("vis-controller-switch",{attrs:{label:"线框化"},model:{value:e.config.wireframe,callback:function(l){e.$set(e.config,"wireframe",l)},expression:"config.wireframe"}}),n("vis-controller-switch",{attrs:{label:"透明度"},model:{value:e.config.transparent,callback:function(l){e.$set(e.config,"transparent",l)},expression:"config.transparent"}}),n("vis-controller-number",{attrs:{label:"透明程度",step:.01,dragMultply:3,min:0,max:1,displayAccuracy:2},model:{value:e.config.opacity,callback:function(l){e.$set(e.config,"opacity",l)},expression:"config.opacity"}}),n("vis-controller-picker",{attrs:{label:"材质颜色"},model:{value:e.config.color,callback:function(l){e.$set(e.config,"color",l)},expression:"config.color"}}),n("vis-controller-picker",{attrs:{label:"反光颜色"},model:{value:e.config.emissive,callback:function(l){e.$set(e.config,"emissive",l)},expression:"config.emissive"}}),n("vis-controller-number",{attrs:{label:"反光强度",step:.01,dragMultply:3,min:0,displayAccuracy:2},model:{value:e.config.emissiveIntensity,callback:function(l){e.$set(e.config,"emissiveIntensity",l)},expression:"config.emissiveIntensity"}}),n("vis-controller-number",{attrs:{label:"金属度",step:.01,dragMultply:3,min:0,max:1,displayAccuracy:2},model:{value:e.config.metalness,callback:function(l){e.$set(e.config,"metalness",l)},expression:"config.metalness"}}),n("vis-controller-number",{attrs:{label:"粗糙度",step:.01,dragMultply:3,min:0,max:1,displayAccuracy:2},model:{value:e.config.roughness,callback:function(l){e.$set(e.config,"roughness",l)},expression:"config.roughness"}}),n("vis-controller-number",{attrs:{label:"环境遮挡",step:.01,dragMultply:3,min:0,displayAccuracy:2},model:{value:e.config.aoMapIntensity,callback:function(l){e.$set(e.config,"aoMapIntensity",l)},expression:"config.aoMapIntensity"}}),n("vis-controller-number",{attrs:{label:"环境反射",step:.01,dragMultply:3,min:0,displayAccuracy:2},model:{value:e.config.envMapIntensity,callback:function(l){e.$set(e.config,"envMapIntensity",l)},expression:"config.envMapIntensity"}})]},proxy:!0}])}),n("collapse-layout",{attrs:{label:"贴图设置",icon:"#icontexture",arrowPosition:"left"},scopedSlots:e._u([{key:"container",fn:function(){return[n("vis-controller-select",{attrs:{label:"表面贴图",options:e.textureList,prop:{label:"name",value:"vid"}},model:{value:e.config.map,callback:function(l){e.$set(e.config,"map",l)},expression:"config.map"}}),n("vis-controller-select",{attrs:{label:"反光贴图",options:e.textureList,prop:{label:"name",value:"vid"}},model:{value:e.config.emissiveMap,callback:function(l){e.$set(e.config,"emissiveMap",l)},expression:"config.emissiveMap"}}),n("vis-controller-select",{attrs:{label:"透明贴图",options:e.textureList,prop:{label:"name",value:"vid"}},model:{value:e.config.alphaMap,callback:function(l){e.$set(e.config,"alphaMap",l)},expression:"config.alphaMap"}}),n("vis-controller-select",{attrs:{label:"金属贴图",options:e.textureList,prop:{label:"name",value:"vid"}},model:{value:e.config.metalnessMap,callback:function(l){e.$set(e.config,"metalnessMap",l)},expression:"config.metalnessMap"}}),n("vis-controller-select",{attrs:{label:"粗糙贴图",options:e.textureList,prop:{label:"name",value:"vid"}},model:{value:e.config.roughnessMap,callback:function(l){e.$set(e.config,"roughnessMap",l)},expression:"config.roughnessMap"}}),n("vis-controller-select",{attrs:{label:"凹凸贴图",options:e.textureList,prop:{label:"name",value:"vid"}},model:{value:e.config.bumpMap,callback:function(l){e.$set(e.config,"bumpMap",l)},expression:"config.bumpMap"}}),e.config.displacementMap?n("vis-controller-number",{attrs:{label:"凹凸程度",step:.01,dragMultply:3,min:0,displayAccuracy:2},model:{value:e.config.bumpScale,callback:function(l){e.$set(e.config,"bumpScale",l)},expression:"config.bumpScale"}}):e._e(),n("vis-controller-select",{attrs:{keyframe:!0,label:"位移贴图",options:e.textureList,prop:{label:"name",value:"vid"}},model:{value:e.config.displacementMap,callback:function(l){e.$set(e.config,"displacementMap",l)},expression:"config.displacementMap"}}),e.config.displacementMap?n("vis-controller-number",{attrs:{label:"位移程度",step:.01,dragMultply:3,min:0,displayAccuracy:2},model:{value:e.config.displacementScale,callback:function(l){e.$set(e.config,"displacementScale",l)},expression:"config.displacementScale"}}):e._e(),e.config.displacementMap?n("vis-controller-number",{attrs:{label:"偏移量",step:.01,dragMultply:3,min:0,displayAccuracy:2},model:{value:e.config.displacementBias,callback:function(l){e.$set(e.config,"displacementBias",l)},expression:"config.displacementBias"}}):e._e(),n("vis-controller-select",{attrs:{keyframe:!0,label:"法线贴图",options:e.textureList,prop:{label:"name",value:"vid"}},model:{value:e.config.normalMap,callback:function(l){e.$set(e.config,"normalMap",l)},expression:"config.normalMap"}})]},proxy:!0}])})],1)},t=[],o=(n("d3b7"),n("159b"),n("b64b"),n("597a")),i={components:{collapseLayout:o["a"]},props:{config:{type:Object,required:!0}},computed:{textureList:function(){var e=[{name:"无",vid:""}],l=this.$store.getters["texture/get"];return Object.keys(l).forEach((function(l){e.push({vid:l,name:l})})),e}}},s=i,c=(n("7beb"),n("2877")),r=Object(c["a"])(s,a,t,!1,null,"db7aaee4",null);l["default"]=r.exports},"7beb":function(e,l,n){"use strict";n("adc5")},adc5:function(e,l,n){}}]);