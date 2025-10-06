// Application State
let currentUser = null;
let beneficiaries = [];
let transactions = [];
let filteredTransactions = [];
let pendingTransfer = null;

// DOM Elements
const loginPage = document.getElementById('loginPage');
const mainApp = document.getElementById('mainApp');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const navItems = document.querySelectorAll('.nav-item');
const contentPages = document.querySelectorAll('.content-page');
const breadcrumbs = document.getElementById('breadcrumbs');
const notification = document.getElementById('notification');
const loadingOverlay = document.getElementById('loadingOverlay');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Load mock data
    loadMockData();
    
    // Always start with login page for demo
    showLoginPage();
}

function loadMockData() {
    // Load user account data
    currentUser = {
        accountNumber: "1234567890123456",
        accountHolderName: "Mittapalli Yashaswini", 
        email: "mittapalliyashaswini@gmail.com",
        phone: "+91 8341407986",
        address: "123 Main Street, Kazipet, Telangana 500003",
        ifscCode: "HDFC0001234",
        branchName: "Hanamkonda Main Branch",
        accountType: "Savings Account",
        balance: 458299.50,
        availableBalance: 458299.50,
        accountStatus: "Active"
    };

    // Load beneficiaries including the new Thrushitha
    beneficiaries = [
        {
            id: 1,
            name: "Chunnu",
            accountNumber: "9876543210987654",
            ifscCode: "ICICI0005678",
            bankName: "ICICI Bank",
            branch: "Mumbai Branch",
            nickname: "Sister"
        },
        {
            id: 2,
            name: "Manoj",
            accountNumber: "5678901234566002",
            ifscCode: "HDFC0000375",
            bankName: "HDFC",
            branch: "Warangal Branch",
            nickname: "Business Partner"
        },
        {
            id: 3,
            name: "Tejaswini",
            accountNumber: "3456789012345678",
            ifscCode: "AXIS0001111",
            bankName: "Axis Bank",
            branch: "Bangalore Branch",
            nickname: "Friend"
        },
        {
            id: 4,
            name: "Thrushitha",
            accountNumber: "8734878363673344",
            ifscCode: "SBIK000222",
            bankName: "State Bank of India",
            branch: "Chennai Branch",
            nickname: "Cousin"
        },
        {
            id: 5,
            name: "Sai Suraj",
            accountNumber: "7890123456789012",
            ifscCode: "KOTAK000222",
            bankName: "Kotak Mahindra Bank",
            branch: "Chennai Branch",
            nickname: "Colleague"
        },
    ];

    // Load the full 33-item transaction history
    transactions = [
        {
            id: 1,
            date: "2025-10-06",
            description: "Salary Credit",
            type: "Credit",
            amount: 85000,
            balance: 458299.50,
            reference: "SAL202510060001"
        },
        {
            id: 2,
            date: "2025-10-05",
            description: "Transfer to Manoj",
            type: "Debit", 
            amount: -15000,
            balance: 373299.50,
            reference: "TXN001234567890"
        },
        {
            id: 3,
            date: "2025-10-04",
            description: "UPI Payment - Amazon",
            type: "Debit",
            amount: -1299,
            balance: 388299.50,
            reference: "UPI202510040123"
        },
        {
            id: 4,
            date: "2025-10-03",
            description: "ATM Withdrawal",
            type: "Debit",
            amount: -5000,
            balance: 389598.50,
            reference: "ATM202510030567"
        },
        {
            id: 5,
            date: "2025-10-02",
            description: "Interest Credit",
            type: "Credit",
            amount: 425.75,
            balance: 394598.50,
            reference: "INT202510020001"
        },
        {
            id: 6,
            date: "2025-09-06",
            description: "Salary Credit",
            type: "Credit",
            amount: 85000,
            balance: 394172.75,
            reference: "SAL202509060001"
        },
        {
            id: 7,
            date: "2025-09-05",
            description: "Electricity Bill Payment",
            type: "Debit",
            amount: -1780,
            balance: 309172.75,
            reference: "UPI202509050877"
        },
        {
            id: 8,
            date: "2025-09-03",
            description: "UPI Payment - Swiggy",
            type: "Debit",
            amount: -546,
            balance: 310952.75,
            reference: "UPI202509030322"
        },
        {
            id: 9,
            date: "2025-09-02",
            description: "Interest Credit",
            type: "Credit",
            amount: 398.25,
            balance: 311498.75,
            reference: "INT202509020001"
        },
        {
            id: 10,
            date: "2025-08-06",
            description: "Salary Credit",
            type: "Credit",
            amount: 85000,
            balance: 311100.50,
            reference: "SAL202508060001"
        },
        {
            id: 11,
            date: "2025-08-04",
            description: "UPI Payment - Flipkart",
            type: "Debit",
            amount: -2200,
            balance: 226100.50,
            reference: "UPI202508040543"
        },
        {
            id: 12,
            date: "2025-08-02",
            description: "Interest Credit",
            type: "Credit",
            amount: 410.30,
            balance: 228300.50,
            reference: "INT202508020001"
        },
        {
            id: 13,
            date: "2025-07-06",
            description: "Salary Credit",
            type: "Credit",
            amount: 85000,
            balance: 227890.20,
            reference: "SAL202507060001"
        },
        {
            id: 14,
            date: "2025-07-04",
            description: "UPI Payment - Zomato",
            type: "Debit",
            amount: -790,
            balance: 142890.20,
            reference: "UPI202507040654"
        },
        {
            id: 15,
            date: "2025-07-02",
            description: "Interest Credit",
            type: "Credit",
            amount: 405.50,
            balance: 143680.20,
            reference: "INT202507020001"
        },
        {
            id: 16,
            date: "2025-06-06",
            description: "Salary Credit",
            type: "Credit",
            amount: 85000,
            balance: 143274.70,
            reference: "SAL202506060001"
        },
        {
            id: 17,
            date: "2025-06-04",
            description: "UPI Payment - BigBasket",
            type: "Debit",
            amount: -1350,
            balance: 58274.70,
            reference: "UPI202506040902"
        },
        {
            id: 18,
            date: "2025-06-02",
            description: "Interest Credit",
            type: "Credit",
            amount: 392.80,
            balance: 59624.70,
            reference: "INT202506020001"
        },
        {
            id: 19,
            date: "2025-05-06",
            description: "Salary Credit",
            type: "Credit",
            amount: 85000,
            balance: 59231.90,
            reference: "SAL202505060001"
        },
        {
            id: 20,
            date: "2025-05-04",
            description: "UPI Payment - Myntra",
            type: "Debit",
            amount: -2500,
            balance: -25768.10,
            reference: "UPI202505040211"
        },
        {
            id: 21,
            date: "2025-05-02",
            description: "Interest Credit",
            type: "Credit",
            amount: 405.10,
            balance: -23268.10,
            reference: "INT202505020001"
        },
        {
            id: 22,
            date: "2025-04-06",
            description: "Salary Credit",
            type: "Credit",
            amount: 85000,
            balance: -23673.20,
            reference: "SAL202504060001"
        },
        {
            id: 23,
            date: "2025-04-04",
            description: "Transfer to Friend",
            type: "Debit",
            amount: -5000,
            balance: -108673.20,
            reference: "TXN202504040987"
        },
        {
            id: 24,
            date: "2025-04-02",
            description: "Interest Credit",
            type: "Credit",
            amount: 390.60,
            balance: -108282.60,
            reference: "INT202504020001"
        },
        {
            id: 25,
            date: "2025-03-06",
            description: "Salary Credit",
            type: "Credit",
            amount: 85000,
            balance: -108673.20,
            reference: "SAL202503060001"
        },
        {
            id: 26,
            date: "2025-03-05",
            description: "UPI Payment - Netflix",
            type: "Debit",
            amount: -699,
            balance: -193673.20,
            reference: "UPI202503050431"
        },
        {
            id: 27,
            date: "2025-03-02",
            description: "Interest Credit",
            type: "Credit",
            amount: 377.85,
            balance: -192973.20,
            reference: "INT202503020001"
        },
        {
            id: 28,
            date: "2025-02-06",
            description: "Salary Credit",
            type: "Credit",
            amount: 85000,
            balance: -193351.05,
            reference: "SAL202502060001"
        },
        {
            id: 29,
            date: "2025-02-04",
            description: "UPI Payment - Amazon",
            type: "Debit",
            amount: -1599,
            balance: -278351.05,
            reference: "UPI202502040213"
        },
        {
            id: 30,
            date: "2025-02-02",
            description: "Interest Credit",
            type: "Credit",
            amount: 368.75,
            balance: -276752.30,
            reference: "INT202502020001"
        },
        {
            id: 31,
            date: "2025-01-06",
            description: "Salary Credit",
            type: "Credit",
            amount: 85000,
            balance: -277121.05,
            reference: "SAL202501060001"
        },
        {
            id: 32,
            date: "2025-01-05",
            description: "UPI Payment - Paytm Recharge",
            type: "Debit",
            amount: -249,
            balance: -362121.05,
            reference: "UPI202501050732"
        },
        {
            id: 33,
            date: "2025-01-02",
            description: "Interest Credit",
            type: "Credit",
            amount: 350.40,
            balance: -361871.05,
            reference: "INT202501020001"
        }
    ];

    filteredTransactions = [...transactions];
}

