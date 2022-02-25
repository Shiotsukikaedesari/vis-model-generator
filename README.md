# vis-model-generator

<p>
<img src="https://img.shields.io/badge/Versioin-0.1.6-{}" alt="Version">
<img src="https://img.shields.io/badge/License-AGPL3.0-{}" alt="License">
</p>

An application that can quickly generate vis-three model configuration sheets.

可视化快速生成vis-three框架相关模型配置数据。

### 说明
* 暂时只支持obj格式文件导入
* 使用跨域资源请求时，服务器请配置好相关跨域规则。
* 内置axios的baseUrl为`window.location.href`
* 测试模型位置：`/pubilc/resource/model`
* 测试贴图位置：`/public/resource/texture`

#### 测试模型

* `${window.location.href}/resource/model/katana.obj`

#### 测试贴图

* `${window.location.href}/resource/texture/katana/BaseColor.png`
* `${window.location.href}/resource/texture/katana/Height.png`
* `${window.location.href}/resource/texture/katana/Metallic.png`
* `${window.location.href}/resource/texture/katana/Roughness.png`



### 在线导入测试URL
`/examples/vis-model-config.json`


