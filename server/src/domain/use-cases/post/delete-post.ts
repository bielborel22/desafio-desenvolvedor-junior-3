export interface DeletePost {
  delete(id: string): Promise<boolean>;
}