function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const page = e.currentTarget.getAttribute('data-page');
            navigateToPage(page);
        });
    });
    
    // Quick action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const page = e.currentTarget.getAttribute('data-page');
            navigateToPage(page);
        });
    });
    
    // Profile management
    setupProfileEventListeners();
    
    // Statements functionality
    setupStatementsEventListeners();
    
    // Transfers functionality
    setupTransfersEventListeners();
    
    // Beneficiaries management
    setupBeneficiariesEventListeners();
    
    // Modal handlers
    setupModalEventListeners();
}

// Login/Logout Functions
function handleLogin(e) {
    e.preventDefault();
    
    const customerId = document.getElementById('customerId').value.trim();
    const pin = document.getElementById('pin').value.trim();
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate inputs
    let hasErrors = false;
    
    if (!customerId) {
        showFieldError('customerIdError', 'Customer ID is required');
        hasErrors = true;
    } else if (customerId !== '123456') {
        showFieldError('customerIdError', 'Invalid Customer ID. Use 123456 for demo.');
        hasErrors = true;
    }
    
    if (!pin) {
        showFieldError('pinError', 'PIN is required');
        hasErrors = true;
    } else if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        showFieldError('pinError', 'PIN must be 4 digits');
        hasErrors = true;
    } else if (pin !== '1234') {
        showFieldError('pinError', 'Invalid PIN. Use 1234 for demo.');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    // Show loading
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        
        // Check both Customer ID and PIN
        if (customerId === '123456' && pin === '1234') {
            showMainApp();
            showNotification('Login successful! Welcome to OneBank.', 'success');
        } else {
            showFieldError('pinError', 'Invalid credentials. Use Customer ID: 123456 and PIN: 1234');
        }
    }, 1000);
}

