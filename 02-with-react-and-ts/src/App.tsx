import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { action, computed, makeObservable, observable } from 'mobx';

class TaskModel {
  id: string;
  text: string;
  isDone: boolean;

  constructor(
    text: string,
    isDone: boolean
  ) {
    this.id = Math.random().toString();
    this.text = text;
    this.isDone = isDone;

    makeObservable(
      this,
      {
        text: true,
        isDone:true,
      }
    );
  }
}

class TasksListModel {
  tasks: TaskModel[] = [];

  constructor() {
    makeObservable(this, {
      tasks: observable.shallow,
      add: action.bound,
    });
  }

  add(text: string) {
    this.tasks.push(new TaskModel(text, false));
  }
}

const Task = observer(({ task }: { task: TaskModel }) => (
  <div>
    <input
      type="checkbox"
      checked={task.isDone}
      onChange={e => {
        task.isDone = e.target.checked;
      }}
    />
    {task.text}
  </div>
));

const TaskLists = observer(({ tasks }: { tasks: TaskModel[] }) => (
  <ul>
    {tasks.map(taskModel => (
      <li key={taskModel.id}>
        <Task task={taskModel} />
      </li>
    ))}
  </ul>
));

const AddTask = ({ onAdd }: { onAdd: (text: string) => void }) => {
  const [currentText, setCurrentText] = useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (currentText.trim()) {
          const newTaskText = currentText.trim();
          setCurrentText('');
          onAdd(newTaskText);
        }
      }}
    >
      <input
        value={currentText}
        onChange={e => {
          setCurrentText(e.target.value);
        }}
      />
    </form>
  )
};


function App() {
  const [tasksListModel] = useState(() => new TasksListModel());
  const [tasksListViewModel] = useState(() => new TasksListViewModel(tasksListModel));

  return (
    <div>
      Filters:{' '}
      <label>
        <input
          type="checkbox"
          checked={tasksListViewModel.showUnDoneOnly}
          onChange={e => {
            tasksListViewModel.showUnDoneOnly = e.target.checked;
          }}
        />{' '}
        Show undone only
      </label>
      <AddTask onAdd={tasksListModel.add} />
      <TaskLists tasks={tasksListViewModel.filteredTasks} />
    </div>
  );
}

export default observer(App);


class TasksListViewModel {
  showUnDoneOnly: boolean = false;

  constructor(
    private taskListModel: TasksListModel,
  ) {
    makeObservable(
      this,
      {
        showUnDoneOnly: true,
        filteredTasks: computed,
      }
    )
  }

  get filteredTasks(): TaskModel[] {
    if (this.showUnDoneOnly) {
      return this.taskListModel.tasks.filter(task => !task.isDone);
    }
    return this.taskListModel.tasks;
  }
}
