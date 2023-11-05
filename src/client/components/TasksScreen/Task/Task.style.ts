import styled, { css, keyframes } from "styled-components";
import {
  type TStyledInput,
  type TWrapper,
} from "../../../types/task_component_types";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const StyledDeleteIcon = styled.div`
  animation: ${slideIn} 0.3s ease forwards;
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    
  }
  to {
    opacity: 0;
  }
`;

const taskWasSelected = keyframes`
  from {
    opacity: 1;
    
  }
  to {
    opacity: 0.5;
    text-decoration: line-through;
  }
`;

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !["isSelected"].includes(prop),
})<TStyledInput>`
  background-image: linear-gradient(#90c91f, #3bc51b),
    linear-gradient(#bfbfbf, #bfbfbf);
  border: 0 none;
  border-radius: 0;
  margin-left: 10px;
  color: #575757;
  cursor: default;
  font-size: 16px;
  padding: 10px;
  box-shadow: none;
  float: none;
  background-color: transparent;
  background-position:
    center bottom,
    center calc(100% - 1px);
  background-repeat: no-repeat;
  background-size:
    0 2px,
    100% 1px;
  transition: background 0s ease-out 0s;
  min-height: 35px;
  display: initial;
  flex: 1;
  outline: none;
  position: relative;
  text-decoration: ${({ isSelected }) =>
    isSelected ? "line-through" : "none"};
  opacity: ${({ isSelected }) => (isSelected ? 0.5 : 1)};

  animation: ${({ isSelected }) =>
    isSelected
      ? css`
          ${taskWasSelected} 0.3s forwards;
        `
      : "none"};

  &:focus {
    background-size:
      100% 2px,
      100% 1px;
    outline: 0 none;
    transition-duration: 0.3s;
    color: #000000;
  }

  &:hover {
    ${StyledDeleteIcon} {
      background-color: red;
    }
  }
`;

export const StyledCheckbox = styled.label`
  display: inline-block; /* Use inline-block to center vertically */
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the original checkbox */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;

export const StyledCheckmark = styled.span`
  position: absolute;
  left: 0;
  transform: translateY(-25%) translateX(25%);
  height: 25px;
  width: 25px;
  border-radius: 10px;
  background-color: #eee;

  ${StyledCheckbox} input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  ${StyledCheckbox}:hover input ~ & {
    background-color: #ccc;
  }

  ${StyledCheckbox} input:checked ~ & {
    background-color: #18af00;
  }

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

  ${StyledCheckbox} input:checked ~ &:after {
    display: block;
  }

  &:after {
    left: 11px;
    top: 7px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const StyledWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["beforeDelete"].includes(prop),
})<TWrapper>`
  animation: ${({ beforeDelete }) =>
    beforeDelete
      ? css`
          ${fadeOut} 0.5s forwards;
        `
      : "none"};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 5px 0 5px 0;
  padding: 0 40px 0 20px;

  @media screen and (max-width: 1050px) {
    padding: 0 28px 0 20px;
  }
`;
