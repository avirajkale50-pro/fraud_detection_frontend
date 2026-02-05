

export const APP_CONFIG = {
    NAME: 'PayShield',
    COPYRIGHT_YEAR: new Date().getFullYear(),
} as const;

/**
 * Mock transaction data for homepage animation
 */
export const MOCK_TRANSACTIONS = [
    { id: 'TXN-4521', amount: '₹245.00', status: 'approved', time: '2m ago' },
    { id: 'TXN-4522', amount: '₹1,890.50', status: 'flagged', time: '3m ago' },
    { id: 'TXN-4523', amount: '₹67.25', status: 'approved', time: '5m ago' },
    { id: 'TXN-4524', amount: '₹3,200.00', status: 'flagged', time: '7m ago' },
    { id: 'TXN-4525', amount: '₹156.80', status: 'approved', time: '9m ago' },
    { id: 'TXN-4526', amount: '₹892.00', status: 'approved', time: '11m ago' },
    { id: 'TXN-4527', amount: '₹45.99', status: 'approved', time: '13m ago' },
    { id: 'TXN-4528', amount: '₹5,600.00', status: 'flagged', time: '15m ago' },
    { id: 'TXN-4529', amount: '₹234.50', status: 'approved', time: '17m ago' },
    { id: 'TXN-4530', amount: '₹789.00', status: 'approved', time: '19m ago' },
] as const;
