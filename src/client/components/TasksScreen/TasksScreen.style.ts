import styled from "styled-components";
import { type IAllCompleted } from "@interfaces-types/task";

export const StyledEmptySign = styled.h1`
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 30px;

  @media screen and (max-width: 550px) {
    margin-left: 0;
    font-size: 25px;
  }
`;
export const StyledWrapper = styled.div`
  border-radius: 15px;
  width: 90%;
  border: 1px solid #5d5d5d;
  outline: none;
  margin: 10px 0 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;

  @media screen and (max-width: 380px) {
    padding-left: 28px;
    padding-right: 28px;
  }
`;
export const StyledTextInput = styled.input`
  font-size: 20px;
  border: none;
  border-radius: 15px;
  outline: none;
  flex-grow: 1;
  padding: 12px;
  justify-content: center;
`;

export const StyledHeader = styled.h2`
  margin-top: 10px;
  font-size: 50px;
  opacity: 0.3;
  color: red;
  align-items: center;

  @media screen and (max-width: 900px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const StyledIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !["allCompleted"].includes(prop),
})<IAllCompleted>`
  opacity: ${({ allCompleted }) => (allCompleted ? 1 : 0.6)};
`;

export const StyledTasksScreen = styled.div`
  margin-left: 220px;
  flex: 1;
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 900px) {
    margin-left: 0;
  }
`;
