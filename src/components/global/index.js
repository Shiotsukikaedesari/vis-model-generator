import Icon from "./icon";
import Image from "./image";
import Color from "./color.vue";
import NumberComponent from "./number.vue";
import Input from "./input.vue";
import Switch from "./switch.vue";
import Select from "./select.vue";
import Vector3 from "./vector3.vue";
export default (Vue) => {
  Vue.component(Icon.name, Icon);
  Vue.component(Image.name, Image);
  Vue.component(Color.name, Color);
  Vue.component(NumberComponent.name, NumberComponent);
  Vue.component(Input.name, Input);
  Vue.component(Switch.name, Switch);
  Vue.component(Select.name, Select);
  Vue.component(Vector3.name, Vector3);
};
