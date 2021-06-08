import { getCurrentAsset } from 'app/pages/HomePage/slice/selectors';
import { ICurrentAsset } from 'app/pages/HomePage/slice/types';
import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import Coinlogo from './coinlogo';

interface IProfitRate {
    isRise: boolean;
}

interface ICoinCard {
    isCurrentCoin: boolean;
}

const Box = styled.div<ICoinCard>`
  width: 300px;
  display: flex;
  padding: 15px;
  flex-direction: column;
  margin-top: 25px;
  background-color: ${props => props.isCurrentCoin ? '#e4e4e4' : '#e4e4e4'};
  border: ${props => props.isCurrentCoin ? '3px solid #036bfc' : 'none'};
  box-shadow: 0px 10px 50px -20px rgba(0,0,0,0.4);
  transition: .2s;
  &:hover {
      transform: scale(1.1)
  }
`;

const ProfitRate = styled.div<IProfitRate>`
    font-size: 1rem;
    font-weight: 900;
    color: ${props => props.isRise ? '#fc0320' : '#036bfc'};
`;

const Title = styled.div`
    font-size: 1rem;
    font-weight: 900;
`;

export default function CoinCard({
    currentCoin,
    setCurrentCoin,
    avg_buy_price,
    balance,
    currency,
    unit_currency
}: any) {

    const currentAsset = useSelector(getCurrentAsset(`KRW-${currency}`)) as ICurrentAsset;
    let pastValue = (parseFloat(balance) * parseFloat(avg_buy_price)).toFixed(2).toLocaleString();
    let nowValue = currentAsset !== undefined ? (parseFloat(balance) * currentAsset.trade_price).toFixed(2) : 'loading';
    let profitRate = currentAsset !== undefined ? (currentAsset.trade_price / avg_buy_price - 1) * 100 : null;
    return (
        <Box onClick={() => {
            if (currency === 'KRW') return;
            setCurrentCoin(`KRW-${currency}`)
        }} isCurrentCoin={currentCoin === `KRW-${currency}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <Coinlogo image={`https://static.upbit.com/logos/${currency}.png`} />
                    <Title style={{ marginLeft: '10px' }}>{parseFloat(balance).toFixed(5).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} {currency}</Title>
                </div>
                {currency === 'KRW' ? null : (
                    <ProfitRate style={{ marginLeft: '10px' }} isRise={profitRate !== null ? profitRate > 0 : false}>{profitRate?.toFixed(2)}%</ProfitRate>
                )}
            </div>
            { currency === 'KRW' ? null : (
                <>
                    <div style={{ display: 'flex' }}>
                        <Title style={{ fontWeight: 400 }}>₩ {avg_buy_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ➡️ ₩ {currentAsset !== undefined ? currentAsset.trade_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : 'loading'}</Title>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Title style={{ fontWeight: 400 }}>₩ {pastValue.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ➡️ ₩ {nowValue.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Title>
                    </div>
                </>
            )}

        </Box>
    );
}