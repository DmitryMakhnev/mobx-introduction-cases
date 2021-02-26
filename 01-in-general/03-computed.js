import { makeAutoObservable, autorun } from 'mobx';

const dateTimeFormat = new Intl.DateTimeFormat('en-us');

class TaskModel {
  constructor(date, text, isDone = false) {
    this.lastModified = date;
    this.text = text;
    this.isDone = isDone;

    makeAutoObservable(this);
  }

  get formattedLastModified() {
    return dateTimeFormat.format(this.lastModified);
  }
}

const mobxLearningTask = new TaskModel(
  new Date(2021, 1, 25, 12, 31, 55),
  'Start learning MobX computed'
);

autorun(() => {
  console.log(mobxLearningTask.formattedLastModified);
});

mobxLearningTask.lastModified = new Date();

mobxLearningTask.isDone = true;
mobxLearningTask.text += '🚀';
