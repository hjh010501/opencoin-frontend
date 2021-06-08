import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import SignForm from 'app/components/SignForm';
import styled from 'styled-components/macro';

import { motion } from "framer-motion";
import { pageVariants, pageTransition } from 'animation/page';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function SignPage() {

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Helmet>
          <title>Sign Page</title>
          <meta name="description" content="Sign up/in page" />
      </Helmet>
      
      <Wrapper>      
        <SignForm />
      </Wrapper>
    </motion.div>
  );
}