function handleLogout() {
    showLoginPage();
    // Reset form
    loginForm.reset();
    clearFormErrors();
    showNotification('Logged out successfully', 'info');
}

function showLoginPage() {
    loginPage.classList.add('active');
    loginPage.classList.remove('hidden');
    mainApp.classList.add('hidden');
    mainApp.classList.remove('active');
}

function showMainApp() {
    loginPage.classList.remove('active');
    loginPage.classList.add('hidden');
    mainApp.classList.remove('hidden');
    mainApp.classList.add('active');
    
    // Initialize dashboard
    populateRecentTransactions();
    populateBeneficiarySelect();
    renderBeneficiaries();
    renderTransactionsTable();
    updateStatementsSummary();
    updateDashboardStats();
    
    // Set default date range for statements
    setDefaultDateRange();
    
    // Navigate to dashboard
    navigateToPage('dashboard');
}

// Navigation Functions
function navigateToPage(pageName) {
    // Update navigation
    navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-page') === pageName);
    });
    
    // Update content pages
    contentPages.forEach(page => {
        if (page.id === pageName + 'Page') {
            page.classList.add('active');
            page.classList.remove('hidden');
        } else {
            page.classList.remove('active');
            page.classList.add('hidden');
        }
    });
    
    // Update breadcrumbs
    updateBreadcrumbs(pageName);
    
    // Page-specific initialization
    switch(pageName) {
        case 'statements':
            renderTransactionsTable();
            updateStatementsSummary();
            setDefaultDateRange();
            break;
        case 'beneficiaries':
            renderBeneficiaries();
            break;
        case 'transfers':
            populateBeneficiarySelect();
            break;
    }
}

function updateBreadcrumbs(pageName) {
    const pageNames = {
        'dashboard': 'Dashboard',
        'profile': 'Profile Management',
        'statements': 'Account Statements',
        'transfers': 'Money Transfer',
        'beneficiaries': 'Manage Beneficiaries'
    };
    
    breadcrumbs.innerHTML = `
        <span class="breadcrumb-item">Home</span>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-item active">${pageNames[pageName] || 'Dashboard'}</span>
    `;
}

