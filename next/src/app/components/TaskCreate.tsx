"use client";

import { useMutation } from "@apollo/client";
import { gql } from "../../../graphql/__generated__/client";
import { useState } from "react";
import { tasksDocument } from "./TaskList";

const createTaskDocument = gql(`mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    title
    assignee {
      id
      name
    }
  }
}`);

const TaskCreate = () => {
  const [title, setTitle] = useState('');
  const [createTask] = useMutation(createTaskDocument, {
    variables: {
      input: {
        title: title
      }
    },
    //TODO 本当は以下のようにwriteQueryするのが正しいのだが、なぜかうまく動かないようで省略
    // update: (cache, result) => {
    //   cache.modify({
    //     fields: {
    //       tasks(existing = []) {
    //         const newTask = cache.writeQuery({
    //           data: {task: result.data!.createTask!},
    //           query: taskDocument,
    //         });
    //         return [...existing, newTask];
    //       },
    //     },
    //   });
    // },
    refetchQueries: [
      {
        query: tasksDocument
      }
    ]
  });

  return (
    <div>
      <div>タイトル：<input value={title} onChange={e => setTitle(e.target.value)}/></div>
      <button onClick={async () => {
        if(title.trim().length === 0){
          return;
        }

        await createTask()
        setTitle('')
      }}>追加する</button>
    </div>
  );
};

export default TaskCreate;