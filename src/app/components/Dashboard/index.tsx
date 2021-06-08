import { getCurrentAsset } from 'app/pages/HomePage/slice/selectors';
import { ICurrentAsset, IMyAsset } from 'app/pages/HomePage/slice/types';
import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import Coinlogo from './coinlogo';

import './index.css';

declare var TradingView: any;

interface IProfitRate {
    isRise: boolean;
}

const Box = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 20px;
  flex-direction: column;
  margin-top: 25px;

  background-color: #e4e4e4;
  box-shadow: 0px 10px 50px -30px rgba(0,0,0,0.4);
`;

const ProfitRate = styled.div<IProfitRate>`
    font-size: 1.3rem;
    font-weight: 900;
    color: ${props => props.isRise ? '#fc0320' : '#036bfc'};
`;

const Title = styled.div`
    font-size: 1.3rem;
    font-weight: 900;
`;

const Loadable = styled.div`
    font-size: 1.2rem;
    width: 100%;
    height: 500px;
    text-align: center;
    display:flex;
    justify-content: center;
    align-items: center;
`;

export default function Dashboard({
    myAsset,
    currentCoin,
}: any) {


    const [currentMyAssetData, setCurrentMyAssetData] = React.useState<IMyAsset>({
        currency: '',
        balance: 0,
        locked: 0,
        avg_buy_price: 0,
        avg_buy_price_modified: false,
        unit_currency: ''
    });

    const currentAsset = useSelector(getCurrentAsset(`KRW-${currentCoin === null ? '' : currentCoin.replace('KRW-', '')}`)) as ICurrentAsset;

    let pastValue = (currentMyAssetData.balance * currentMyAssetData.avg_buy_price).toFixed(2).toLocaleString();
    let nowValue = currentAsset !== undefined ? (currentMyAssetData.balance * currentAsset.trade_price).toFixed(2) : 'loading';
    let profitRate = currentAsset !== undefined ? (currentAsset.trade_price / currentMyAssetData.avg_buy_price - 1) * 100 : null;

    React.useEffect(() => {
        if (currentCoin === null) return;
        new TradingView.widget(
            {
                "width": '100%',
                "symbol": `${currentCoin.replace('KRW-', '')}KRW`,
                "interval": "D",
                "timezone": "Asia/Seoul",
                "theme": "light",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "hide_side_toolbar": false,
                "enable_publishing": false,
                "allow_symbol_change": false,
                "details": true,
                "container_id": "tradingview_2aef3"
            }
        );
        setCurrentMyAssetData(myAsset.find(coin => coin.currency === currentCoin.replace('KRW-', '')))

    }, [currentCoin])

    return (


        <Box>
            {
                currentCoin === null ? (
                    <Loadable>
                        Select your cryptocurrency 😎
                    </Loadable>
                ) : (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Coinlogo image={`https://static.upbit.com/logos/${currentMyAssetData.currency}.png`} />
                                <Title style={{ marginLeft: '10px' }}>{currentMyAssetData.balance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} {currentMyAssetData.currency}</Title>
                            </div>
                            <ProfitRate style={{ marginLeft: '10px' }} isRise={profitRate !== null ? profitRate > 0 : false}>{profitRate?.toFixed(2)}%</ProfitRate>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Title style={{ fontWeight: 400 }}>₩ {currentMyAssetData.avg_buy_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ➡️ ₩ {currentAsset !== undefined ? currentAsset.trade_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : 'loading'}</Title>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Title style={{ fontWeight: 400 }}>₩ {pastValue.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ➡️ ₩ {nowValue.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Title>
                        </div>
                        <div className="tradingview-widget-container">
                            <div id="tradingview_2aef3"></div>
                        </div>
                    </>
                )
            }

        </Box>
    );
}