// Dashboard Functions
function updateDashboardStats() {
    const credits = transactions.filter(t => t.type === 'Credit');
    const debits = transactions.filter(t => t.type === 'Debit');
    
    const totalCredits = credits.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const totalDebits = debits.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    document.getElementById('totalTransactions').textContent = transactions.length;
    document.getElementById('totalCredits').textContent = formatCurrency(totalCredits);
    document.getElementById('totalDebits').textContent = formatCurrency(totalDebits);
    document.getElementById('totalBeneficiaries').textContent = beneficiaries.length;
}

// Profile Management Functions
function setupProfileEventListeners() {
    // Profile tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.currentTarget.getAttribute('data-tab');
            switchProfileTab(tab);
        });
    });
    
    // Edit profile
    document.getElementById('editProfileBtn').addEventListener('click', enableProfileEdit);
    document.getElementById('cancelEditBtn').addEventListener('click', cancelProfileEdit);
    document.getElementById('profileForm').addEventListener('submit', saveProfile);
    
    // Upload picture simulation
    document.getElementById('uploadPicBtn').addEventListener('click', () => {
        showNotification('Profile picture upload feature coming soon!', 'info');
    });
    
    // Change password
    document.getElementById('changePasswordBtn').addEventListener('click', () => {
        showModal('changePasswordModal');
    });
    
    // Preferences form
    document.getElementById('preferencesForm').addEventListener('submit', savePreferences);
}

function switchProfileTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        if (content.id === tabName + 'Tab') {
            content.classList.add('active');
            content.classList.remove('hidden');
        } else {
            content.classList.remove('active');
            content.classList.add('hidden');
        }
    });
}

function enableProfileEdit() {
    const formElements = ['fullName', 'email', 'phone', 'address'];
    formElements.forEach(id => {
        const element = document.getElementById(id);
        element.removeAttribute('readonly');
    });
    
    document.getElementById('editProfileBtn').classList.add('hidden');
    document.getElementById('profileFormActions').classList.remove('hidden');
}

function cancelProfileEdit() {
    const formElements = ['fullName', 'email', 'phone', 'address'];
    formElements.forEach(id => {
        const element = document.getElementById(id);
        element.setAttribute('readonly', true);
        // Reset to original values
        switch(id) {
            case 'fullName':
                element.value = currentUser.accountHolderName;
                break;
            case 'email':
                element.value = currentUser.email;
                break;
            case 'phone':
                element.value = currentUser.phone;
                break;
            case 'address':
                element.value = currentUser.address;
                break;
        }
    });
    
    document.getElementById('editProfileBtn').classList.remove('hidden');
    document.getElementById('profileFormActions').classList.add('hidden');
}

function saveProfile(e) {
    e.preventDefault();
    
    showLoading();
    
    setTimeout(() => {
        // Update user data
        currentUser.accountHolderName = document.getElementById('fullName').value;
        currentUser.email = document.getElementById('email').value;
        currentUser.phone = document.getElementById('phone').value;
        currentUser.address = document.getElementById('address').value;
        
        // Update UI
        userName.textContent = currentUser.accountHolderName;
        
        // Disable editing
        cancelProfileEdit();
        
        hideLoading();
        showNotification('Profile updated successfully!', 'success');
    }, 1000);
}

function savePreferences(e) {
    e.preventDefault();
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showNotification('Preferences saved successfully!', 'success');
    }, 1000);
}

// Statements Functions
function setupStatementsEventListeners() {
    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
    document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);
    document.getElementById('transactionSearch').addEventListener('input', searchTransactions);
    document.getElementById('sortBy').addEventListener('change', sortTransactions);
    
    // Export buttons
    document.getElementById('downloadPdfBtn').addEventListener('click', () => downloadStatement('pdf'));
    document.getElementById('exportExcelBtn').addEventListener('click', () => downloadStatement('excel'));
    document.getElementById('exportCsvBtn').addEventListener('click', () => downloadStatement('csv'));
    
    // Period selector
    document.getElementById('statementPeriod').addEventListener('change', handlePeriodChange);
}

function setDefaultDateRange() {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    document.getElementById('fromDate').value = oneMonthAgo.toISOString().split('T')[0];
    document.getElementById('toDate').value = today.toISOString().split('T')[0];
}

function handlePeriodChange() {
    const period = document.getElementById('statementPeriod').value;
    const fromDate = document.getElementById('fromDate');
    const toDate = document.getElementById('toDate');
    
    if (period !== 'custom') {
        const today = new Date();
        let startDate = new Date();
        
        switch(period) {
            case '1month':
                startDate.setMonth(today.getMonth() - 1);
                break;
            case '3months':
                startDate.setMonth(today.getMonth() - 3);
                break;
            case '6months':
                startDate.setMonth(today.getMonth() - 6);
                break;
            case '1year':
                startDate.setFullYear(today.getFullYear() - 1);
                break;
        }
        
        fromDate.value = startDate.toISOString().split('T')[0];
        toDate.value = today.toISOString().split('T')[0];
    }
}

