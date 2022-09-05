import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  width: 100%;
  height: auto;
`;

export const STitleLink = styled(Link)`
  margin-bottom: 5px;
  font-size: 17px;
  line-height: 1.4rem;
  color: var(--blue-600);

  &:link,
  &:visited {
    color: var(--blue-600);
  }

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

export const STextP = styled.p`
  font-size: 14px;
  color: var(--black-700);
  margin-bottom: 8px;
  padding-right: 23px;
  line-height: 1.3rem;
  max-height: 43px;
  width: calc(100%);
  overflow: hidden;

  @media (max-width: 640px) {
    font-size: 12px;
  }
`;

export const ContentFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-right: 23px;
`;

export const Tags = styled.div`
  display: flex;
  @media (max-width: 640px) {
    margin-bottom: 5px;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px 0px auto;
  font-size: 12px;

  justify-content: space-between;
  flex-wrap: wrap;

  img {
    margin: 5px 5px 5px 0px;
  }
  div {
    margin-right: 5px;
  }
  @media (max-width: 640px) {
  }
`;

export const UserName = styled.div`
  color: var(--blue-600);
  width: auto;
`;

export const UserAsked = styled.div`
  color: var(--black-600);
`;