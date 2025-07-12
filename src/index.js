import './css/styles.css';
import TodoApp from './modules/todoApp';

const todoApp = new TodoApp("app");

todoApp.initialize();

setInterval(() => {
    todoApp.saveToStorage();
}, 1000);
