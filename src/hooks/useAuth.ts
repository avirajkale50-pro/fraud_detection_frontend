import { useMutation } from '@tanstack/react-query';
import { api } from '../service/api';
import type { SignupRequest } from '../types';

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            api.login(email, password),
    });
};

export const useSignup = () => {
    return useMutation({
        mutationFn: (data: SignupRequest) => api.signup(data),
    });
};

export const useLogout = () => {
    return useMutation({
        mutationFn: () => api.logout(),
    });
};
