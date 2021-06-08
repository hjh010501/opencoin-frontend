import * as React from 'react';
import styled from 'styled-components/macro';
import { Tabs, Tab } from "baseui/tabs-motion";

import { Input } from "baseui/input";
import { Block } from 'baseui/block';
import { Button } from "baseui/button";

import AuthService from 'api/auth/auth.service';

import { useDispatch } from 'react-redux';
import { useHomepageSlice } from '../../pages/HomePage/slice';

import { useHistory } from 'react-router-dom';

import doToast from '../Toast';

const Box = styled.div`
  width: 400px;
  background-color: #e4e4e4;
  box-shadow: 0px 20px 80px -35px rgba(0,0,0,0.4);
`;

export default function SignForm() {

    const { actions } = useHomepageSlice();
    const dispatch = useDispatch();
    const history = useHistory();

    const [activeKey, setActiveKey] = React.useState<string | number | undefined>("0");

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [regEmail, setRegEmail] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [firstPassword, setFirstPassword] = React.useState("");
    const [secondPassword, setSecondPassword] = React.useState("");
    const [upbitToken, setUpbitToken] = React.useState("");
    
    const doSignIn = async () => {
        const result = await AuthService.login(email, password);
        if(result){
          dispatch(actions.doLogin(result));
          doToast('Login', `Hello ${result.user.profile.nickname}!`, 'success');
          history.push('/');
        }
    }
    
    const doSignUp = async () => {
        const result = await AuthService.register(regEmail, firstPassword, secondPassword, nickname, upbitToken);
        if(result){
          doToast('Sign up', `Sign up complete`, 'success');
          setActiveKey("0")
        }
    }

    return (
        <>
        <Box className='fadeInUp'>
            <Tabs
              activeKey={activeKey}
              onChange={({ activeKey }) => {
                setActiveKey(activeKey);
              }}
              activateOnFocus
              overrides={{
                TabList: {
                  style: ({ $theme }) => ({
                    backgroundColor: '#fff'
                  })
                }
              }}
            >
              <Tab title="Sign In">
                <Input
                  value={email}
                  onChange={e => setEmail((e.target as HTMLTextAreaElement).value)}
                  placeholder="Email"
                  clearOnEscape
                />
                <Block marginBottom="10px"/>
                <Input
                  value={password}
                  onChange={e => setPassword((e.target as HTMLTextAreaElement).value)}
                  placeholder="Password"
                  type="password"
                  clearOnEscape
                />
                <Block marginBottom="10px"/>
                <Button $style={{float: 'right', marginBottom: '10px'}} onClick={() => doSignIn()}>
                    SIGN IN
                </Button>
              </Tab>
              <Tab title="Sign up">
                <Input
                  value={regEmail}
                  onChange={e => setRegEmail((e.target as HTMLTextAreaElement).value)}
                  placeholder="Email"
                  clearOnEscape
                />
                <Block marginBottom="10px"/>
                <Input
                  value={nickname}
                  onChange={e => setNickname((e.target as HTMLTextAreaElement).value)}
                  placeholder="Nickname"
                  clearOnEscape
                />
                <Block marginBottom="10px"/>
                <Input
                  value={firstPassword}
                  onChange={e => setFirstPassword((e.target as HTMLTextAreaElement).value)}
                  placeholder="Password"
                  type="password"
                  clearOnEscape
                />
                <Block marginBottom="10px"/>
                <Input
                  value={secondPassword}
                  onChange={e => setSecondPassword((e.target as HTMLTextAreaElement).value)}
                  placeholder="Re-Type Password"
                  type="password"
                  clearOnEscape
                />
                <Block marginBottom="10px"/>
                <Input
                  value={upbitToken}
                  onChange={e => setUpbitToken((e.target as HTMLTextAreaElement).value)}
                  placeholder="Upbit Token"
                  clearOnEscape
                />
                <Block marginBottom="10px"/>
                <Button $style={{float: 'right', marginBottom: '10px'}} onClick={() => doSignUp()}>
                    SIGN UP
                </Button>
              </Tab>
            </Tabs>
            
        </Box>
        </>
    );
}   