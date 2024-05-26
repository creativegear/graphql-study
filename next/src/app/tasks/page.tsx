import GraphQLProvider from "../components/GraphQLProvider";
import TaskList from "../components/TaskList";

export default function TaskListPage() {
  return (
    <GraphQLProvider>
      <TaskList/>
    </GraphQLProvider>
  )
}