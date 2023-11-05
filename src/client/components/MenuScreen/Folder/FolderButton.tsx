import React, { useState } from "react";
import { type IconType } from "react-icons";
import {
  Counter,
  FolderTop,
  IconWrapper,
  Label,
  StyledFolderButton,
} from "./Folder.style";

interface TFolder {
  tasksCount: number;
  Icon: IconType;
  label: "All" | "Active" | "Completed";
  folderColor?: string;
  setSelectedButton: React.Dispatch<
    React.SetStateAction<"All" | "Active" | "Completed">
  >;
  selected: boolean;
}

const FolderButton: React.FC<TFolder> = ({
  tasksCount,
  Icon,
  label,
  folderColor,
  setSelectedButton,
  selected,
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
          selectFolder(label);
        }}
      >
        <FolderTop>
          <IconWrapper folderColor={folderColor ?? "#000"}>
            <Icon
              size={30}
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
