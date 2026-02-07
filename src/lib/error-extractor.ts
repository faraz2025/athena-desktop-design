import { AxiosError } from "axios";
import { ApiError } from "./api";

/**
 * Utility to extract user-friendly error messages from API responses.
 * Handles Axios errors, structured API error responses, and generic error objects.
 */
const DEFAULT_ERROR_MESSAGE =
    'Something went wrong. Please try again later.';

export function extractErrorMessage(error: unknown): string {

    if (error instanceof ApiError) {
        return error.message
    }
    /* -------------------------------------------
     * 1. Null / Undefined
     * ----------------------------------------- */
    if (!error) {
        return DEFAULT_ERROR_MESSAGE;
    }

    /* -------------------------------------------
     * 2. Simple primitives
     * ----------------------------------------- */
    if (typeof error === 'string') {
        return error;
    }

    if (typeof error === 'number') {
        return `Error code: ${error}`;
    }

    /* -------------------------------------------
     * 3. Abort / Cancel / Timeout
     * ----------------------------------------- */
    if (
        (error as any).name === 'AbortError' ||
        (error as any).code === 'ERR_CANCELED'
    ) {
        return 'Request was cancelled. Please try again.';
    }

    /* -------------------------------------------
     * 4. Axios Error (most common in React apps)
     * ----------------------------------------- */


    if (error instanceof AxiosError) {
        const data = error.response?.data;

        // NestJS / custom API { message: string | string[] }
        if (data?.message) {
            if (Array.isArray(data.message)) {
                return data.message.join(', ');
            }
            if (typeof data.message === 'string') {
                return data.message;
            }
        }

        // Validation errors: { errors: { field: [msg] } }
        if (data?.errors && typeof data.errors === 'object') {
            const firstKey = Object.keys(data.errors)[0];
            const firstError = data.errors[firstKey];

            if (Array.isArray(firstError)) {
                return firstError[0];
            }
            if (typeof firstError === 'string') {
                return firstError;
            }
        }

        // NestJS default: { statusCode, error }
        if (typeof data?.error === 'string') {
            return data.error;
        }

        // Fallback: HTTP status
        if (error.response?.status) {
            return `Request failed with status ${error.response.status}`;
        }
    }
    /* -------------------------------------------
     * 5. Fetch API errors
     * ----------------------------------------- */
    if ((error as any) instanceof Response) {
        return `Request failed with status ${(error as Response).status}`;
    }

    /* -------------------------------------------
     * 6. Zod validation errors
     * ----------------------------------------- */
    if ((error as any)?.issues && Array.isArray((error as any).issues)) {
        return (error as any).issues[0]?.message ?? DEFAULT_ERROR_MESSAGE;
    }

    /* -------------------------------------------
     * 7. Redux Toolkit rejectWithValue
     * ----------------------------------------- */
    const payload = (error as any)?.payload;

    if (payload) {
        if (typeof payload === 'string') {
            return payload;
        }

        if (payload?.message) {
            if (Array.isArray(payload.message)) {
                return payload.message[0];
            }
            return payload.message;
        }
    }

    /* -------------------------------------------
     * 8. Standard Error object
     * ----------------------------------------- */
    if (error instanceof Error) {
        // Network-level errors
        if (error.message === 'Network Error') {
            return 'Unable to connect to the server. Please check your internet connection.';
        }

        return error.message;
    }

    /* -------------------------------------------
     * 9. Plain object fallback
     * ----------------------------------------- */
    if (typeof error === 'object') {
        try {
            const serialized = JSON.stringify(error);
            if (serialized !== '{}') {
                return serialized;
            }
        } catch {
            // ignore serialization errors
        }
    }

    /* -------------------------------------------
     * 10. Final fallback
     * ----------------------------------------- */
    return DEFAULT_ERROR_MESSAGE;
}