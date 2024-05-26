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
    <div>
      <div>タイトル：<input value={title} onChange={e => setTitle(e.target.value)}/></div>
      <div>担当者：{task.assignee?.name ?? '未設定'}</div>
      <button onClick={async () => {
        await updateTask();
        onEdit();
      }}>更新する</button>
    </div>
  );
};

export default TaskEdit;