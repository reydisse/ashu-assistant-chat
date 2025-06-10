import React, { useState, useEffect, useRef } from "react";
import Message from "./components/Message";
import ChatHistoryItem from "./components/ChatHistoryItem";
import QuickActionButton from "./components/QuickActionButton";
import LoadingMessage from "./components/LoadingMessage";
import { apiService } from "./services/apiService";
import { mockChatHistory, quickActions } from "./data/mockData";

function Chat() {
  // =============================================================================
  // STATE MANAGEMENT
  // =============================================================================
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState(mockChatHistory);

  // Refs for auto-scrolling
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // =============================================================================
  // EFFECTS
  // =============================================================================

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Focus input on mount and when switching chats
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeChat]);

  // Load chat history on mount (if backend supports it)
  useEffect(() => {
    loadChatHistory();
  }, []);

  // =============================================================================
  // HELPER FUNCTIONS
  // =============================================================================

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateChatId = () => {
    return Date.now().toString();
  };

  const getCurrentTimestamp = () => {
    return new Date().toISOString();
  };

  // =============================================================================
  // API FUNCTIONS
  // =============================================================================

  const loadChatHistory = async () => {
    try {
      // Uncomment this if your backend supports chat history
      // const history = await apiService.getChatHistory();
      // setChatHistory(history);
    } catch (error) {
      console.error("Error loading chat history:", error);
      // Fall back to mock data
      setChatHistory(mockChatHistory);
    }
  };

  const sendMessageToBackend = async (messageText) => {
    try {
      setIsLoading(true);
      setError(null);

      // Call your backend API
      const response = await apiService.sendMessage(messageText);

      // Add assistant response to messages
      const assistantMessage = {
        text:
          response.response || response.message || "I received your message.",
        sender: "assistant",
        timestamp: getCurrentTimestamp(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error.message);

      // error message for user feedback
      const errorMessage = {
        text: "Sorry, I'm having trouble connecting right now. Please try again.",
        sender: "assistant",
        timestamp: getCurrentTimestamp(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const messageText = input.trim();

    // Add user message immediately
    const userMessage = {
      text: messageText,
      sender: "user",
      timestamp: getCurrentTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Send to backend
    await sendMessageToBackend(messageText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    setMessages(chat.messages || []);
    setError(null);
  };

  const handleNewChat = () => {
    setActiveChat(null);
    setMessages([]);
    setError(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleQuickAction = (query) => {
    setInput(query);
    // Optionally auto-send the query
    // setTimeout(() => handleSend(), 100);
  };

  // =============================================================================
  // RENDER FUNCTIONS
  // =============================================================================

  const renderWelcomeScreen = () => (
    <div className='flex-1 flex items-center justify-center p-6'>
      <div className='text-center max-w-md'>
        <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
          <svg
            className='w-8 h-8 text-purple-300'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
            />
          </svg>
        </div>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          Effortless Support, Anytime
        </h2>
        <p className='text-gray-600 mb-8'>
          Providing Seamless Assistance to Employees, Every Step of the Way
        </p>

        <div className='space-y-3'>
          {quickActions.map((action, index) => (
            <QuickActionButton
              key={index}
              icon={action.icon}
              text={action.text}
              onClick={() => handleQuickAction(action.query)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderChatMessages = () => (
    <div className='flex-1 overflow-y-auto p-6 text-left'>
      <div className='max-w-4xl mx-auto'>
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
        {isLoading && <LoadingMessage />}
        {error && (
          <div className='text-center py-4'>
            <div className='bg-red-50 text-red-600 px-4 py-2 rounded-lg inline-block'>
              {error}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className='w-80 bg-white border-r border-gray-200 flex flex-col'>
      <div className='p-6 border-b border-gray-200'>
        <div className='flex items-center space-x-3 mb-4'>
          <div className='w-8 h-8 bg-purple-300 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>A</span>
          </div>
          <h1 className='text-lg font-semibold text-gray-900'>
            Ashu's Assistant
          </h1>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='p-4 text-left'>
          <div className='flex items-left justify-between mb-4'>
            <h2 className='text-sm font-medium text-gray-700'>
              Chat History ({chatHistory.length.toString().padStart(2, "0")})
            </h2>
            <button
              onClick={handleNewChat}
              className='text-purple-300 hover:text-purple-700 text-sm font-medium transition-colors'
            >
              + New
            </button>
          </div>

          {chatHistory.map((chat) => (
            <ChatHistoryItem
              key={chat.id}
              chat={chat}
              isActive={activeChat?.id === chat.id}
              onClick={() => handleChatSelect(chat)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderInputArea = () => (
    <div className='border-t border-gray-200 p-6 bg-white'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex items-center space-x-4'>
          <div className='flex-1 relative'>
            <input
              ref={inputRef}
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder='Type message...'
              disabled={isLoading}
              className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-purple-300 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              ) : (
                <svg
                  className='w-4 h-4 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <div className='flex h-screen bg-gray-50'>
      {renderSidebar()}

      <div className='flex-1 flex flex-col'>
        {!activeChat && messages.length === 0
          ? renderWelcomeScreen()
          : renderChatMessages()}
        {renderInputArea()}
      </div>
    </div>
  );
}

export default Chat;
