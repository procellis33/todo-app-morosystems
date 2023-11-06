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

  return (
    <>
      <StyledFolderButton
        folderColor={folderColor ?? "#000"}
        selectedButton={selected}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (openMenu.opened && openMenu.flag)
            setOpenMenu((prevState) => ({
              ...prevState,
              opened: false,
            }));
          selectFolder(label);
        }}
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
