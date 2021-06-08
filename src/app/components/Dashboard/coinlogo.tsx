import styled from 'styled-components';

export default styled.div<{ image: string }>`
  width: 32px;
  height: 32px;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;