import { makeAutoObservable, reaction, runInAction } from 'mobx';

class TaskModel {
  constructor(text, isDone = false) {
    this.text = text;
    this.isDone = isDone;
    this.lastModified = new Date(2021, 1, 25, 12, 31, 55)
    makeAutoObservable(this);
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

const updateText = text => {
  mobxLearningTask.text = text;
  console.log('something between');
  mobxLearningTask.lastModified = new Date();
};

updateText('test');

// aka transaction
runInAction(() => {
  updateText(mobxLearningTask.text + '🚀');
});

