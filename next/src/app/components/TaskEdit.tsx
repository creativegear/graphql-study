"use client";

import { useMutation, useQuery } from "@apollo/client";
import { gql } from "../../../graphql/__generated__/client";
import { useState } from "react";
import { Task } from "../../../graphql/__generated__/client/graphql";

const updateTaskDocument = gql(`mutation Mutation($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    id
    title
    assignee {
      id
      name
    }
  }
}`);

type TaskEditProps = {
  task: Task
  onEdit: () => void
}

// 本来こういう書き方はしないが、CSSが見る時にノイズになるので一旦こちらに書いている
const borderStyle = {padding: 20, borderColor: '#777777', borderWidth: 1}
const buttonStyle = {marginLeft: 10, padding: '5px 10px', borderRadius: 10, backgroundColor: '#4d74eb', color: '#FFFFFF'}
const inputStyle = {padding: 5, borderColor: '#777777', borderWidth: 1}

const TaskEdit = ({ task, onEdit }: TaskEditProps) => {
  const [title, setTitle] = useState(task.title);
  const [updateTask] = useMutation(updateTaskDocument, {
    variables: {
      input: {
        id: task.id,
        title: title
      }
    }
  })
  return (
    <div style={borderStyle}>
      <div>
        タイトル：<input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)}/>
      </div>
      <div>
        担当者：{task.assignee?.name ?? '未設定'}
      </div>
      <button style={buttonStyle} onClick={async () => {
        await updateTask();
        onEdit();
      }}>更新する</button>
    </div>
  );
};

export default TaskEdit;