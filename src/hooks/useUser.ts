import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/user";

export const userKeys = {
    all: ["user"] as const,
    current: () => [...userKeys.all, "current"] as const,
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: userKeys.current(),
        queryFn: getCurrentUser,
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        retry: 1,
    });
};
