// Mobile hook
export { useIsMobile } from "./use-mobile";

// Auth hooks
export { useLogin, useRegister } from "./useAuth";
export type { LoginRequest, RegisterRequest, LoginResponse } from "./useAuth";

// User hooks
export { useCurrentUser, userKeys } from "./useUser";

// Client hooks
export { useClientList, useClientById, useCreateClient, clientKeys } from "./useClient";
