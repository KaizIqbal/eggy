import styled, { css } from "styled-components";

// input text
const InlineEditStyle = css`
  text-align: left;
  font: inherit;
  color: inherit;
  text-align: inherit;
  padding: 0;
  background: none;
  border: none;
  border-bottom: 1px dashed #999999;
  outline: none;
`;

const activeInput = css`
  cursor: pointer;
`;

const activeText = css`
  border-bottom: 1px solid #666666;
  text-align: left;
`;

const hidden = css`
  display: none;
`;

const InlineEditText = styled.span`
  ${InlineEditStyle}
`;

const InlineEditInput = styled.input`
  ${InlineEditStyle}
`;
const InlineSpan = styled.span``;

export {
  InlineSpan,
  InlineEditText,
  InlineEditInput,
  activeInput,
  activeText,
  hidden
};