function applyFilters() {
    let filtered = [...transactions];
    
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const transactionType = document.getElementById('transactionType').value;
    const minAmount = parseFloat(document.getElementById('minAmount').value) || 0;
    const maxAmount = parseFloat(document.getElementById('maxAmount').value) || Infinity;
    
    // Filter by date range
    if (fromDate) {
        filtered = filtered.filter(t => t.date >= fromDate);
    }
    if (toDate) {
        filtered = filtered.filter(t => t.date <= toDate);
    }
    
    // Filter by transaction type
    if (transactionType) {
        filtered = filtered.filter(t => t.type === transactionType);
    }
    
    // Filter by amount range
    filtered = filtered.filter(t => {
        const amount = Math.abs(t.amount);
        return amount >= minAmount && amount <= maxAmount;
    });
    
    filteredTransactions = filtered;
    renderTransactionsTable();
    updateStatementsSummary();
    
    showNotification(`Found ${filtered.length} transactions matching your criteria`, 'success');
}

function resetFilters() {
    document.getElementById('statementPeriod').value = '1month';
    document.getElementById('fromDate').value = '';
    document.getElementById('toDate').value = '';
    document.getElementById('transactionType').value = '';
    document.getElementById('minAmount').value = '';
    document.getElementById('maxAmount').value = '';
    document.getElementById('transactionSearch').value = '';
    
    filteredTransactions = [...transactions];
    renderTransactionsTable();
    updateStatementsSummary();
    setDefaultDateRange();
    
    showNotification('Filters reset', 'info');
}

function searchTransactions() {
    const searchTerm = document.getElementById('transactionSearch').value.toLowerCase();
    
    if (!searchTerm) {
        filteredTransactions = [...transactions];
    } else {
        filteredTransactions = transactions.filter(t => 
            t.description.toLowerCase().includes(searchTerm) ||
            t.reference.toLowerCase().includes(searchTerm)
        );
    }
    
    renderTransactionsTable();
    updateStatementsSummary();
}

function sortTransactions() {
    const sortBy = document.getElementById('sortBy').value;
    
    filteredTransactions.sort((a, b) => {
        switch(sortBy) {
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'amount-desc':
                return Math.abs(b.amount) - Math.abs(a.amount);
            case 'amount-asc':
                return Math.abs(a.amount) - Math.abs(b.amount);
            default:
                return 0;
        }
    });
    
    renderTransactionsTable();
}

function renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    
    if (filteredTransactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No transactions found</td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredTransactions.map(transaction => `
        <tr>
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.description}</td>
            <td><span class="status status--${transaction.type.toLowerCase() === 'credit' ? 'success' : 'error'}">${transaction.type}</span></td>
            <td class="amount ${transaction.type.toLowerCase()}">${formatCurrency(transaction.amount)}</td>
            <td>${formatCurrency(transaction.balance)}</td>
            <td class="detail-value">${transaction.reference}</td>
        </tr>
    `).join('');
}

function updateStatementsSummary() {
    const credits = filteredTransactions.filter(t => t.type === 'Credit');
    const debits = filteredTransactions.filter(t => t.type === 'Debit');
    
    const totalCredits = credits.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const totalDebits = debits.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const netAmount = totalCredits - totalDebits;
    
    document.getElementById('totalCreditsSum').textContent = formatCurrency(totalCredits);
    document.getElementById('totalDebitsSum').textContent = formatCurrency(totalDebits);
    document.getElementById('netAmount').textContent = formatCurrency(netAmount);
    document.getElementById('transactionCount').textContent = filteredTransactions.length;
}

function downloadStatement(format) {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showNotification(`Statement downloaded as ${format.toUpperCase()}`, 'success');
    }, 2000);
}

// Transfers Functions
function setupTransfersEventListeners() {
    // Transfer option buttons
    document.querySelectorAll('.transfer-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const option = e.currentTarget.getAttribute('data-option');
            switchTransferOption(option);
        });
    });
    
    // Transfer forms
    document.getElementById('existingTransferForm').addEventListener('submit', handleExistingTransfer);
    document.getElementById('newTransferForm').addEventListener('submit', handleNewTransfer);
    
    // Transfer password form
    document.getElementById('transferPasswordForm').addEventListener('submit', handleTransferPasswordSubmit);
}

