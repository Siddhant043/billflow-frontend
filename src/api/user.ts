import type { User } from "@/types";
import api from "./config";
import { USER_API_URL } from "./config";

export const getCurrentUser = async () => {
  const response = await api.get(`${USER_API_URL}/me`);

  const userResponse: User = {
    id: response.data.id,
    email: response.data.email,
    fullName: response.data.full_name,
    companyName: response.data.company_name,
    address: response.data.address,
    phoneNumber: response.data.phone_number,
    isActive: response.data.is_active,
    logoUrl: response.data.logo_url,
    createdAt: response.data.created_at,
  };
  return userResponse;
};
