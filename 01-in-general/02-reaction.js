import { makeAutoObservable, reaction } from 'mobx';

class TaskModel {
  constructor(text, isDone = false) {
    this.text = text;
    this.isDone = isDone;

    makeAutoObservable(this);
  }
}

const mobxLearningTask = new TaskModel('Start learning MobX reactions');

reaction(
  () => mobxLearningTask.isDone,
  isDone => {
    console.log(isDone);
  }
);

mobxLearningTask.isDone = true;

mobxLearningTask.text += '🚀';
