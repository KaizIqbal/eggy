import styled from "styled-components";

const CursorList = styled.ol`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
`;

const CursorCard = styled.div`
  height: auto;
  border: solid;
  background-color: #1fd234;
`;

const Heading = styled.div`
  font-size: 20px;
  text-align: center;
  background-color: #ec6d34;
`;

const Body = styled.div`
  width: 100%;
  height: 7em;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 50%;
    height: auto;
  }

  button[type="submit"] {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: #555;
    color: red;
    font-size: 16px;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  &:hover button {
    opacity: 1;
  }
`;

const Actions = styled.div`
  display: flex;
`;

export { CursorList, CursorCard, Heading, Body, Actions };
