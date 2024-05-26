import { readFileSync } from "fs";
import { join } from "path";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { Resolvers } from "../../../../graphql/__generated__/server/resolvers-types";

const schemaFilePath = join(process.cwd(), "graphql/documents/schema.gql");
const typeDefs = readFileSync(schemaFilePath, "utf-8");

const members = [
  { 
    id: 'member:1',
    name: '加藤'
  },
  { 
    id: 'member:2',
    name: '佐藤'
  },
  { 
    id: 'member:3',
    name: '齊藤'
  }
];

let tasks = [
  { 
    id: 'task:1',
    title: '設計',
    assigneeId: 'member:1',
  },
  { 
    id: 'task:2',
    title: '実装',
    assigneeId: 'member:2',
  },
  { 
    id: 'task:3',
    title: 'テスト',
    assigneeId: null,
  }
];

const resolvers: Resolvers = {
  Query: {
    tasks() {
      return tasks;
    },
    task(parent, args, contextValue, info) {
      return tasks.find((task) => task.id === args.id) ?? null;
    },
    members() {
      return members;
    },
    member(parent, args, contextValue, info) {
      return members.find((member) => member.id === args.id) ?? null;
    },
  },
  Task: {
    assignee: (parent) => {
      if(!(parent as any).assigneeId){
        return null;
      }
      return members.find((member) => member.id === (parent as any).assigneeId) ?? null;
    }
  },
  Mutation: {
    createTask(parent, args, contextValue, info) {
      const newTask = {
        id: `task:${tasks.length + 1}`,
        title: args.input.title,
        assigneeId: null
      };
      tasks.push(newTask)
      return newTask;
    },
    updateTask(parent, args, contextValue, info) {
      const task = tasks.find((task) => task.id === args.input.id)!;
      task.title = args.input.title;
      return task;
    },
    deleteTask(parent, args, contextValue, info) {
      tasks = tasks.filter(task => task.id !== args.id);
      return null;
    },
  }
};

const apolloServer = new ApolloServer<Resolvers>({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };