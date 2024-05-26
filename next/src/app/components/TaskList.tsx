"use client";

import { useQuery } from "@apollo/client";
import { gql } from "../../../graphql/__generated__/client";

export const tasksDocument = gql(`query FetchTasks {
  tasks {
    id
    title
  }
}`);

type TaskListProps = {
  selectTask: (id: string) => void
}

const TaskList = ({ selectTask }: TaskListProps) => {
  const { data, loading, error } = useQuery(tasksDocument);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {data && data.tasks.map(task => {
          return <li onClick={() => selectTask(task.id)} key={task.id}>
            {task.title}
            </li>
        })}
      </ul>
    </div>
  );
};

export default TaskList;