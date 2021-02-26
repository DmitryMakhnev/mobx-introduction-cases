import { autorun, makeObservable, observable } from 'mobx';

const task = makeObservable(
  {
    text: 'Start learning MobX with deep data structures',
    attaches: [
      {
        name: 'object1.jpg',
        url: 'attaches.service.com/1'
      },
      {
        name: 'object2.png',
        url: 'attaches.service.com/2'
      }
    ]
  },
  {
    text: false,
    attaches: observable.shallow
  }
);

autorun(() => {
  console.log(task.text);
});

task.text += '🚀';

autorun(() => {
  const attachesMap = task.attaches.reduce(
    (result, attach) => {
      result[attach.name] = attach.url;
      return result;
    },
    {}
  );

  console.log(
    JSON.stringify(attachesMap, null, 2)
  );
});

task.attaches.push({
  name: '3.jpg',
  url: 'attaches.service.com/3'
});

// not produce
task.attaches[1].name = 'asd.jpg'
