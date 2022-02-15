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

import { v4 as getUUid } from "uuid";

import { geometryDataSupport } from "../../store/modules/geometry";
import { materialDataSupport } from "../../store/modules/material";
import { modelDataSupport } from "../../store/modules/model";
import { textureDataSupport } from "../../store/modules/texture";

const dataGenerator = new SupportDataGenerator();
// 初始场景配置

const lightDataSupport = new LightDataSupport(
  dataGenerator
    .create(MODULETYPE.LIGHT)
    .add(generateConfig("AmbientLight", { vid: getUUid() }))
    .add(
      generateConfig("PointLight", {
        vid: getUUid(),
        position: {
          x: 50,
          z: 50,
          y: 50,
        },
        distance: 300,
      })
    )
    .get()
);

export const dataSupportManager = new DataSupportManager({
  cameraDataSupport: new CameraDataSupport(),
  lightDataSupport,
  geometryDataSupport,
  modelDataSupport,
  textureDataSupport,
  materialDataSupport,
  rendererDataSupport: new RendererDataSupport(),
  sceneDataSupport: new SceneDataSupport(),
  controlsDataSupport: new ControlsDataSupport(),
});

export const VisEngine = new ModelingEngineSupport({
  dataSupportManager,
});
