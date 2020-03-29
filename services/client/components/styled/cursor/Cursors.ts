import styled from "styled-components";

const CursorList = styled.ol`
  margin: 0;
  padding: 0;
  display: grid;
  grid-column-gap: 0.3rem;
`;

const CursorCard = styled.div`
  background-color: #1fd234;
  margin: 0.5em 0;
  border-style: solid;
`;

const Heading = styled.p`
  background-color: #136234;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.4rem;
  text-transform: uppercase;
`;

const Body = styled.div`
  background-color: #83ffff;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.4rem;
  text-transform: uppercase;
`;

const Actions = styled.div`
  display: flex;
`;

export { CursorList, CursorCard, Heading, Body, Actions };
