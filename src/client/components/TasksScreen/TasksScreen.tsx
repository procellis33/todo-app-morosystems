import React, { useEffect, useRef, useState } from "react";
import Task from "./Task/Task";
import { type ITask } from "../../interfaces-types/tasks";
import {
  StyledEmptySign,
  StyledHeader,
  StyledIcon,
  StyledTasksScreen,
  StyledTextInput,
  StyledWrapper,
} from "./TasksScreen.style";
import { IoCreateOutline } from "react-icons/io5";
import { useAppDispatch } from "../../redux/hooks";
import { createTask, toggleTaskStatus } from "../../redux/reducers/tasksSlice";
import { IoIosArrowDropdown } from "react-icons/io";

interface IAsksScreenProps {
  allTasksCount: number;
  filteredTasks: ITask[];
  tasksAll: ITask[];
}

const TasksScreen: React.FC<IAsksScreenProps> = ({
  allTasksCount,
  filteredTasks,
  tasksAll,
}) => {
  const textInputRef: React.LegacyRef<HTMLInputElement> | undefined =
    useRef(null);
  const dispatch = useAppDispatch();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      textInputRef.current?.blur();
      createTaskClicked();
    }
  };
  const [allCompleted, setAllCompleted] = useState(false);
  useEffect(() => {
    setAllCompleted(
      !tasksAll.some((task) => !task.completed) && tasksAll.length !== 0,
    );
  }, [tasksAll]);
  const createTaskClicked = (): void => {
    if (textInputRef?.current !== undefined && textInputRef.current !== null) {
      const text = textInputRef.current.value;
      if (text !== "" && text !== undefined) dispatch(createTask(text));
      textInputRef.current.value = "";
    }
  };

  return (
    <StyledTasksScreen>
      <StyledHeader>todos</StyledHeader>
      <StyledWrapper>
        <div onClick={createTaskClicked}>
          <IoCreateOutline size={40} color={"#5d5d5d"} />
        </div>
        <StyledTextInput
          type={"text"}
          id={"createTask"}
          placeholder={"What needs to be done?"}
          ref={textInputRef}
          onKeyDown={handleKeyDown}
        />
        <StyledIcon
          allCompleted={allCompleted}
          onClick={() => {
            const allCompleted = !tasksAll.some((task) => !task.completed);
            tasksAll.forEach((task) => {
              if (allCompleted && task.completed) {
                dispatch(toggleTaskStatus({ completed: true, id: task.id }));
              } else if (!allCompleted && !task.completed) {
                dispatch(toggleTaskStatus({ completed: false, id: task.id }));
              }
            });
          }}
        >
          <IoIosArrowDropdown size={30} color={"#5d5d5d"} />
        </StyledIcon>
      </StyledWrapper>
      {allTasksCount === 0 && (
        <StyledEmptySign>There&apos;s nothing here...</StyledEmptySign>
      )}
      {filteredTasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
    </StyledTasksScreen>
  );
};

export default TasksScreen;
