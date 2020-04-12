import styled from "styled-components";

const PopupContainer = styled.div`
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopupInner = styled.div`
  position: absolute;
  left: 15%;
  right: 15%;
  top: 7%;
  bottom: 7%;
  margin: auto;
  border-radius: 20px;
  background: white;
  text-align: center;
  align-content: center;
`;

export { PopupContainer, PopupInner };
