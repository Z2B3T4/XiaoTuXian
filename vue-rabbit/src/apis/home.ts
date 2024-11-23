import httpInstance from "@/utils/http";

export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
  });
}
// 这个是新鲜好物的API接口
export const findNewAPI = () => {
  return httpInstance({
    url: "/home/new",
  });
};
