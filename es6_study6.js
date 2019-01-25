import readlineSync from 'readline-sync';

const getCompletedTasks = (tasks) => {
  let completedTasks = [];
  tasks.forEach((task) => {
    if (task.done === true){
      completedTasks.push(task);
    }
  });
  console.log(completedTasks);
  return completedTasks;
}

const getUncompletedTasks = (tasks) => {
  let uncompletedTasks = [];
  tasks.forEach((task) => {
    if (task.done === false){
      uncompletedTasks.push(task);
    }
  });
  return uncompletedTasks;
}

const printTasks = (tasks) => {
  tasks.forEach((task, index) => {
  	console.log(index + 1 + ": " + task.text);
  });
}

let tasks = [
	{id: 1, text: "本を買う", done: true, description: "javaScriptの本を買う"},
	{id: 2, text: "progateをする", done: false, description: "レベルを3上げる"},
	{id: 3, text: "買い物をする", done: false, description: "新しい服を買う"},
  {id: 4, text: "ウォーキングする", done: false, description: "30分歩く"},
];

let completedTasks = getCompletedTasks(tasks);
let uncompletedTasks = getUncompletedTasks(tasks);

console.log("【完了タスク】")
printTasks(completedTasks);

console.log("【未完了タスク】")
printTasks(uncompletedTasks);

tasks = tasks.map((task) => {
  if (task.done === false) {
    task.done = true;
  }
  return task;
});

uncompletedTasks = getUncompletedTasks(tasks);
console.log("【未完了タスク】")
printTasks(uncompletedTasks)








const numbers = [1, 3, 5, 7];
const foundNumber
 = numbers.find((number) => {return number > 3});

console.log(foundNumber);
