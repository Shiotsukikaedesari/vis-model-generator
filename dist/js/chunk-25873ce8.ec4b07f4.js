(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25873ce8"],{"0189":function(t,e,n){"use strict";n("91e3")},"12a2":function(t,e,n){},"695f":function(t,e,n){"use strict";n("12a2")},"91e3":function(t,e,n){},c766:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"texture-container"},[n("drag-plane",{attrs:{amount:2,width:"100%",height:t.height+"px",showDragsign:!1},scopedSlots:t._u([{key:"view1",fn:function(){return[n("div",{staticClass:"box-header"},[n("el-input",{attrs:{size:"mini","prefix-icon":"el-icon-search",placeholder:"贴图筛选"}}),n("el-dropdown",{attrs:{trigger:"click"},on:{command:t.addtexture}},[n("el-button",{attrs:{size:"mini",icon:"el-icon-circle-plus-outline",type:"primary"}},[t._v(" 添加贴图 ")]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.texture,(function(e,o){return n("el-dropdown-item",{key:o,attrs:{command:e},domProps:{textContent:t._s(e.label)}})})),1)],1)],1),n("div",{staticClass:"box-container"},[n("div",{staticClass:"texture-main"},t._l(t.textureList,(function(e,o){return n("div",{key:o,staticClass:"texture-elem"},[n("div",{ref:e.vid,refInFor:!0,staticClass:"render-box",class:{active:t.active.vid===e.vid},attrs:{id:e.vid},on:{click:function(){t.$store.commit("texture/setCurrentTexture",e.vid)}}}),n("div",{directives:[{name:"tooltip",rawName:"v-tooltip.top",value:"删除",expression:"'删除'",modifiers:{top:!0}}],staticClass:"operate-box"},[n("vis-icon",{attrs:{code:"#iconshanchu"}})],1),n("div",{directives:[{name:"tooltip",rawName:"v-tooltip.bottom",value:e.vid,expression:"item.vid",modifiers:{bottom:!0}}],staticClass:"element-title",domProps:{textContent:t._s(e.vid)}})])})),0)])]},proxy:!0},{key:"view2",fn:function(){return[n("texture-setting-module")]},proxy:!0}])})],1)},r=[],i=(n("a9e3"),n("6fab")),a=n("35bb"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.config?n("div",{staticClass:"textureSettingModule-container"},[n("collapse-layout",{attrs:{label:"贴图",icon:"#icontietushezhi",arrowPosition:"left"},scopedSlots:t._u([{key:"container",fn:function(){return[n("vis-controller-input",{attrs:{label:"名称"},model:{value:t.config.vid,callback:function(e){t.$set(t.config,"vid",e)},expression:"config.vid"}}),n("vis-controller-input",{attrs:{label:"类型",disabled:""},model:{value:t.config.type,callback:function(e){t.$set(t.config,"type",e)},expression:"config.type"}})]},proxy:!0}],null,!1,2916784630)}),n("collapse-layout",{attrs:{label:"基础设置",icon:"#iconshezhi",arrowPosition:"left"},scopedSlots:t._u([{key:"container",fn:function(){return[n("vis-controller-number",{attrs:{label:"旋转",step:1,dragMultply:3,min:0,max:360,unit:"°",displayAccuracy:0},model:{value:t.rotation,callback:function(e){t.rotation=e},expression:"rotation"}}),n("vis-controller-number",{attrs:{label:"中心点x",step:.01,dragMultply:3,displayAccuracy:2},model:{value:t.config.center.x,callback:function(e){t.$set(t.config.center,"x",e)},expression:"config.center.x"}}),n("vis-controller-number",{attrs:{label:"中心点y",step:.01,dragMultply:3,displayAccuracy:2},model:{value:t.config.center.y,callback:function(e){t.$set(t.config.center,"y",e)},expression:"config.center.y"}}),n("vis-controller-select",{attrs:{label:"x包裹",options:t.warp},model:{value:t.config.wrapS,callback:function(e){t.$set(t.config,"wrapS",e)},expression:"config.wrapS"}}),t.config.wrapS!==t.warp[0].value?n("vis-controller-number",{attrs:{label:"x重复",step:1,min:1,dragMultply:2},model:{value:t.config.repeat.x,callback:function(e){t.$set(t.config.repeat,"x",e)},expression:"config.repeat.x"}}):t._e(),n("vis-controller-select",{attrs:{label:"y包裹",options:t.warp},model:{value:t.config.wrapT,callback:function(e){t.$set(t.config,"wrapT",e)},expression:"config.wrapT"}}),t.config.wrapS!==t.warp[0].value?n("vis-controller-number",{attrs:{label:"y重复",step:1,min:1,dragMultply:2},model:{value:t.config.repeat.y,callback:function(e){t.$set(t.config.repeat,"y",e)},expression:"config.repeat.y"}}):t._e(),n("vis-controller-number",{attrs:{label:"x偏移",step:.01,min:0,max:1,dragMultply:3,displayAccuracy:2},model:{value:t.config.offset.x,callback:function(e){t.$set(t.config.offset,"x",e)},expression:"config.offset.x"}}),n("vis-controller-number",{attrs:{label:"y偏移",step:.01,min:0,max:1,dragMultply:3,displayAccuracy:2},model:{value:t.config.offset.y,callback:function(e){t.$set(t.config.offset,"y",e)},expression:"config.offset.y"}})]},proxy:!0}],null,!1,3141550096)}),n(t.type,{tag:"components",attrs:{config:t.config}})],1):t._e()},l=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ImageTexture-container"})},u=[],p={props:{config:{type:Object,required:!0}},computed:{}},f=p,d=n("2877"),m=Object(d["a"])(f,s,u,!1,null,"0fea0e04",null),x=m.exports,v=n("597a"),g=n("5a89"),b={components:{collapseLayout:v["a"],ImageTexture:x},data:function(){return{warp:[{label:"末尾延展",value:g["a"]},{label:"重复覆盖",value:g["d"]},{label:"镜像覆盖",value:g["c"]}]}},computed:{config:function(){return this.$store.getters["texture/currentTexture"]},type:function(){return!!this.config&&this.config.type},rotation:{get:function(){return 180*this.config.rotation/Math.PI},set:function(t){this.config.rotation=t*Math.PI/180}}},methods:{}},y=b,h=(n("0189"),Object(d["a"])(y,c,l,!1,null,"39267fbf",null)),w=h.exports,k=n("fe9e"),$=n("ec26"),M={components:{dragPlane:i["a"],textureSettingModule:w},props:{height:{type:Number}},data:function(){return{texture:[{icon:"#icontexture",label:"图片贴图",texture:k["a"].IMAGETEXTURE}],displayerMap:{},watchMap:{}}},computed:{textureList:function(){return this.$store.getters["texture/get"]},active:function(){return this.$store.getters["texture/currentTexture"]}},methods:{addtexture:function(t){var e=this;this.$prompt("输入贴图http资源地址：","".concat(t.label),{confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(n){var o=n.value;a["a"].loadConfig({assets:[o]},(function(n){var r=Object(k["n"])(t.texture,{vid:Object($["a"])(),url:o});e.$store.commit("texture/add",r),e.$nextTick((function(){var t=r.vid;if(!e.$refs[t])return console.error("can not found this dom: '".concat(t,"'")),!1;var n=new k["m"]({dom:e.$refs[t][0],texture:a["a"].compilerManager.getTexture(t)});n.render(),e.displayerMap[t]=n,e.watchMap[t]=e.$watch((function(){return this.textureList[t]}),(function(n){e.displayerMap[t].render()}),{deep:!0})}))}))}))}}},_=M,C=(n("695f"),Object(d["a"])(_,o,r,!1,null,"3d250d4a",null));e["default"]=C.exports}}]);