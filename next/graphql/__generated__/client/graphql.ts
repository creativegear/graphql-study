/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTaskInput = {
  assineeId?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask?: Maybe<Task>;
  updateTask: Task;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

export type Query = {
  __typename?: 'Query';
  member?: Maybe<Member>;
  members: Array<Member>;
  task?: Maybe<Task>;
  tasks: Array<Task>;
};


export type QueryMemberArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};

export type Task = {
  __typename?: 'Task';
  assignee?: Maybe<Member>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type UpdateTaskInput = {
  assineeId?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FetchTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, title: string }> };


export const FetchTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<FetchTasksQuery, FetchTasksQueryVariables>;