export const mockChatHistory = [
  {
    id: 1,
    title: "HR Inquiries",
    subtitle: "Company policies, employee benefits",
    date: "18/02",
    messages: [
      {
        text: "What are the vacation policies?",
        sender: "user",
        timestamp: new Date().toISOString(),
      },
      {
        text: "Our vacation policy allows for 15 days of paid time off per year for full-time employees. You can request time off through our HR portal at hr.company.com.",
        sender: "assistant",
        timestamp: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    title: "Performance Management",
    subtitle: "Assistance with performance appraisal processes",
    date: "24/02",
    messages: [
      {
        text: "How do I prepare for my performance review?",
        sender: "user",
        timestamp: new Date().toISOString(),
      },
      {
        text: "To prepare for your performance review: 1) Gather examples of your achievements, 2) Set goals for the next period, 3) Review your job description, 4) Prepare questions about career development.",
        sender: "assistant",
        timestamp: new Date().toISOString(),
      },
    ],
  },
  {
    id: 3,
    title: "Employee Relations",
    subtitle: "Reporting workplace harassment",
    date: "11/01",
    messages: [],
  },
  {
    id: 4,
    title: "Onboarding and Training",
    subtitle: "Guidance on completing onboarding tasks",
    date: "08/01",
    messages: [],
  },
];

export const quickActions = [
  {
    icon: "📋",
    text: "Company Policy",
    query: "Tell me about company policies",
  },
  { icon: "📄", text: "Document Finder", query: "Help me find a document" },
  {
    icon: "💼",
    text: "HR Support",
    query: "I need help with HR-related questions",
  },
  {
    icon: "📚",
    text: "Training Resources",
    query: "Show me available training resources",
  },
];
