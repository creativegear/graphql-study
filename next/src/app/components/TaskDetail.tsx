"use client";

import { useQuery } from "@apollo/client";
import { gql } from "../../../graphql/__generated__/client";
import { useState } from "react";
import TaskEdit from "./TaskEdit";

export const taskDocument = gql(`query FetchTask($taskId: ID!) {
  task(id: $taskId) {
    id
    title
    assignee {
      id
      name
    }
  }
}`);

// 本来こういう書き方はしないが、CSSが見る時にノイズになるので一旦こちらに書いている
const borderStyle = {padding: 20, borderColor: '#777777', borderWidth: 1}
const buttonStyle = {marginLeft: 10, padding: '5px 10px', borderRadius: 10, backgroundColor: '#4d74eb', color: '#FFFFFF'}

type TaskDetailProps = {
  taskId: string | null
}

const TaskDetail = ({ taskId }: TaskDetailProps) => {
  const [isEdit, setEdit] = useState(false);
  const { data, loading, error } = useQuery(taskDocument, {
    variables: {
      taskId: taskId!
    },
    skip: !taskId
  });

  if(!taskId){
    return <div>タスクが選択されていません</div>
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if(isEdit && data?.task){
    return <TaskEdit task={data.task} onEdit={() => setEdit(false)}/>
  }
  return (
    <div style={borderStyle}>
      <div>
        タイトル：{data?.task?.title}
        <button style={buttonStyle} onClick={() => setEdit(true)}>編集する</button>
      </div>
      <div>
        担当者：{data?.task?.assignee?.name ?? '未設定'}
      </div>
    </div>
  );
};

export default TaskDetail;