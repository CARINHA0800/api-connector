/**
 * Error handler utility to sanitize database error messages
 * Prevents leaking internal implementation details to users
 */

type ErrorCode = 
  | "PGRST116" // Not found
  | "23505"    // Unique violation
  | "23503"    // Foreign key violation
  | "23502"    // Not null violation
  | "42501"    // RLS policy violation
  | "42P01"    // Table doesn't exist
  | "NETWORK"  // Network error
  | "AUTH"     // Authentication error
  | "UNKNOWN"; // Fallback

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  PGRST116: "O item solicitado não foi encontrado.",
  "23505": "Este item já existe. Por favor, tente com um valor diferente.",
  "23503": "Não é possível completar a operação devido a uma referência inválida.",
  "23502": "Campos obrigatórios não foram preenchidos.",
  "42501": "Você não tem permissão para realizar esta operação.",
  "42P01": "Ocorreu um erro ao acessar os dados. Tente novamente.",
  NETWORK: "Erro de conexão. Verifique sua internet e tente novamente.",
  AUTH: "Sua sessão expirou. Faça login novamente.",
  UNKNOWN: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
};

/**
 * Extracts error code from Supabase/PostgreSQL error message
 */
const extractErrorCode = (error: Error | unknown): ErrorCode => {
  if (!error) return "UNKNOWN";
  
  const message = error instanceof Error ? error.message : String(error);
  const lowerMessage = message.toLowerCase();
  
  // Check for network errors
  if (lowerMessage.includes("network") || lowerMessage.includes("fetch")) {
    return "NETWORK";
  }
  
  // Check for auth errors
  if (lowerMessage.includes("jwt") || lowerMessage.includes("unauthorized") || lowerMessage.includes("not authenticated")) {
    return "AUTH";
  }
  
  // Check for PostgreSQL error codes
  for (const code of Object.keys(ERROR_MESSAGES) as ErrorCode[]) {
    if (message.includes(code)) {
      return code;
    }
  }
  
  return "UNKNOWN";
};

/**
 * Get a user-friendly error message from a database/API error
 * Use this instead of displaying raw error.message to users
 */
export const getUserFriendlyError = (error: Error | unknown): string => {
  const code = extractErrorCode(error);
  return ERROR_MESSAGES[code];
};

/**
 * Log error details for debugging (server-side or monitoring)
 * In production, this would send to a logging service
 */
export const logError = (context: string, error: Error | unknown): void => {
  // In development, log to console
  // In production, this would send to monitoring service
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, error);
  }
};
