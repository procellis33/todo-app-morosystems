import React, { useEffect, useRef, useState } from "react";
import Task from "./Task/Task";
import { type TTask } from "../../types/tasks_types";
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
import {
  createTaskFetch,
  toggleTaskStatusFetch,
} from "../../redux/reducers/tasksSlice";
import { IoIosArrowDropdown } from "react-icons/io";

interface TasksScreenProps {
  allTasksCount: number;
  filteredTasks: TTask[];
  tasksAll: TTask[];
}

const TasksScreen: React.FC<TasksScreenProps> = ({
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
      createTask();
    }
  };
  const [allCompleted, setAllCompleted] = useState(false);
  useEffect(() => {
    setAllCompleted(
      !tasksAll.some((task) => !task.completed) && tasksAll.length !== 0,
    );
  }, [tasksAll]);
  const createTask = (): void => {
    if (textInputRef?.current !== undefined && textInputRef.current !== null) {
      const text = textInputRef.current.value;
      if (text !== "" && text !== undefined) dispatch(createTaskFetch(text));
      textInputRef.current.value = "";
    }
  };

  return (
    <StyledTasksScreen>
      <StyledHeader>todos</StyledHeader>
      <StyledWrapper>
        <div onClick={createTask}>
          <IoCreateOutline size={40} />
        </div>
        <StyledTextInput
          type={"text"}
          ref={textInputRef}
          onKeyDown={handleKeyDown}
        />
        <StyledIcon
          allCompleted={allCompleted}
          onClick={() => {
            const allCompleted = !tasksAll.some((task) => !task.completed);
            tasksAll.forEach((task) => {
              if (allCompleted && task.completed) {
                dispatch(
                  toggleTaskStatusFetch({ completed: true, id: task.id }),
                );
              } else if (!allCompleted && !task.completed) {
                dispatch(
                  toggleTaskStatusFetch({ completed: false, id: task.id }),
                );
              }
            });
          }}
        >
          <IoIosArrowDropdown size={30} />
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
