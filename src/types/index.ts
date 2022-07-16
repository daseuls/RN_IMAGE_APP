export interface IImageItem {
  id: string;
  urls: {
    small: string;
  };
  height: number;
  user: {
    name: string;
    profile_image: {
      small: string;
    };
  };
}
