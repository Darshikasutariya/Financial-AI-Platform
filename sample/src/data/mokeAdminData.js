// Mock data for admin showcase

export const mockUsers = [
  {
    id: '1',
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    role: 'user',
    status: 'active',
    created_at: '2024-01-15T10:30:00Z',
    last_login: '2024-01-20T14:22:00Z',
    total_transactions: 45,
    total_accounts: 3
  },
  {
    id: '2',
    email: 'sarah.smith@example.com',
    first_name: 'Sarah',
    last_name: 'Smith',
    role: 'user',
    status: 'active',
    created_at: '2024-01-10T09:15:00Z',
    last_login: '2024-01-19T16:45:00Z',
    total_transactions: 78,
    total_accounts: 2
  },
  {
    id: '3',
    email: 'mike.johnson@example.com',
    first_name: 'Mike',
    last_name: 'Johnson',
    role: 'user',
    status: 'suspended',
    created_at: '2024-01-05T11:20:00Z',
    last_login: '2024-01-18T12:30:00Z',
    total_transactions: 23,
    total_accounts: 1
  },
  {
    id: '4',
    email: 'emma.wilson@example.com',
    first_name: 'Emma',
    last_name: 'Wilson',
    role: 'user',
    status: 'active',
    created_at: '2024-01-08T14:45:00Z',
    last_login: '2024-01-21T09:30:00Z',
    total_transactions: 67,
    total_accounts: 4
  },
  {
    id: '5',
    email: 'alex.brown@example.com',
    first_name: 'Alex',
    last_name: 'Brown',
    role: 'user',
    status: 'deactivated',
    created_at: '2024-01-03T16:20:00Z',
    last_login: '2024-01-15T11:15:00Z',
    total_transactions: 12,
    total_accounts: 1
  }
];

export const mockCategories = [
  {
    id: '1',
    name: 'Food & Dining',
    type: 'expense',
    color: '#f59e0b',
    icon: '🍽️',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    usage_count: 245
  },
  {
    id: '2',
    name: 'Transportation',
    type: 'expense',
    color: '#3b82f6',
    icon: '🚗',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    usage_count: 156
  },
  {
    id: '3',
    name: 'Salary',
    type: 'income',
    color: '#10b981',
    icon: '💰',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    usage_count: 89
  },
  {
    id: '4',
    name: 'Shopping',
    type: 'expense',
    color: '#8b5cf6',
    icon: '🛍️',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    usage_count: 198
  },
  {
    id: '5',
    name: 'Entertainment',
    type: 'expense',
    color: '#ef4444',
    icon: '🎬',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    usage_count: 87
  }
];

export const mockPendingTransactions = [
  {
    id: '1',
    user_id: '1',
    amount: -45.67,
    description: 'UBER TRIP 123456',
    category_id: '2',
    category_name: 'Transportation',
    ai_confidence: 0.85,
    needs_review: true,
    created_at: '2024-01-20T10:30:00Z',
    user_email: 'john@example.com'
  },
  {
    id: '2',
    user_id: '2',
    amount: -125.00,
    description: 'AMAZON PURCHASE',
    category_id: '4',
    category_name: 'Shopping',
    ai_confidence: 0.65,
    needs_review: true,
    created_at: '2024-01-20T09:15:00Z',
    user_email: 'sarah@example.com'
  },
  {
    id: '3',
    user_id: '3',
    amount: -28.50,
    description: 'STARBUCKS COFFEE',
    category_id: '1',
    category_name: 'Food & Dining',
    ai_confidence: 0.92,
    needs_review: true,
    created_at: '2024-01-20T08:45:00Z',
    user_email: 'mike@example.com'
  }
];

export const mockStaticContent = [
  {
    id: '1',
    page: 'about',
    section: 'hero',
    title: 'About FinanceAI',
    content: 'FinanceAI is a revolutionary personal finance management platform that uses artificial intelligence to help you make smarter financial decisions.',
    updated_at: '2024-01-15T10:30:00Z',
    updated_by: 'admin@financeai.com'
  },
  {
    id: '2',
    page: 'privacy',
    section: 'main',
    title: 'Privacy Policy',
    content: 'Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.',
    updated_at: '2024-01-10T14:20:00Z',
    updated_by: 'admin@financeai.com'
  },
  {
    id: '3',
    page: 'terms',
    section: 'main',
    title: 'Terms of Service',
    content: 'By using FinanceAI, you agree to these terms of service. Please read them carefully.',
    updated_at: '2024-01-08T09:15:00Z',
    updated_by: 'admin@financeai.com'
  },
  {
    id: '4',
    page: 'faq',
    section: 'main',
    title: 'Frequently Asked Questions',
    content: 'Find answers to common questions about using FinanceAI and managing your finances.',
    updated_at: '2024-01-12T16:45:00Z',
    updated_by: 'admin@financeai.com'
  }
];

export const mockAnnouncements = [
  {
    id: '1',
    title: 'New AI Features Released',
    content: 'We\'ve just released new AI-powered insights that will help you save even more money. Check out the updated dashboard!',
    type: 'info',
    target_audience: 'all',
    is_active: true,
    created_at: '2024-01-20T10:00:00Z',
    created_by: 'admin@financeai.com',
    expires_at: '2024-02-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Scheduled Maintenance',
    content: 'We will be performing scheduled maintenance on January 25th from 2:00 AM to 4:00 AM EST. The service may be temporarily unavailable.',
    type: 'warning',
    target_audience: 'all',
    is_active: true,
    created_at: '2024-01-18T15:30:00Z',
    created_by: 'admin@financeai.com',
    expires_at: '2024-01-26T04:00:00Z'
  },
  {
    id: '3',
    title: 'Premium Features Now Available',
    content: 'Upgrade to Premium to unlock advanced budgeting tools, detailed analytics, and priority support.',
    type: 'success',
    target_audience: 'free',
    is_active: true,
    created_at: '2024-01-16T12:00:00Z',
    created_by: 'admin@financeai.com',
    expires_at: '2024-03-16T12:00:00Z'
  }
];

export const mockAdminStats = {
  total_users: 1247,
  active_users: 892,
  new_users_this_month: 156,
  total_transactions: 45678,
  total_categories: 24,
  pending_reviews: 12
};