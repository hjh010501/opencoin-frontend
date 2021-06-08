/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import Background from 'app/components/Background';

import { HomePage } from './pages/HomePage/Loadable';
import { SignPage } from './pages/SignPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';

import { AnimatePresence } from "framer-motion";

import Header from 'app/components/Header';
import { useHomepageSlice } from './pages/HomePage/slice';
import { getIsLogin } from './pages/HomePage/slice/selectors';
import { useSelector } from 'react-redux';

export function App() {

  // const location = useLocation();
  const { i18n } = useTranslation();
  const { actions } = useHomepageSlice();

  const isLogin = useSelector(getIsLogin);

  return (
    <>
      <Helmet
        titleTemplate="%s - OpenCoin"
        defaultTitle="OpenCoin"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="OpenCoin" />
      </Helmet>
      <Background />
      <AnimatePresence exitBeforeEnter>

        <BrowserRouter>
          <Header />
          <Switch>
            {isLogin ?
              (
                <Route exact path="/" component={HomePage} />
              ) :
              (
                <Route exact path="/" component={SignPage} />
              )}
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </AnimatePresence>
      <GlobalStyle />
    </>
  );
}