function switchTransferOption(option) {
    // Update option buttons
    document.querySelectorAll('.transfer-option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-option') === option);
    });
    
    // Update form containers
    document.querySelectorAll('.transfer-form-container').forEach(container => {
        if (container.id === option + 'Transfer') {
            container.classList.add('active');
            container.classList.remove('hidden');
        } else {
            container.classList.remove('active');
            container.classList.add('hidden');
        }
    });
}

function populateBeneficiarySelect() {
    const select = document.getElementById('beneficiarySelect');
    
    select.innerHTML = '<option value="">Choose beneficiary...</option>' +
        beneficiaries.map(b => `<option value="${b.id}">${b.name} (${b.nickname})</option>`).join('');
}

function handleExistingTransfer(e) {
    e.preventDefault();
    
    const beneficiaryId = document.getElementById('beneficiarySelect').value;
    const amount = parseFloat(document.getElementById('existingAmount').value);
    const mode = document.getElementById('existingTransferMode').value;
    const remarks = document.getElementById('existingRemarks').value;
    
    if (!beneficiaryId || !amount || amount <= 0) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    if (amount > currentUser.availableBalance) {
        showNotification('Insufficient balance', 'error');
        return;
    }
    
    const beneficiary = beneficiaries.find(b => b.id == beneficiaryId);
    
    // Store transfer details for password verification
    pendingTransfer = {
        type: 'existing',
        amount: amount,
        recipient: beneficiary,
        mode: mode,
        remarks: remarks
    };
    
    showTransferPasswordModal(amount, beneficiary, mode, remarks);
}

function handleNewTransfer(e) {
    e.preventDefault();
    
    const name = document.getElementById('newBeneficiaryName').value.trim();
    const accountNumber = document.getElementById('newAccountNumber').value.trim();
    const ifscCode = document.getElementById('newIfscCode').value.trim();
    const bankName = document.getElementById('newBankName').value.trim();
    const amount = parseFloat(document.getElementById('newAmount').value);
    const mode = document.getElementById('newTransferMode').value;
    const remarks = document.getElementById('newRemarks').value;
    const addToBeneficiaries = document.getElementById('addToBeneficiaries').checked;
    
    if (!name || !accountNumber || !ifscCode || !bankName || !amount || amount <= 0) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    if (amount > currentUser.availableBalance) {
        showNotification('Insufficient balance', 'error');
        return;
    }
    
    const recipient = { name, accountNumber, ifscCode, bankName };
    
    // Store transfer details for password verification
    pendingTransfer = {
        type: 'new',
        amount: amount,
        recipient: recipient,
        mode: mode,
        remarks: remarks,
        addToBeneficiaries: addToBeneficiaries
    };
    
    showTransferPasswordModal(amount, recipient, mode, remarks);
}

function showTransferPasswordModal(amount, recipient, mode, remarks) {
    const detailsContainer = document.getElementById('transferDetails');
    detailsContainer.innerHTML = `
        <div class="transfer-detail-row">
            <span class="transfer-detail-label">Recipient:</span>
            <span class="transfer-detail-value">${recipient.name}</span>
        </div>
        <div class="transfer-detail-row">
            <span class="transfer-detail-label">Amount:</span>
            <span class="transfer-detail-value">${formatCurrency(amount)}</span>
        </div>
        <div class="transfer-detail-row">
            <span class="transfer-detail-label">Mode:</span>
            <span class="transfer-detail-value">${mode}</span>
        </div>
        ${remarks ? `<div class="transfer-detail-row">
            <span class="transfer-detail-label">Remarks:</span>
            <span class="transfer-detail-value">${remarks}</span>
        </div>` : ''}
    `;
    
    showModal('transferPasswordModal');
}

function handleTransferPasswordSubmit(e) {
    e.preventDefault();
    
    const password = document.getElementById('transferPassword').value;
    
    if (password !== 'mypassword123') {
        showNotification('Invalid transfer password. Use: mypassword123', 'error');
        return;
    }
    
    hideModal('transferPasswordModal');
    processTransfer(pendingTransfer);
}

