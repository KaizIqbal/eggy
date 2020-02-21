import styled, { css } from "styled-components";

//  these make sure it can work in any text element
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

const InlineEditText = styled.span<{ isHidden: boolean }>`
  ${InlineEditStyle}
  ${props => (!props.isHidden ? activeInput : hidden)}
`;

const InlineEditInput = styled.input<{ isActive: boolean }>`
  ${InlineEditStyle}
  ${props => (props.isActive ? activeInput : hidden)}
`;

export { InlineEditText, InlineEditInput };
