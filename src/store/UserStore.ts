import {makeAutoObservable, configure} from 'mobx';
import {_getStore, _setStore} from '../utils';
import axios from 'axios';
configure({
  enforceActions: 'never',
});

class UserStore {
  me: any = {
    id: 1,
  };
  users: any[] = [];
  favorites: any[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUsers = async (page: number) => {
    this.loading = true;
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_limit=4&_page=${page}`,
      );
      this.users = response.data;
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      this.loading = false;
    }
  };

  login = async ({username, password}: any) => {
    console.log(username, password);
    this.loading = true;
    try {
      const {data} = await axios.get(
        `https://jsonplaceholder.typicode.com/users`,
      );
      const user = data.find(
        (user: any) => user.email === username && user.username === password,
      );
      if (user) {
        this.me = user;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Failed to login', error);
    } finally {
      this.loading = false;
    }
  };

  filterUsers = (text: string) => {
    if (text.length > 2) {
      this.users = this.users.filter(user =>
        user.name.includes(text.toString()),
      );
    } else if (text.length == 0) {
      this.fetchUsers(1);
    }
  };

  getFavs = async () => {
    try {
      const favs = await _getStore('favorites');
      if (favs && favs.length > 0) {
        this.favorites = JSON.parse(favs);
      }
    } catch (error) {
      console.error('Failed favs', error);
    } finally {
    }
  };
  toggleFavs = async (id: string) => {
    try {
      const index = this.favorites.indexOf(id);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(id);
      }
      await _setStore('favorites', JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  getFavorites = async () => {
    try {
      const ids = await _getStore('favorites');
      if (ids && ids.length > 0) {
        const promises = JSON.parse(ids).map((id: any) =>
          fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(
            response => response.json(),
          ),
        );
        const users = await Promise.all(promises);
        return users;
      } else {
        return [];
      }
    } catch (err) {
      console.error('Failed to fetch users by id', err);
    }
  };
}

const userStore = new UserStore();
export default userStore;
