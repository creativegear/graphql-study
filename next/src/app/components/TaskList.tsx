"use client";

import { useQuery } from "@apollo/client";
import { gql } from "../../../graphql/__generated__/client";

const tasksDocument = gql(`query FetchTasks {
  tasks {
    id
    title
  }
}`);

const TaskList = () => {
  const { data, loading, error } = useQuery(tasksDocument);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {data && data.tasks.map(task => <li key={task.id}>{task.title}</li>)}
      </ul>
    </div>
  );
};

export default TaskList;