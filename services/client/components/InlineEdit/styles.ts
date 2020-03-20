import styled, { css } from "styled-components";

//  these make sure it can work in any text element
const InlineEditStyle = css`
  size: inherit;
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
  ${props => (!props.isHidden ? activeText : hidden)}
`;

const InlineEditInput = styled.input<{ isActive: boolean; size: number }>`
  ${InlineEditStyle}
  ${props => (props.isActive ? activeInput : hidden)}
  min-width: ${props => Math.ceil(props.size) + "ch"}
`;

export { InlineEditText, InlineEditInput };
