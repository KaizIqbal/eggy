import styled from "styled-components";

const CursorList = styled.ol`
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: 1rem;
  text-align: center;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
`;

const CursorCard = styled.div`
  background-color: #1fd234;
  border: solid;
`;

const Heading = styled.div`
  font-size: 20px;
  background-color: #ec6d34;
`;

const Body = styled.div`
  height: 5rem;
  background-color: #83ffff;
  display: inline-block;
`;

const Actions = styled.div`
  display: flex;
`;

export { CursorList, CursorCard, Heading, Body, Actions };
