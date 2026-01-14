import api from "./config";
import { USER_API_URL } from "./config";
import { convertToCamelCase } from "@/utils";

export const getCurrentUser = async () => {
  const response = await api.get(`${USER_API_URL}/me`);

  const userResponse = convertToCamelCase(response.data);
  return userResponse;
};
