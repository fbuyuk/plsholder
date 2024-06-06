import {makeAutoObservable, configure} from 'mobx';
import axios from 'axios';
import userStore from './UserStore';
configure({
  enforceActions: 'never',
});
class PostStore {
  posts: any[] = [];
  loading: boolean = false;
  userStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = userStore;
  }

  fetchPosts = async (page: number) => {
    this.loading = true;
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.userStore.me.id}&_limit=3&_page=${page}`,
      );
      this.posts = response.data;
    } catch (error) {
      console.error('Failed to fetch posts', error);
    } finally {
      this.loading = false;
    }
  };

  filterPosts = (text: string) => {
    if (text.length > 2) {
      this.posts = this.posts.filter(post =>
        post.title.includes(text.toString()),
      );
    } else if (text.length == 0) {
      this.fetchPosts(1);
    }
  };
}

const postStore = new PostStore();
export default postStore;
