"use client"

import { useState } from "react";
import GraphQLProvider from "./components/GraphQLProvider";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";
import TaskCreate from "./components/TaskCreate";

export default function TaskListPage() {
  const [taskId, setTaskId] = useState<string | null>(null)
  return (
    <GraphQLProvider>
      <div style={{display: 'flex', flexDirection: 'row', maxWidth: 800, height: '100vh', margin: 'auto', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{flex: 1}}>
          <TaskList selectTask={setTaskId}/>
          <TaskCreate/>
        </div>
        <div style={{flex: 1, marginLeft: 20}}>
          <TaskDetail taskId={taskId} />
        </div>
      </div>
    </GraphQLProvider>
  )
}