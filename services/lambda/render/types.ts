export interface Image {
  fileName: string;
  contentType: string;
  Body: Buffer;
  encoding: string;
}

export interface RenderImages {
  [key: string]: Array<Image>;
}
