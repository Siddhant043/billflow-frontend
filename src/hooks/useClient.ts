import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient, getClientById, getClientList, type ClientFormData } from "@/api/client";

export const clientKeys = {
    all: ["clients"] as const,
    lists: () => [...clientKeys.all, "list"] as const,
    list: (filters?: string) => [...clientKeys.lists(), filters] as const,
    details: () => [...clientKeys.all, "detail"] as const,
    detail: (id: string) => [...clientKeys.details(), id] as const,
};

export const useClientList = () => {
    return useQuery({
        queryKey: clientKeys.lists(),
        queryFn: getClientList,
    });
};

export const useClientById = (id: string) => {
    return useQuery({
        queryKey: clientKeys.detail(id),
        queryFn: () => getClientById(id),
        enabled: !!id,
    });
};

export const useCreateClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ClientFormData) => createClient(data),
        onSuccess: () => {
            // Invalidate and refetch the client list
            queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
        },
    });
};
