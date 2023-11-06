import React, { useState } from "react";
import { type IconType } from "react-icons";
import {
  Counter,
  FolderTop,
  IconWrapper,
  Label,
  StyledFolderButton,
} from "./FolderButton.style";
import { type IOpenMenu } from "../../../interfaces-types/menu";

interface IFolder {
  tasksCount: number;
  Icon: IconType;
  label: "All" | "Active" | "Completed";
  folderColor?: string;
  setSelectedButton: React.Dispatch<
    React.SetStateAction<"All" | "Active" | "Completed">
  >;
  selected: boolean;
  openMenu: IOpenMenu;
  setOpenMenu: React.Dispatch<React.SetStateAction<IOpenMenu>>;
}

const FolderButton: React.FC<IFolder> = ({
  tasksCount,
  Icon,
  label,
  folderColor,
  setSelectedButton,
  selected,
  openMenu,
  setOpenMenu,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const selectFolder = (buttonId: "All" | "Active" | "Completed"): void => {
    if (!selected) setSelectedButton(buttonId);
  };

  // * Select a folder if it's mobile version => close menu
  const selectFolderClicked = (): void => {
    if (openMenu.opened && openMenu.mobile)
      setOpenMenu((prevState) => ({
        ...prevState,
        opened: false,
      }));
    selectFolder(label);
  };

  return (
    <>
      <StyledFolderButton
        folderColor={folderColor ?? "#000"}
        selectedButton={selected}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={selectFolderClicked}
      >
        <FolderTop>
          <IconWrapper folderColor={folderColor ?? "#000"}>
            <Icon
              size={28}
              color={isHovered || selected ? folderColor ?? "#000" : "#fff"}
            />
          </IconWrapper>
          <Counter>{tasksCount}</Counter>
        </FolderTop>
        <Label>{label}</Label>
      </StyledFolderButton>
    </>
  );
};

export default FolderButton;
