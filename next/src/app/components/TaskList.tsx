"use client";

import { useQuery } from "@apollo/client";
import { gql } from "../../../graphql/__generated__/client";

export const tasksDocument = gql(`query FetchTasks {
  tasks {
    id
    title
  }
}`);

// 本来こういう書き方はしないが、CSSが見る時にノイズになるので一旦こちらに書いている
const borderStyle = {padding: 20, borderColor: '#777777', borderWidth: 1}

type TaskListProps = {
  selectTask: (id: string) => void
}

const TaskList = ({ selectTask }: TaskListProps) => {
  const { data, loading, error } = useQuery(tasksDocument);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={borderStyle}>
      <ul>
        {data && data.tasks.map(task => {
          return <li style={borderStyle} onClick={() => selectTask(task.id)} key={task.id}>
            {task.title}
            </li>
        })}
      </ul>
    </div>
  );
};

export default TaskList;