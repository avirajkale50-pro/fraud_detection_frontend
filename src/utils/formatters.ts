
export const formatDate = (dateString: string | undefined | null, format: 'short' | 'long' = 'short'): string => {
    if (!dateString) {
        return 'N/A';
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = format === 'short'
        ? {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        : {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatCurrency = (amount: number | undefined | null, currency: string = 'INR'): string => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return 'N/A';
    }

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
    }).format(amount);
};

export const formatEnumValue = (value: string | undefined | null): string => {
    if (!value) {
        return 'N/A';
    }

    return value
        .replace(/_/g, ' ')
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
