import { axiosClient } from "./axios-client";

const userAPI = {
  getList: async () => await axiosClient.get<User[]>(""),

  getDetail: async (userId: string) => await axiosClient.get<User>(userId),

  updateUser: async (userId: string, data: UserState) =>
    await axiosClient.put<User>(`${userId}`, data),
};

export default userAPI;
