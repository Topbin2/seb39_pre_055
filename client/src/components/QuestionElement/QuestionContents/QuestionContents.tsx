import styled from 'styled-components';

interface Prop {
  contents: string;
  txt: string;
  limitLength: any;
  lastTxt: string;
}

const Container = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 13.5px;
  color: var(--black-700);
  margin-bottom: 8px;
  padding-right: 23px;
  line-height: 17px;
  @media (max-width: 640px) {
    font-size: 11px;
  }
`;

const QuestionContents = ({ contents, txt, limitLength, lastTxt }: Prop) => {
  if (limitLength === '' || limitLength === null) {
    limitLength = 182;
  }
  if (lastTxt === '' || lastTxt === null) {
    lastTxt = '...';
  }
  if (contents.length > limitLength) {
    txt = contents.slice(0, limitLength) + lastTxt;
  }
  contents = txt;
  return <Container>{contents}</Container>;
};

export default QuestionContents;
