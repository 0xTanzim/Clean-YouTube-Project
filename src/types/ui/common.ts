// Theme types
export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// API types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
  success: boolean;
  message?: string;
}

// Utility types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface LoadingState {
  status: Status;
  error?: string;
}

// Time and formatting types
export interface TimeRange {
  start: number;
  end: number;
}

export interface FormatOptions {
  includeSeconds?: boolean;
  showZero?: boolean;
}
