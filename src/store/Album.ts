import {makeAutoObservable, configure} from 'mobx';
import axios from 'axios';
import userStore from './UserStore';
configure({
  enforceActions: 'never',
});
class AlbumStore {
  albums: any[] = [];
  album: any[] = [];
  loading: boolean = false;
  albumLoading: boolean = false;
  userStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = userStore;
  }

  fetchAlbums = async () => {
    this.loading = true;
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?userId=${this.userStore.me.id}&_limit=100`,
      );
      this.albums = groupByAlbumId(response.data);
    } catch (error) {
      console.error('Failed to fetch albums', error);
    } finally {
      this.loading = false;
    }
  };

  fetchAlbum = async (id: number) => {
    this.albumLoading = true;
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}`,
      );
      this.album = response.data;
    } catch (error) {
      console.error('Failed to fetch album', error);
    } finally {
      this.albumLoading = false;
    }
  };
}

const groupByAlbumId = (data: any) => {
  const grouped = data.reduce((acc: any, item: any) => {
    const albumIndex = acc.findIndex(
      (group: any) => group[0].albumId === item.albumId,
    );
    if (albumIndex === -1) {
      acc.push([item]);
    } else {
      acc[albumIndex].push(item);
    }
    return acc;
  }, []);
  return grouped;
};

const albumStore = new AlbumStore();
export default albumStore;
