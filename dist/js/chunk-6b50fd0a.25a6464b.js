(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b50fd0a"],{"756a":function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"right-part"},[o("el-button",{directives:[{name:"tooltip",rawName:"v-tooltip.top",value:"本地导入",expression:"'本地导入'",modifiers:{top:!0}}],attrs:{size:"mini",circle:"",type:"primary",icon:"el-icon-folder-opened"},on:{click:e.importData}}),o("el-button",{directives:[{name:"tooltip",rawName:"v-tooltip.top",value:"在线导入",expression:"'在线导入'",modifiers:{top:!0}}],attrs:{size:"mini",circle:"",type:"primary",icon:"el-icon-sold-out"},on:{click:e.importDataOnline}}),o("el-button",{directives:[{name:"tooltip",rawName:"v-tooltip.top",value:"本地导出",expression:"'本地导出'",modifiers:{top:!0}}],attrs:{size:"mini",type:"primary",round:"",icon:"el-icon-folder-checked"},on:{click:function(){e.exportDialogVisiable=!0}}}),o("input",{ref:"importInput",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:e.fileHandler}}),o("el-dialog",{attrs:{title:"导出设置",visible:e.exportDialogVisiable,width:"420px"},on:{"update:visible":function(t){e.exportDialogVisiable=t}}},[o("el-form",{attrs:{"label-width":"110px","label-position":"left"}},[o("el-form-item",{attrs:{label:"文件名称:"}},[o("el-input",{attrs:{size:"mini"},model:{value:e.exportName,callback:function(t){e.exportName=t},expression:"exportName"}})],1)],1),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"mini"},on:{click:function(t){e.exportDialogVisiable=!1}}},[e._v(" 取 消 ")]),o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.exportConfig}},[e._v(" 确 定 ")])],1)],1)],1)},n=[],a=o("ade3"),r=(o("ac1f"),o("1276"),o("b0c0"),o("bf19"),o("d3b7"),o("159b"),o("b64b"),o("4de4"),o("caad"),o("2532"),o("e9c4"),o("3ca3"),o("ddb0"),o("2b3d"),o("9861"),o("2209")),s=o("35bb"),c=o("06e4"),l=o("a026"),p={data:function(){return{exportDialogVisiable:!1,exportName:"vis-model-config"}},methods:{importData:function(){this.$refs.importInput.click()},importDataOnline:function(){var e=this;this.$prompt("请输入在线配置地址：","在线导入",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(t){var o=t.value;e.axios.get(o).then((function(t){var o=t;console.log(o),s["a"].loadConfigAsync(l["default"].observable(o)).then((function(){e.$message.success("导入成功！"),e.$store.commit("material/notify"),e.$store.commit("texture/notify")})).catch((function(t){console.error(t),e.$message.error("导入失败！")}))}))}))},fileHandler:function(){var e=this,t=this.$refs.importInput.files[0];if(!t)return!1;if("json"!==t.name.split(".").pop())return this.$message.warning("文件格式有误！"),!1;var o=this.$message({showClose:!0,message:"正在读取文件...",iconClass:"el-icon-loading",duration:0}),i=new FileReader;i.readAsText(t,"utf-8"),i.onload=function(){o.close();try{var t=JSON.parse(i.result);console.log(t),s["a"].loadConfigAsync(l["default"].observable(t)).then((function(){e.$message.success("导入成功！"),e.$store.commit("material/notify"),e.$store.commit("texture/notify")})).catch((function(t){console.error(t),e.$message.error("导入失败！")}))}catch(n){e.$message.error("文件格式有误！")}e.$refs.importInput.value=""},i.onerror=function(){e.$message.error("读取失败！")}},exportConfig:function(){var e,t=JSON.parse(s["a"].toJSON());console.log(t);var o=t[r["d"].MESH],i=(e={assets:t.assets},Object(a["a"])(e,r["d"].MESH,o),Object(a["a"])(e,r["d"].MATERIAL,{}),Object(a["a"])(e,r["d"].GEOMETRY,{}),Object(a["a"])(e,r["d"].TEXTURE,{}),e),n=t[r["d"].TEXTURE],l=t[r["d"].MATERIAL],p=t[r["d"].GEOMETRY];Object.keys(o).forEach((function(e){var t=o[e];t.geometry&&(i[r["d"].GEOMETRY][t.geometry]=p[t.geometry]),t.material&&(i[r["d"].MATERIAL][t.material]=l[t.material])}));var u=i[r["d"].MATERIAL];Object.keys(u).forEach((function(e){var t=u[e];Object.keys(t).forEach((function(e){t[e]&&Object(c["a"])(t[e])&&n[t[e]]&&(i[r["d"].TEXTURE][t[e]]=n[t[e]])}))})),i.assets=i.assets.filter((function(e){return!["".concat(window.location,"/resource/skyBox/snowScene/nx.jpg"),"".concat(window.location,"/resource/skyBox/snowScene/ny.jpg"),"".concat(window.location,"/resource/skyBox/snowScene/nz.jpg"),"".concat(window.location,"/resource/skyBox/snowScene/px.jpg"),"".concat(window.location,"/resource/skyBox/snowScene/py.jpg"),"".concat(window.location,"/resource/skyBox/snowScene/pz.jpg")].includes(e)})),console.log(i);var f=new Blob([JSON.stringify(i)],{type:"text/json"}),d=document.createElement("a");d.download="".concat(this.exportName,".json"),d.href=window.URL.createObjectURL(f),d.click(),this.exportDialogVisiable=!1}}},u=p,f=(o("9d0f"),o("2877")),d=Object(f["a"])(u,i,n,!1,null,"3fa33041",null);t["default"]=d.exports},"9d0f":function(e,t,o){"use strict";o("a849")},a849:function(e,t,o){}}]);