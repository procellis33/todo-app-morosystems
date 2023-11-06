import React from "react";
import FolderButton from "./Folder/FolderButton";
import { BsFillCollectionFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { LuListTodo } from "react-icons/lu";
import { StyledMenuScreen } from "./MenuScreen.style";
import { type TOpenMenu } from "../../pages/Home/HomePage";

interface MenuScreenProps {
  completedTasks: number;
  allTasks: number;
  selectedButton: "All" | "Active" | "Completed";
  setSelectedButton: React.Dispatch<
    React.SetStateAction<"All" | "Active" | "Completed">
  >;
  openMenu: TOpenMenu;
  setOpenMenu: React.Dispatch<React.SetStateAction<TOpenMenu>>;
}

const MenuScreen: React.FC<MenuScreenProps> = ({
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
        folderColor={"#000"}
        setSelectedButton={setSelectedButton}
        selected={selectedButton === "All"}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <FolderButton
        tasksCount={completedTasks}
        Icon={AiOutlineCheck}
        label={"Completed"}
        folderColor={"#18af00"}
        setSelectedButton={setSelectedButton}
        selected={selectedButton === "Completed"}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      <FolderButton
        tasksCount={allTasks - completedTasks}
        Icon={LuListTodo}
        label={"Active"}
        folderColor={"#198fee"}
        setSelectedButton={setSelectedButton}
        selected={selectedButton === "Active"}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
    </StyledMenuScreen>
  );
};

export default MenuScreen;
