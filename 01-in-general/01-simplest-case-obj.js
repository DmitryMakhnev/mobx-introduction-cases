import { makeAutoObservable, autorun } from 'mobx';

const mobxLearningTask = makeAutoObservable({
  text: 'Start learning MobX',
  isDone: false
});

autorun(() => {
  console.log(mobxLearningTask.isDone);
});

mobxLearningTask.isDone = true;

mobxLearningTask.text += '🚀';
