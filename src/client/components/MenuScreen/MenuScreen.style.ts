import styled from "styled-components";
import { type TStyledMenuButton } from "../../types/menu_types";

export const StyledMenuScreen = styled.div`
  background-color: rgba(186, 194, 197, 0.5);
  width: 420px;
  height: 100%;
  flex: 1;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: fixed;

  @media screen and (max-width: 1400px) {
    width: 220px;
  }

  @media screen and (max-width: 900px) {
    background-color: transparent;
    width: 100%;
    flex: none;
    height: 100%;
    padding-right: 130px;
    padding-left: 20px;
    z-index: 9998;
  }
`;

export const StyledMenuButton = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isPressed"].includes(prop),
})<TStyledMenuButton>`
  z-index: 9999;
  position: fixed;
  width: 60px;
  background-color: ${({ isPressed }) => (isPressed ? "#000000" : "#ffffff")};
  right: 30px;
  top: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  display: none;
  box-shadow: 5px 8px 18px 5px rgba(0, 0, 0, 0.12);

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledMenuButtonLine = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isPressed"].includes(prop),
})<TStyledMenuButton>`
  width: 40%;
  align-self: center;
  border-bottom: ${({ isPressed }) =>
    isPressed ? "2px solid rgb(255, 255, 255)" : "2px solid rgb(0, 0, 0)"};
  margin-bottom: 3px;
  margin-top: 3px;
`;
