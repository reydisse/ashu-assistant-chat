import axios from "axios";

// Configure your backend URL here
const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for logging (optional)
apiClient.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(
      "❌ API Response Error:",
      error.response?.status,
      error.message
    );
    return Promise.reject(error);
  }
);

// API Functions
export const apiService = {
  // Send message to chatbot
  sendMessage: async (message) => {
    try {
      const response = await apiClient.post("/chat", { message });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to send message");
    }
  },

  // Get chat history (if your backend supports it)
  getChatHistory: async () => {
    try {
      const response = await apiClient.get("/chat/history");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to get chat history"
      );
    }
  },

  // Save chat session (if your backend supports it)
  saveChatSession: async (messages) => {
    try {
      const response = await apiClient.post("/chat/save", { messages });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to save chat session"
      );
    }
  },
};
