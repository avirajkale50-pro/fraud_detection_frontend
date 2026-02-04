/**
 * JWT utility functions
 * Handles JWT token decoding and validation
 */

export interface JWTPayload {
    user_id: number;
    name: string;
    email: string;
    exp: number;
    iat: number;
    jti: string;
}

export const decodeJWT = (token: string): JWTPayload | null => {
    try {
        // JWT format: header.payload.signature
        const parts = token.split('.');

        if (parts.length !== 3) {
            return null;
        }

        // Decode the payload (second part)
        const payload = parts[1];

        // Base64 URL decode
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload) as JWTPayload;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};


export const isTokenExpired = (token: string): boolean => {
    const payload = decodeJWT(token);

    if (!payload || !payload.exp) {
        return true;
    }
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
};

export const getUserFromToken = (token: string): { id: number; name: string; email: string } | null => {
    const payload = decodeJWT(token);

    if (!payload) {
        return null;
    }

    return {
        id: payload.user_id,
        name: payload.name,
        email: payload.email,
    };
};
