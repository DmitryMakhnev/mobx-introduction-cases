import { makeAutoObservable, autorun } from 'mobx';

class TaskModel {
  constructor(text, isDone = false) {
    this.text = text;
    this.isDone = isDone;

    makeAutoObservable(this);
  }
}

const mobxLearningTask = new TaskModel('Start learning MobX');

autorun(() => {
  console.log(mobxLearningTask.isDone);
});

mobxLearningTask.isDone = true;

mobxLearningTask.text += '🚀';
