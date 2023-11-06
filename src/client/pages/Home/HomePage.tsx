import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTasksFetch, tasksFailure } from "../../redux/reducers/tasksSlice";
import MenuScreen from "../../components/MenuScreen/MenuScreen";
import { type TTask } from "../../types/tasks_types";
import TasksScreen from "../../components/TasksScreen/TasksScreen";
import {
  ErrorAlert,
  ErrorAlertButton,
  ErrorAlertSpan,
  ErrorAlertText,
  StyledHomeWrapper,
} from "./Home.style";
import { RxCross2 } from "react-icons/rx";
import {
  StyledMenuButton,
  StyledMenuButtonLine,
} from "../../components/MenuScreen/MenuScreen.style";
import useDeviceParams from "../../hooks/useDeviceParams";

export interface TOpenMenu {
  opened: boolean;
  flag: boolean;
}
const HomePage: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [selectedButton, setSelectedButton] = useState<
    "All" | "Active" | "Completed"
  >("All");
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const errorMessage = useAppSelector((state) => state.tasks.errorMessage);
  const [filteredTasks, setFilteredTasks] = useState<TTask[]>([]);
  const dispatch = useAppDispatch();
  const deviceParams = useDeviceParams();

  const [openMenu, setOpenMenu] = useState<TOpenMenu>({
    opened: deviceParams.width > 900,
    flag: deviceParams.width <= 900,
  });

  useEffect(() => {
    const sumOfCompletedTasks = tasks.reduce((accumulator, currentValue) => {
      if (currentValue.completed) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    setCompletedTasks(sumOfCompletedTasks);
    filterTasks(tasks);
  }, [tasks, selectedButton]);

  const filterTasks = (tasks: TTask[]): void => {
    if (selectedButton === "All") setFilteredTasks(tasks);
    else if (selectedButton === "Active")
      setFilteredTasks(tasks.filter((task) => !task.completed));
    else if (selectedButton === "Completed")
      setFilteredTasks(tasks.filter((task) => task.completed));
  };

  useEffect(() => {
    dispatch(getTasksFetch());
  }, []);

  useEffect(() => {
    if (deviceParams.width > 900) {
      setOpenMenu({ opened: true, flag: false });
    } else if (!openMenu.flag && openMenu.opened)
      setOpenMenu({ opened: false, flag: true });
  }, [deviceParams]);

  return (
    <StyledHomeWrapper>
      <StyledMenuButton
        isPressed={openMenu.opened}
        onClick={() => {
          if (openMenu.opened)
            setOpenMenu((prevState) => ({
              ...prevState,
              opened: false,
            }));
          else
            setOpenMenu((prevState) => ({
              ...prevState,
              opened: true,
            }));
        }}
      >
        <StyledMenuButtonLine isPressed={openMenu.opened} />
        <StyledMenuButtonLine isPressed={openMenu.opened} />
        <StyledMenuButtonLine isPressed={openMenu.opened} />
      </StyledMenuButton>

      {openMenu.opened && (
        <MenuScreen
          completedTasks={completedTasks}
          allTasks={tasks.length}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
      )}
      <TasksScreen
        allTasksCount={tasks.length}
        filteredTasks={filteredTasks}
        tasksAll={tasks}
      />
      {errorMessage !== "" && (
        <ErrorAlert>
          <ErrorAlertButton onClick={() => dispatch(tasksFailure(""))}>
            <RxCross2 size={20} color={"white"} />
          </ErrorAlertButton>
          <ErrorAlertText>
            <ErrorAlertSpan>Oh snap!&#x20;</ErrorAlertSpan>
            {errorMessage}
          </ErrorAlertText>
        </ErrorAlert>
      )}
    </StyledHomeWrapper>
  );
};

export default HomePage;
