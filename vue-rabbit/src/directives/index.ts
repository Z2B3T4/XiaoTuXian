import { useIntersectionObserver } from "@vueuse/core";

export const lazyPlugin = {
  // 注意不要拼错字母
  // 注意这个一定要叫做install，就是图片懒加载插件
  install(app: any) {
    // 懒加载指令
    app.directive("img-lazy", {
      mounted(el: any, binding: any) {
        console.log("el, binding");
        // el,指令绑定的img
        // binding:binding.value就是指令绑定的值，就是图片的url
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            console.log("进入可视区域");
            el.src = binding.value;
            stop();
          }
        });
      },
    });
  },
};
