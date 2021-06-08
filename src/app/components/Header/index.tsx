import * as React from 'react';
import styled from 'styled-components/macro';
import Box from './box';
import Logo from '../Logo';
import { 
    getIsLogin,
    getUser
} from '../../pages/HomePage/slice/selectors';
import { useSelector } from 'react-redux';

export default function Header() {

    const isLogin = useSelector(getIsLogin);
    const user = useSelector(getUser);

    return (
        <div>
            <Box>
                <Logo/>
                { isLogin ? (
                    <>
                    { user?.nickname }
                    </>
                ) :
                    null
                }
            </Box>
        </div>
    );
}   