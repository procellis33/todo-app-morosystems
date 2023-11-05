import React, { useEffect, useRef, useState } from "react";
import {
  StyledCheckbox,
  StyledCheckmark,
  StyledDeleteIcon,
  StyledInput,
  StyledWrapper,
} from "./Task.style";
import { type TTask } from "../../../types/tasks_types";
import { useAppDispatch } from "../../../redux/hooks";
import {
  deleteTaskFetch,
  modifyTaskFetch,
  toggleTaskStatusFetch,
} from "../../../redux/reducers/tasksSlice";
import { MdDeleteOutline } from "react-icons/md";

interface TaskProps {
  task: TTask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [checked, setChecked] = useState(task.completed);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();
  const wrapperRef: React.LegacyRef<HTMLDivElement> | null = useRef(null);

  const textInputRef: React.LegacyRef<HTMLInputElement> | null = useRef(null);
  const handleChange = (): void => {
    dispatch(toggleTaskStatusFetch({ completed: checked, id: task.id }));
  };

  useEffect(() => {
    setChecked(task.completed);
  }, [task]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      textInputRef.current?.blur();
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent): void => {
    if (e.target === wrapperRef.current) dispatch(deleteTaskFetch(task.id));
  };
  return (
    <StyledWrapper
      ref={wrapperRef}
      onAnimationEnd={handleAnimationEnd}
      beforeDelete={isDeleting}
      className={"taskWrapper"}
      onMouseEnter={() => {
        setShowDelete(true);
      }}
      onMouseLeave={() => {
        setShowDelete(false);
      }}
    >
      <StyledCheckbox onFocus={() => {}}>
        <input type={"checkbox"} checked={checked} onChange={handleChange} />
        <StyledCheckmark />
      </StyledCheckbox>

      <StyledInput
        isSelected={task.completed}
        type="text"
        defaultValue={task.text}
        onFocus={() => {
          setShowDelete(true);
        }}
        ref={textInputRef}
        onBlur={(e) => {
          if (e.target.value === "") setIsDeleting(true);
          else if (e.target.value !== task.text)
            dispatch(modifyTaskFetch({ text: e.target.value, id: task.id }));
        }}
        onKeyDown={handleKeyDown}
      />
      {showDelete && (
        <StyledDeleteIcon
          onClick={() => {
            setIsDeleting(true);
          }}
        >
          <MdDeleteOutline size={25} />
        </StyledDeleteIcon>
      )}
    </StyledWrapper>
  );
};

export default Task;
