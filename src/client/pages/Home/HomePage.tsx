import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTasks, tasksFailure } from "../../redux/reducers/tasksSlice";
import MenuScreen from "../../components/MenuScreen/MenuScreen";
import { type ITask } from "../../interfaces-types/tasks";
import TasksScreen from "../../components/TasksScreen/TasksScreen";
import {
  ErrorAlert,
  ErrorAlertButton,
  ErrorAlertSpan,
  ErrorAlertText,
  StyledHomeWrapper,
} from "./HomePage.style";
import { RxCross2 } from "react-icons/rx";
import useDeviceParams from "../../hooks/useDeviceParams";
import { type IOpenMenu } from "../../interfaces-types/menu";
import NavPhone from "../../components/NavPhone/NavPhone";

const HomePage: React.FC = () => {
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [selectedButton, setSelectedButton] = useState<
    "All" | "Active" | "Completed"
  >("All");

  // * Using custom hook to identify which menu version to use
  const deviceParams = useDeviceParams();
  const [openMenu, setOpenMenu] = useState<IOpenMenu>({
    opened: deviceParams.width > 900,
    mobile: deviceParams.width <= 900,
  });

  const tasks = useAppSelector((state) => state.tasks.tasks);
  const errorMessage = useAppSelector((state) => state.tasks.errorMessage);
  const dispatch = useAppDispatch();

  // * Count/Filter data to display
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

  // * Based on GET /tasks API filter appropriate data for selected section
  const filterTasks = (tasks: ITask[]): void => {
    if (selectedButton === "All") setFilteredTasks(tasks);
    else if (selectedButton === "Active")
      setFilteredTasks(tasks.filter((task) => !task.completed));
    else if (selectedButton === "Completed")
      setFilteredTasks(tasks.filter((task) => task.completed));
  };

  // * Manage page resize Mobile/PC menu
  useEffect(() => {
    if (deviceParams.width > 900) {
      setOpenMenu({ opened: true, mobile: false });
    } else if (!openMenu.mobile && openMenu.opened)
      setOpenMenu({ opened: false, mobile: true });
  }, [deviceParams]);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <StyledHomeWrapper>
      <NavPhone opened={openMenu.opened} setOpenMenu={setOpenMenu} />

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
