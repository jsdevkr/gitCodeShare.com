/**
 * @description
 *  - https://developer.github.com/v3/gists/#create-a-gist
 */
export interface IFile {
  content?: string;
  filename?: string;
}
export interface IGist {
  files: {
    [filename: string]: IFile;
  };
  description?: string;
  public?: boolean; // default false
}
