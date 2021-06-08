import styled from 'styled-components';

export default styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  z-index: 1;
  padding: 0 36px;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media only screen and (max-width: 688px) {
    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;