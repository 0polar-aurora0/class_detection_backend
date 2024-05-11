import { Provide } from '@midwayjs/core';

@Provide()
export class ImageInSqlite {
  getImage = (path: string) => {
    if (!path) {
      console.log('erroe: you must use path to get image');
    }
  };
}