function processTransfer(transfer) {
    showLoading();
    
    setTimeout(() => {
        // Update balance
        currentUser.availableBalance -= transfer.amount;
        document.getElementById('availableBalance').textContent = formatCurrency(currentUser.availableBalance);
        
        // Add transaction record
        const newTransaction = {
            id: transactions.length + 1,
            date: new Date().toISOString().split('T')[0],
            description: `Transfer to ${transfer.recipient.name}`,
            type: 'Debit',
            amount: -transfer.amount,
            balance: currentUser.availableBalance,
            reference: `TXN${Date.now()}`
        };
        
        transactions.unshift(newTransaction);
        filteredTransactions = [...transactions];
        
        // Update displays
        populateRecentTransactions();
        renderTransactionsTable();
        updateStatementsSummary();
        updateDashboardStats();
        
        // Reset forms
        document.getElementById('existingTransferForm').reset();
        document.getElementById('newTransferForm').reset();
        document.getElementById('transferPassword').value = '';
        
        // Add to beneficiaries if requested
        if (transfer.addToBeneficiaries && transfer.type === 'new') {
            addNewBeneficiary({
                name: transfer.recipient.name,
                accountNumber: transfer.recipient.accountNumber,
                ifscCode: transfer.recipient.ifscCode,
                bankName: transfer.recipient.bankName,
                branch: 'Unknown',
                nickname: ''
            });
        }
        
        hideLoading();
        showSuccessPage(transfer);
    }, 2000);
}

function showSuccessPage(transfer) {
    const successDetails = document.getElementById('successDetails');
    successDetails.innerHTML = `
        <div class="success-detail-row">
            <span class="success-detail-label">Transaction Reference:</span>
            <span class="success-detail-value">TXN${Date.now()}</span>
        </div>
        <div class="success-detail-row">
            <span class="success-detail-label">Recipient:</span>
            <span class="success-detail-value">${transfer.recipient.name}</span>
        </div>
        <div class="success-detail-row">
            <span class="success-detail-label">Amount:</span>
            <span class="success-detail-value">${formatCurrency(transfer.amount)}</span>
        </div>
        <div class="success-detail-row">
            <span class="success-detail-label">Mode:</span>
            <span class="success-detail-value">${transfer.mode}</span>
        </div>
        <div class="success-detail-row">
            <span class="success-detail-label">Date:</span>
            <span class="success-detail-value">${formatDate(new Date().toISOString().split('T')[0])}</span>
        </div>
    `;
    
    navigateToPage('success');
    showNotification('Transfer completed successfully!', 'success');
}

// Beneficiaries Functions
function setupBeneficiariesEventListeners() {
    document.getElementById('addBeneficiaryBtn').addEventListener('click', () => {
        openBeneficiaryModal();
    });
    
    document.getElementById('beneficiaryForm').addEventListener('submit', saveBeneficiary);
}

