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
  comments: ICommentItem[];
  alt_description: string;
  description: string;
  isBookmarked: boolean;
}

export interface ICommentItem {
  id: number;
  text: string;
  isLiked: boolean;
}

export interface IImageItemState {
  value: IImageItem[];
}

export interface IRootState {
  imageInfo: IImageItemState;
}
