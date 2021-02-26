import { makeAutoObservable, reaction } from 'mobx';

class TaskModel {
  constructor(text, isDone = false) {
    this.text = text;
    this.isDone = isDone;
    this.lastModified = new Date(2021, 1, 25, 12, 31, 55)
    makeAutoObservable(this);
  }

  updateText(text) {
    this.text = text;
    console.log('something between');
    this.lastModified = new Date();
  }
}

const mobxLearningTask = new TaskModel('Start learning MobX actions');


reaction(
  () => mobxLearningTask.text,
  text => {
    console.log(`text changed:`, text);
  }
);

reaction(
  () => mobxLearningTask.lastModified,
  lastModified => {
    console.log(`lastModified changed:`, lastModified);
  }
);

mobxLearningTask.updateText(mobxLearningTask.text + '🚀');
