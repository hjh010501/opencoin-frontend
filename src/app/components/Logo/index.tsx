import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Text = styled.div`
  font-size: 2rem;
  font-weight: 300;
`;

export default function Logo(props) {
    return (
      <Link to='/'>
        <Text>
          OPEN<span style={{fontWeight: 900, color: '#0273FF'}}>COIN</span>
        </Text>
      </Link>
    
    );
}