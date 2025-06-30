import { YOUTUBE_API_BASE_URL } from '@/constants';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YouTube_API_KEY;

// Create axios instance with default config
export const youtubeApi = axios.create({
  baseURL: YOUTUBE_API_BASE_URL,
  params: {
    key: API_KEY,
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
youtubeApi.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
youtubeApi.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(
      '[API Response Error]',
      error.response?.status,
      error.message
    );

    // Handle specific error cases
    if (error.response?.status === 403) {
      throw new Error('YouTube API quota exceeded or invalid API key');
    } else if (error.response?.status === 404) {
      throw new Error('Playlist not found');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again');
    }

    return Promise.reject(error);
  }
);
