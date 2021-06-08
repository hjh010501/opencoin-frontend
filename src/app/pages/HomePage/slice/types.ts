export interface IMyAsset {
    currency: string;
    balance: number;
    locked: number;
    avg_buy_price: number;
    avg_buy_price_modified: boolean;
    unit_currency: string;
}

export interface ICurrentAsset {
    type: string;
    market: string;
    code: string;
    timestamp: number;
    trade_date: Date;
    trade_time: string;
    trade_timestamp: number;
    trade_price: number;
    trade_volume: number;
    ask_bid: string;
    prev_closing_price: number;
    change: string;
    change_price: number;
    sequential_id: number;
    stream_type: string;
}

export interface HomepageState {
    is_login: boolean;
    user: {
        jwt: string;
        email: string;
        nickname: string;
        upbit_jwt_token: string;
    },
    myAsset: Array<IMyAsset>,
    currentAsset: Array<ICurrentAsset>,
    error: string | null;
}