(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-228d6b24"],{"2fdd":function(t,e,s){"use strict";s("9305")},"35ea":function(t,e,s){},"3db0":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"loaderMesh-container"},[s("drag-plane",{attrs:{amount:2,width:"100%",height:t.height+"px",showDragsign:!1},scopedSlots:t._u([{key:"view1",fn:function(){return[s("collapse-layout",{attrs:{icon:"#iconkucunfenxi",label:"导入模型"},scopedSlots:t._u([{key:"container",fn:function(){return[s("div",{staticClass:"model-generate"},[s("el-input",{attrs:{size:"mini",placeholder:"输入需要导入的模型http地址"},model:{value:t.modelAddress,callback:function(e){t.modelAddress=e},expression:"modelAddress"}}),s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.loadModel}},[t._v(" 导入 ")])],1)]},proxy:!0}])})]},proxy:!0},{key:"view2",fn:function(){return[s("collapse-layout",{attrs:{icon:"#iconkucunfenxi",label:"几何配置"},scopedSlots:t._u([{key:"container",fn:function(){return[s("geometry-setting-module")]},proxy:!0}])}),s("collapse-layout",{attrs:{icon:"#iconkucunfenxi",label:"变换配置"},scopedSlots:t._u([{key:"container",fn:function(){return[s("basic-transform-model")]},proxy:!0}])})]},proxy:!0}])})],1)},o=[],n=(s("d3b7"),s("3ca3"),s("ddb0"),s("a9e3"),s("159b"),s("6fab")),a=s("597a"),r=s("35bb"),l=s("fe9e"),c=s("ec26"),h=function(){return s.e("chunk-a73f6972").then(s.bind(null,"06c9"))},d=function(){return s.e("chunk-83f1e74e").then(s.bind(null,"5dea"))},u={components:{dragPlane:n["a"],collapseLayout:a["a"],basicTransformModel:h,geometrySettingModule:d},props:{height:{type:Number}},data:function(){return{modelAddress:""}},methods:{loadModel:function(){var t=this;r["a"].load({assets:[this.modelAddress]},(function(e){var s={model:{},geometry:{}},i=e.structureMap.get(t.modelAddress),o=e.configMap,n=function e(i){if("Mesh"===i.type){var n=Object(l["r"])("Model",{vid:Object(c["a"])()});if(i.geometry){var a=Object(l["r"])("LoadGeometry",Object.assign({},o.get(i.geometry),{vid:Object(c["a"])(),url:i.geometry}));n.geometry=a.vid,s.model[n.vid]=n,s.geometry[a.vid]=a,t.$store.commit("geometry/add",a),t.$store.commit("model/add",n)}}i.children&&i.children.length&&i.children.forEach((function(t){e(t)}))};n(i)}))}},created:function(){}},f=u,g=(s("73f1"),s("2877")),p=Object(g["a"])(f,i,o,!1,null,"034c1619",null);e["default"]=p.exports},"597a":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"collapseLayout-container"},[s("div",{staticClass:"collapseLayout-title",on:{click:t.toggle}},["left"===t.arrowPosition?s("vis-icon",{class:{"icon-open":!t.showCollapse},staticStyle:{"margin-right":"5px"},attrs:{code:"#iconjian"}}):t._e(),s("div",{staticClass:"title-box"},[t.showIcon?s("vis-icon",{attrs:{code:t.icon}}):t._e(),s("span",{domProps:{textContent:t._s(t.label)}})],1),"right"===t.arrowPosition?s("vis-icon",{class:{"icon-open":!t.showCollapse},attrs:{code:"#iconjian"}}):t._e()],1),s("el-collapse-transition",[s("div",{directives:[{name:"show",rawName:"v-show",value:t.showCollapse,expression:"showCollapse"}],staticClass:"collapseLayout-main"},[t._t("container")],2)])],1)},o=[],n={name:"collapse-layout",props:{icon:{type:String,default:"#iconmoxing"},showIcon:{type:Boolean,default:!0},label:{type:String,default:"折叠面板布局"},fold:{type:Boolean,default:!1},arrowPosition:{type:String,default:"right"}},data:function(){return{showCollapse:!0}},watch:{fold:{handler:function(t){this.showCollapse=!t},immediate:!0}},methods:{toggle:function(){this.showCollapse=!this.showCollapse,this.$emit("change",this.showCollapse)}}},a=n,r=(s("2fdd"),s("2877")),l=Object(r["a"])(a,i,o,!1,null,"6aabd072",null);e["a"]=l.exports},"6fab":function(t,e,s){"use strict";s("a9e3"),s("fb6a");var i,o,n={name:"drag-plane",props:{height:{type:String,default:"500px"},width:{type:String,default:"300px"},direction:{type:String,default:"column"},amount:{type:Number,default:2},safeDistance:{type:Number,default:24},boxSaveDistance:{type:Number,default:100},showDragsign:{type:Boolean,default:!0},dragTop:{type:Boolean,default:!1},dragBottom:{type:Boolean,default:!1},dragLeft:{type:Boolean,default:!1},dragRight:{type:Boolean,default:!1}},data:function(){return{spaceData:{},showInnerMask:!1,showOutMask:!1,lineDirection:"",boxWidth:"",boxHight:"",mouseX:"",mouseY:"",touchNum:""}},render:function(t){var e=this,s={class:"dragFlexPanel-drag"},i={class:"dragFlexPanel-view"},o=t("div",{class:{"dragFlexPanel-line":!0,"dragFlexPanel-line-sign":this.showDragsign},style:"row"===this.direction?"height: 100%;width: 3px;right: 0;top: 0;":"width: 100%;height: 3px;left: 0;bottom: 0;",on:{mousedown:this.dragLineMouseDown}}),n=t("div",{attrs:{id:"drag".concat(this.amount),class:"".concat(s.class)},ref:"drag".concat(this.amount)},[t("div",{class:i.class},[this.$slots["view1"]]),o]),a=function a(r){if(r===e.amount)return n;var l=t("div",{attrs:{class:i.class}},e.$slots["view".concat(e.amount-r+1)]);return t("div",{attrs:{id:"drag".concat(r),class:s.class,style:"flex-direction: ".concat(e.direction,";")},ref:"drag".concat(r)},[a(r+1),l,o])},r=t("div",{attrs:{class:"dragFlexPanel-mask-inner"},style:{display:this.showInnerMask?"block":"none"},on:{mousemove:this.innerMaskMouseMove,mouseup:this.innerMaskMouseUp,mouseleave:this.innerMaskMouseLeave},ref:"innerMask"}),l=t("div",{attrs:{class:"dragFlexPanel-mask-outer"},style:{display:this.showOutMask?"block":"none",cursor:"top"===this.lineDirection||"bottom"===this.lineDirection?"ns-resize":"ew-resize"},on:{mousemove:this.outerMaskMouseMove,mouseup:this.outerMaskMouseUp,mouseleave:this.outerMaskMouseLeave},ref:"outerMask"}),c=t("div",{attrs:{style:"top: 0;left: 0;width: 100%;cursor: ns-resize;"},style:{display:this.dragTop?"black":"none"},class:{"dragFlexPanel-boxLine":!0,"dragFlexPanel-boxLine-n":this.dragTop,"dragFlexPanel-boxLine-n-sign":this.dragTop&&this.showDragsign},ref:"boxLine-top",on:{mousedown:function(t){return e.boxLineMouseDown(t,"top")}}}),h=t("div",{attrs:{style:"bottom: 0;left: 0;width: 100%;cursor: ns-resize;"},style:{display:this.dragBottom?"black":"none"},class:{"dragFlexPanel-boxLine":!0,"dragFlexPanel-boxLine-s":this.dragBottom,"dragFlexPanel-boxLine-s-sign":this.dragBottom&&this.showDragsign},ref:"boxLine-bottom",on:{mousedown:function(t){return e.boxLineMouseDown(t,"bottom")}}}),d=t("div",{attrs:{style:"top: 0;left: 0;height: 100%;cursor: ew-resize;"},style:{display:this.dragLeft?"black":"none"},class:{"dragFlexPanel-boxLine":!0,"dragFlexPanel-boxLine-w":this.dragLeft,"dragFlexPanel-boxLine-w-sign":this.dragLeft&&this.showDragsign},ref:"boxLine-left",on:{mousedown:function(t){return e.boxLineMouseDown(t,"left")}}}),u=t("div",{attrs:{style:"top: 0;right: 0;height: 100%;cursor: ew-resize;"},style:{display:this.dragRight?"black":"none"},class:{"dragFlexPanel-boxLine":!0,"dragFlexPanel-boxLine-e":this.dragRight,"dragFlexPanel-boxLine-e-sign":this.dragRight&&this.showDragsign},ref:"boxLine-right",on:{mousedown:function(t){return e.boxLineMouseDown(t,"right")}}});return t("div",{attrs:{class:"dragFlexPanel-box"},style:{flexDriection:this.direction,width:this.boxWidth,height:this.boxHeight,borderTopWidth:this.dragTop?"":"1px",borderBottomWidth:this.dragBottom?"":"1px",borderLeftWidth:this.dragLeft?"":"1px",borderRightWidth:this.dragRight?"":"1px"},ref:"box"},[a(1),r,l,c,h,d,u])},methods:{setDistance:function(){var t=this.$refs.box.offsetHeight/this.amount;t||(t=parseInt(this.$refs.box.style.height)/this.amount);for(var e=2;e<=this.amount;e+=1){var s=t*(this.amount-e+1);this.$refs["drag".concat(e)].style.height="".concat(s,"px"),this.spaceData[e]=s}},dragLineMouseDown:function(t){t.preventDefault(),t.target.classList.add("dragFlexPanel-line-click"),this.touchNum=t.target.parentNode.id.slice(4),this.showInnerMask=!0},innerMaskMouseMove:function(t){if(t.preventDefault(),"row"===this.direction)this.$refs["drag".concat(this.touchNum)].style.height=t.offsetX;else{var e=t.offsetY,s=(this.spaceData[parseInt(this.touchNum)+1]||0)+this.safeDistance,i=(this.spaceData[parseInt(this.touchNum)-1]||this.$refs.box.offsetHeight)-this.safeDistance;this.$refs["drag".concat(this.touchNum)].style.height="".concat(e<=s?s:e>=i?i:e,"px"),this.spaceData[this.touchNum]=parseInt(this.$refs["drag".concat(this.touchNum)].style.height)}},innerMaskMouseLeave:function(t){t.preventDefault(),this.innerMaskMouseUp()},innerMaskMouseUp:function(t){this.showInnerMask=!1;var e=this.$refs["drag".concat(this.touchNum)].lastElementChild;e.classList.remove("dragFlexPanel-line-click")},boxLineMouseDown:function(t,e){t.preventDefault(),this.showOutMask=!0,this.mouseX=t.clientX,this.mouseY=t.clientY,this.lineDirection=e,this.$refs["boxLine-".concat(this.lineDirection)].classList.add("dragFlexPanel-boxLine-click")},outerMaskMouseMove:function(t){t.preventDefault();var e=t.clientX-this.mouseX,s=t.clientY-this.mouseY;if("top"===this.lineDirection||"bottom"===this.lineDirection){var i=parseFloat(this.boxHeight)+s;"column"===this.direction?i<=this.spaceData[2]+this.boxSaveDistance?this.$refs.box.style.height=this.spaceData[2]+this.boxSaveDistance:this.$refs.box.style.height="".concat(i,"px"):i<=this.boxSaveDistance?this.$refs.box.style.height=this.boxSaveDistance:this.$refs.box.style.height="".concat(i,"px")}else if("right"===this.lineDirection||"left"===this.lineDirection){var o=parseFloat(this.boxWidth)+e;"row"===this.direction||(o<=this.boxSaveDistance?this.$refs.box.style.width=this.boxSaveDistance:this.$refs.box.style.width="".concat(o,"px"))}},outerMaskMouseLeave:function(t){t.preventDefault(),this.outerMaskMouseUp()},outerMaskMouseUp:function(t){this.showOutMask=!1,this.boxWidth=this.$refs.box.style.width,this.boxHeight=this.$refs.box.style.height,this.$refs["boxLine-".concat(this.lineDirection)].classList.remove("dragFlexPanel-boxLine-click")}},watch:{height:function(t,e){this.boxHight=t},width:function(t,e){this.boxWidth=t}},created:function(){this.boxWidth=this.width,this.boxHeight=this.height},mounted:function(){this.setDistance()}},a=n,r=(s("f171"),s("2877")),l=Object(r["a"])(a,i,o,!1,null,null,null);e["a"]=l.exports},"73f1":function(t,e,s){"use strict";s("35ea")},9305:function(t,e,s){},b19d:function(t,e,s){},f171:function(t,e,s){"use strict";s("b19d")}}]);