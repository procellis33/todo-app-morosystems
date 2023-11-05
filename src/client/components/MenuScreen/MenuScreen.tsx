import React from "react";
import FolderButton from "./Folder/FolderButton";
import { BsFillCollectionFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { LuListTodo } from "react-icons/lu";
import { StyledMenuScreen } from "./MenuScreen.style";

interface MenuScreenProps {
  completedTasks: number;
  allTasks: number;
  selectedButton: "All" | "Active" | "Completed";
  setSelectedButton: React.Dispatch<
    React.SetStateAction<"All" | "Active" | "Completed">
  >;
}

const MenuScreen: React.FC<MenuScreenProps> = ({
  completedTasks,
  allTasks,
  selectedButton,
  setSelectedButton,
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
      />
      <FolderButton
        tasksCount={completedTasks}
        Icon={AiOutlineCheck}
        label={"Completed"}
        folderColor={"#18af00"}
        setSelectedButton={setSelectedButton}
        selected={selectedButton === "Completed"}
      />
      <FolderButton
        tasksCount={allTasks - completedTasks}
        Icon={LuListTodo}
        label={"Active"}
        folderColor={"#198fee"}
        setSelectedButton={setSelectedButton}
        selected={selectedButton === "Active"}
      />
    </StyledMenuScreen>
  );
};

export default MenuScreen;
