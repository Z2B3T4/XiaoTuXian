import httpInstance from "@/utils/http";

export const LoginAPI = ({ account, password }) => {
  return httpInstance({
    url: "/login",
    method: "POST",
    data: {
      account,
      password,
    },
  });
};

// 这个是猜你喜欢的接口
export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url: "/goods/relevant",
    params: {
      limit,
    },
  });
};
