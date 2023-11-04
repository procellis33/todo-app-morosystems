import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getCompletedTasksFetch,
  getTasksFetch,
} from "../../redux/reducers/tasksSlice";

const HomePage: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const completedTasks = useAppSelector((state) => state.tasks.completedTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksFetch());
    dispatch(getCompletedTasksFetch());
  }, []);

  console.log(tasks);
  console.log(completedTasks);
  return <h1>Hello World!</h1>;
};

export default HomePage;
