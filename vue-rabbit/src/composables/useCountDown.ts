import dayjs from "dayjs";
import { computed, onUnmounted, ref } from "vue";

export const useCountDown = () => {
  // 表示初始时间
  const time = ref(0);
  let timer = null;
  // 格式化时间,这里使用计算属性是因为要响应式的将time实时转换格式
  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));
  // 开启计时
  const start = (currentTime) => {
    // 首先是要把时间定位在传过来的时间上
    time.value = currentTime;
    // 开启倒计时
    timer = setInterval(() => {
      time.value--;
    }, 1000);
  };
  // 组件销毁的时候清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
  return {
    formatTime,
    start,
  };
};
