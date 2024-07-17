export const getDate = () => {
    const date = new Date();

    const format = (date: Date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const currentDate = format(date);

    const lastYearDate = format(new Date(date.getFullYear() - 1, date.getMonth(), date.getDate()));
    const nextYearDate = format(new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()));

    return {
        currentDate,
        lastYearDate,
        nextYearDate,
    };
};

export const formatCurrency = (value: number) => {
    return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
    });
};

export const calculatePercentage = (income: number, balance: number) => {
    const percentage = Math.round((balance / income) * 100);

    return percentage;
};
