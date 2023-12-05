import styled from "styled-components";
import {
  type IIconWrapperProps,
  type IStyledFolderButtonProps,
} from "@interfaces-types/folder";

export const FolderTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const IconWrapper = styled("div").withConfig({
  shouldForwardProp: (prop) => !["folderColor"].includes(prop),
})<IIconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.folderColor};
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Counter = styled.div`
  font-weight: bold;
  font-size: 30px;
  padding-top: 4px;
  padding-right: 3px;
`;

export const Label = styled.div`
  color: #696969;
  font-weight: bold;
  font-size: 21px;
  padding-left: 5px;
`;

export const StyledFolderButton = styled("div").withConfig({
  shouldForwardProp: (prop) =>
    !["folderColor", "selectedButton"].includes(prop),
})<IStyledFolderButtonProps>`
  background-color: ${({ selectedButton, folderColor }) =>
    selectedButton ? folderColor : "white"};
  margin: 10px;
  border-radius: 20px;
  width: 180px;
  height: 110px;
  padding: 10px;
  box-shadow: 0 3px 10px 0 rgba(17, 39, 91, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: default;
  user-select: none;

  ${Label}, ${Counter} {
    color: ${({ selectedButton, folderColor }) =>
      selectedButton ? "white" : folderColor};
  }

  ${IconWrapper} {
    background-color: ${({ selectedButton, folderColor }) =>
      selectedButton ? "white" : folderColor};
  }

  &:hover {
    background-color: ${(props) => props.folderColor};

    ${Label}, ${Counter} {
      color: white;
    }

    ${IconWrapper} {
      background-color: white;
    }
  }

  @media screen and (max-width: 900px) {
    box-shadow: 5px 8px 18px 5px rgba(0, 0, 0, 0.12);
  }
`;
