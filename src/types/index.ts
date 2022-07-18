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
  comments: string[];
  alt_description: string;
  description: string;
}

export interface IImageItemState {
  value: IImageItem[];
}

export interface IRootState {
  imageInfo: IImageItemState;
}
