import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';

import { motion } from "framer-motion";
import { pageVariants, pageTransition } from 'animation/page';

import { getAllCurrentAsset, getMyAssetSelector, getMyUpbitToken } from './slice/selectors';
import { useDispatch, useSelector } from 'react-redux';

import UpbitService from 'api/upbit/upbit.service';

import CoinCard from '../../components/CoinCard';
import Dashboard from '../../components/Dashboard';
import { useHomepageSlice } from './slice';
import { ICurrentAsset } from './slice/types';

interface ICoin {
  avg_buy_price: number;
  balance: number;
  currency: string;
  unit_currency: string;
}

const AppWrapper = styled.div`
  max-width: calc(1280px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const Box = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 25px;
  flex-direction: column;
  margin-top: 150px;
  background-color: #e4e4e4;
  box-shadow: 0px 20px 80px -35px rgba(0,0,0,0.4);
`;

const MainTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 900;
`;

const SubTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 900;
`;

const LeftWrapper = styled.div`

`;

const RightWrapper = styled.div`
  width: 100%;
  margin-left: 15px;
  @media only screen and (max-width: 1315px) {
    width: calc(100% - 325px);
  }
  @media only screen and (max-width: 900px) {
    width: 100%;
    margin-left: 0;
  }
`;

const SideLayout = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1315px) {
    justify-content: flex-start;
  }
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export function HomePage() {

  const upbit_jwt_token = useSelector(getMyUpbitToken);
  const myAsset = useSelector(getMyAssetSelector);
  const dispatch = useDispatch();
  const { actions } = useHomepageSlice();
  const currentAsset = useSelector(getAllCurrentAsset) as ICurrentAsset[];

  const [currentCoin, setCurrentCoin] = React.useState(null);

  React.useEffect(() => {

    if (upbit_jwt_token === undefined) return;

    dispatch(actions.loadMyAsset());

  }, [upbit_jwt_token]);

  React.useEffect(() => {
    if (myAsset === []) return;
    dispatch(actions.loadCurrentAsset());
  }, [myAsset])

  let allAmount = 0;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Helmet>
        <title>Main</title>
        <meta name="description" content="Open Coin Homepage" />
      </Helmet>
      <AppWrapper className='fadeInUp'>
        <Box>
          <Title>MY CURRENT ASSETS</Title>
          {myAsset?.map(asset => {
            if (asset.currency === 'KRW') {
              allAmount = asset.balance * 1;
              return;
            }
            let currentAssetValue = currentAsset.find(realtimeAsset => realtimeAsset.market === `KRW-${asset.currency}`);
            allAmount += asset.balance * (currentAssetValue === undefined ? 0 : currentAssetValue.trade_price);
          })}
          <MainTitle>₩ {allAmount.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</MainTitle>
        </Box>

        <SideLayout>
          <LeftWrapper>
            {myAsset?.map((coin: ICoin) => {
              return (<CoinCard
                currentCoin={currentCoin}
                setCurrentCoin={setCurrentCoin}
                avg_buy_price={coin.avg_buy_price}
                balance={coin.balance}
                currency={coin.currency}
                unit_currency={coin.unit_currency}
              />)
            })}
          </LeftWrapper>
          <RightWrapper>
            <Dashboard
              myAsset={myAsset}
              currentCoin={currentCoin} />
          </RightWrapper>
        </SideLayout>
      </AppWrapper>
    </motion.div>
  );
}
