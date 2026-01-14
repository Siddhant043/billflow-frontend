import { convertToCamelCase, convertToSnakeCase } from "@/utils";
import api from "./config";
import { CLIENT_API_URL } from "./config";

export interface ClientFormData {
    company: string;
    name: string;
    email: string;
    phoneNumber: string;
    website: string;
    address: string;
    gstNumber: string;
    notes: string;
}

export const createClient = async (data: ClientFormData) => {
    const updatedPayload = convertToSnakeCase(data);
    const response = await api.post(`${CLIENT_API_URL}/`, updatedPayload);
    return response.data;
}

export const getClientById = async (id: string) => {
    const response = await api.get(`${CLIENT_API_URL}/${id}`);
    const data = convertToCamelCase(response.data);
    return data;
}

export const getClientList = async () => {
    const response = await api.get(`${CLIENT_API_URL}/`);
    const data = response.data.map((client: any) => convertToCamelCase(client));
    return data;
}
