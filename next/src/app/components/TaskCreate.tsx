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

// 本来こういう書き方はしないが、CSSが見る時にノイズになるので一旦こちらに書いている
const borderStyle = {padding: 20, borderColor: '#777777', borderWidth: 1, marginTop: 20, textAlign: 'center'}
const buttonStyle = {marginLeft: 10, padding: '5px 10px', borderRadius: 10, backgroundColor: '#4d74eb', color: '#FFFFFF', marginTop: 10}
const inputStyle = {padding: 5, borderColor: '#777777', borderWidth: 1}

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
    <div style={borderStyle}>
      <div>タイトル：<input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)}/></div>
      <button style={buttonStyle} onClick={async () => {
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