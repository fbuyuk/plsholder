import {makeAutoObservable, configure} from 'mobx';
import axios from 'axios';
import userStore from './UserStore';
configure({
  enforceActions: 'never',
});
class TaskStore {
  tasks: any[] = [];
  loading: boolean = false;
  completedTasks: number = 0;
  incompleteTasks: number = 0;
  userStore;
  constructor() {
    makeAutoObservable(this);
    this.userStore = userStore;
  }

  fetchTasks = async (page: number) => {
    this.loading = true;
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?userId=${this.userStore.me.id}&_limit=3&_page=${page}`,
      );
      this.tasks = response.data;
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      this.loading = false;
    }
  };

  filterTasks = (text: string) => {
    if (text.length > 2) {
      this.tasks = this.tasks.filter(task =>
        task.title.includes(text.toString()),
      );
    } else if (text.length == 0) {
      this.fetchTasks(1);
    }
  };

  taskStats = async () => {
    this.loading = true;
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?userId=${this.userStore.me.id}`,
      );
      const tasks = response.data;

      const totalTasks = tasks.length;
      const completedTasks = tasks.filter((task: any) => task.completed).length;
      const incompleteTasks = totalTasks - completedTasks;

      this.completedTasks = (completedTasks / totalTasks) * 100;
      this.incompleteTasks = (incompleteTasks / totalTasks) * 100;
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      this.loading = false;
    }
  };
}

const taskStore = new TaskStore();
export default taskStore;
