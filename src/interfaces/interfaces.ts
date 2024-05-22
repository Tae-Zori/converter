export interface CurrencyData {
    Date: string;
    PreviousDate: string;
    PreviousURL: string;
    Timestamp: string;
    Valute: Currency;
}

export interface Currency {
    [key: string]: InfoCurrency;
}
export interface InfoCurrency {
    ID: string;
    NumCode?: string;
    CharCode: string;
    Nominal: number;
    Name: string;
    Value: number;
    Previous: number;
}
