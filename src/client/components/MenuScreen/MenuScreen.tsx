import React from "react";
import FolderButton from "./FolderButton/FolderButton";
import { BsFillCollectionFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { LuListTodo } from "react-icons/lu";
import { StyledMenuScreen } from "./MenuScreen.style";
import { type IOpenMenu } from "../../interfaces-types/menu";
import {
  ACTIVE_FOLDER_COLOR,
  ALL_FOLDER_COLOR,
  COMPLETED_FOLDER_COLOR,
} from "../../constants";

interface IMenuScreenProps {
  completedTasks: number;
  allTasks: number;
  selectedButton: "All" | "Active" | "Completed";
  setSelectedButton: React.Dispatch<
    React.SetStateAction<"All" | "Active" | "Completed">
  >;
  openMenu: IOpenMenu;
  setOpenMenu: React.Dispatch<React.SetStateAction<IOpenMenu>>;
}

const MenuScreen: React.FC<IMenuScreenProps> = ({
  completedTasks,
  allTasks,
  selectedButton,
  setSelectedButton,
  openMenu,
  setOpenMenu,
}) => {
  return (
    <StyledMenuScreen>
      <FolderButton
        tasksCount={allTasks}
        Icon={BsFillCollectionFill}
        label={"All"}
        folderColor={ALL_FOLDER_COLOR}
        setSelectedButton={setSelectedButton}
        selected={selectedButton === "All"}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <FolderButton
        tasksCount={completedTasks}
        Icon={AiOutlineCheck}
        label={"Completed"}
        folderColor={COMPLETED_FOLDER_COLOR}
        setSelectedButton={setSelectedButton}
        selected={selectedButton === "Completed"}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <FolderButton
        tasksCount={allTasks - completedTasks}
        Icon={LuListTodo}
        label={"Active"}
        folderColor={ACTIVE_FOLDER_COLOR}
        setSelectedButton={setSelectedButton}
        selected={selectedButton === "Active"}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
    </StyledMenuScreen>
  );
};

export default MenuScreen;
