import { makeAutoObservable, reaction } from 'mobx';

class TaskModel {
  constructor(text, isDone = false) {
    this.text = text;
    this.isDone = isDone;
    //should be defined before making observable
    this.lastModified = new Date();

    makeAutoObservable(this);

    // relation as reaction
    reaction(
      () => ({
        text: this.text,
        isDone: this.isDone,
      }),
      () => {
        console.log('Tracking props were modified');
        this.lastModified = new Date();
      }
    );
  }
}

const mobxLearningTask = new TaskModel('Start learning MobX relations');

reaction(
  () => mobxLearningTask.text,
  text => {
    console.log('Text changed:', text);
  }
);

reaction(
  () => mobxLearningTask.lastModified,
  lastModified => {
    console.log('LastModified changed:', lastModified);
  }
);

mobxLearningTask.text += '🚀';
