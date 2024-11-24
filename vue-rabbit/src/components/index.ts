import ImageView from "@/components/ImageView/index.vue";
import Sku from "@/components/XtxSku/index.vue";
// 注意上面这个名字可以是任意的，就是什么都可以、
export const componentPlugin = {
  install(app) {
    app.component("XtxImageView", ImageView);
    app.component("XtxSku", Sku);
  },
};
