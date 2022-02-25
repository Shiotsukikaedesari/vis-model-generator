import {
  CameraDataSupport,
  ControlsDataSupport,
  DataSupportManager,
  generateConfig,
  LightDataSupport,
  ModelingEngineSupport,
  MODULETYPE,
  RendererDataSupport,
  SceneDataSupport,
  SupportDataGenerator,
} from "vis-three";

import { geometryDataSupport } from "../../store/modules/geometry";
import { materialDataSupport } from "../../store/modules/material";
import { meshDataSupport } from "../../store/modules/mesh";
import { textureDataSupport } from "../../store/modules/texture";

const dataGenerator = new SupportDataGenerator();
// 初始场景配置

const lightDataSupport = new LightDataSupport(
  dataGenerator
    .create(MODULETYPE.LIGHT)
    .add(
      generateConfig("AmbientLight", {
        intensity: 0.3,
      })
    )
    .add(
      generateConfig("PointLight", {
        position: {
          x: 50,
          z: 0,
          y: 50,
        },
        distance: 50,
        intensity: 0.8,
      })
    )
    .get()
);

const rendererDataSupport = new RendererDataSupport(
  dataGenerator
    .create(MODULETYPE.RENDERER)
    .add(
      generateConfig("WebGLRenderer", {
        clearColor: "rgba(15, 15, 15, 1)",
      })
    )
    .get()
);

export const VisEngine = new ModelingEngineSupport({
  lightDataSupport,
  geometryDataSupport,
  meshDataSupport,
  textureDataSupport,
  materialDataSupport,
  rendererDataSupport,
});
console.log(VisEngine);