function renderBeneficiaries() {
    const grid = document.getElementById('beneficiariesGrid');
    
    if (beneficiaries.length === 0) {
        grid.innerHTML = '<p>No beneficiaries found. Add your first beneficiary to get started.</p>';
        return;
    }
    
    grid.innerHTML = beneficiaries.map(beneficiary => `
        <div class="beneficiary-card">
            <div class="beneficiary-header">
                <div class="beneficiary-info">
                    <h3>${beneficiary.name}</h3>
                    <p class="beneficiary-nickname">${beneficiary.nickname || 'No nickname'}</p>
                </div>
                <div class="beneficiary-actions">
                    <button class="icon-btn" onclick="editBeneficiary(${beneficiary.id})" title="Edit">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="icon-btn" onclick="deleteBeneficiary(${beneficiary.id})" title="Delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
            <div class="beneficiary-details">
                <div class="detail-row">
                    <span class="detail-label">Account Number</span>
                    <span class="detail-value">****${beneficiary.accountNumber.slice(-4)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">IFSC Code</span>
                    <span class="detail-value">${beneficiary.ifscCode}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Bank</span>
                    <span class="detail-value">${beneficiary.bankName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Branch</span>
                    <span class="detail-value">${beneficiary.branch}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function openBeneficiaryModal(beneficiary = null) {
    const modal = document.getElementById('beneficiaryModal');
    const title = document.getElementById('beneficiaryModalTitle');
    const form = document.getElementById('beneficiaryForm');
    
    if (beneficiary) {
        title.textContent = 'Edit Beneficiary';
        document.getElementById('beneficiaryId').value = beneficiary.id;
        document.getElementById('beneficiaryName').value = beneficiary.name;
        document.getElementById('beneficiaryNickname').value = beneficiary.nickname || '';
        document.getElementById('beneficiaryAccount').value = beneficiary.accountNumber;
        document.getElementById('beneficiaryIfsc').value = beneficiary.ifscCode;
        document.getElementById('beneficiaryBank').value = beneficiary.bankName;
        document.getElementById('beneficiaryBranch').value = beneficiary.branch;
    } else {
        title.textContent = 'Add New Beneficiary';
        form.reset();
        document.getElementById('beneficiaryId').value = '';
    }
    
    showModal('beneficiaryModal');
}

function editBeneficiary(id) {
    const beneficiary = beneficiaries.find(b => b.id === id);
    if (beneficiary) {
        openBeneficiaryModal(beneficiary);
    }
}

function deleteBeneficiary(id) {
    const beneficiary = beneficiaries.find(b => b.id === id);
    if (beneficiary) {
        showConfirmation(
            'Delete Beneficiary',
            `Are you sure you want to delete ${beneficiary.name}?`,
            () => {
                beneficiaries = beneficiaries.filter(b => b.id !== id);
                renderBeneficiaries();
                populateBeneficiarySelect();
                updateDashboardStats();
                showNotification('Beneficiary deleted successfully', 'success');
            }
        );
    }
}

function saveBeneficiary(e) {
    e.preventDefault();
    
    const id = document.getElementById('beneficiaryId').value;
    const name = document.getElementById('beneficiaryName').value.trim();
    const nickname = document.getElementById('beneficiaryNickname').value.trim();
    const accountNumber = document.getElementById('beneficiaryAccount').value.trim();
    const ifscCode = document.getElementById('beneficiaryIfsc').value.trim();
    const bankName = document.getElementById('beneficiaryBank').value.trim();
    const branch = document.getElementById('beneficiaryBranch').value.trim();
    
    if (!name || !accountNumber || !ifscCode || !bankName || !branch) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        if (id) {
            // Edit existing beneficiary
            const index = beneficiaries.findIndex(b => b.id == id);
            if (index !== -1) {
                beneficiaries[index] = { ...beneficiaries[index], name, nickname, accountNumber, ifscCode, bankName, branch };
            }
        } else {
            // Add new beneficiary
            const newBeneficiary = {
                id: Math.max(...beneficiaries.map(b => b.id), 0) + 1,
                name,
                nickname,
                accountNumber,
                ifscCode,
                bankName,
                branch
            };
            beneficiaries.push(newBeneficiary);
        }
        
        renderBeneficiaries();
        populateBeneficiarySelect();
        updateDashboardStats();
        hideModal('beneficiaryModal');
        hideLoading();
        
        showNotification(`Beneficiary ${id ? 'updated' : 'added'} successfully!`, 'success');
    }, 1000);
}

function addNewBeneficiary(beneficiaryData) {
    const newBeneficiary = {
        id: Math.max(...beneficiaries.map(b => b.id), 0) + 1,
        ...beneficiaryData
    };
    
    beneficiaries.push(newBeneficiary);
    renderBeneficiaries();
    populateBeneficiarySelect();
    updateDashboardStats();
    
    showNotification('Beneficiary added successfully!', 'success');
}

// Modal Functions
function setupModalEventListeners() {
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.currentTarget.closest('.modal');
            hideModal(modal.id);
        });
    });
    
    // Click outside to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal.id);
            }
        });
    });
    
    // Change password form
    document.getElementById('changePasswordForm').addEventListener('submit', handleChangePassword);
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    
    // Focus first input
    const firstInput = modal.querySelector('input:not([type="hidden"])');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
    
    // Reset form if it exists
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
    }
}

function showConfirmation(title, message, onConfirm) {
    document.getElementById('confirmationTitle').textContent = title;
    document.getElementById('confirmationMessage').textContent = message;
    
    const confirmBtn = document.getElementById('confirmActionBtn');
    confirmBtn.onclick = () => {
        onConfirm();
        hideModal('confirmationModal');
    };
    
    showModal('confirmationModal');
}

function handleChangePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        hideModal('changePasswordModal');
        showNotification('Password changed successfully!', 'success');
    }, 1500);
}

// Utility Functions
function populateRecentTransactions() {
    const container = document.getElementById('recentTransactionsList');
    const recentTransactions = transactions.slice(0, 5);
    
    container.innerHTML = recentTransactions.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-info">
                <h4>${transaction.description}</h4>
                <p>${transaction.reference}</p>
            </div>
            <div class="transaction-amount">
                <span class="amount ${transaction.type.toLowerCase()}">${formatCurrency(transaction.amount)}</span>
                <span class="date">${formatDate(transaction.date)}</span>
            </div>
        </div>
    `).join('');
}

function formatCurrency(amount) {
    return '₹' + Math.abs(amount).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notificationMessage');
    
    messageElement.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 4000);
}

function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    errorElement.textContent = message;
}

function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(element => {
        element.textContent = '';
    });
}
