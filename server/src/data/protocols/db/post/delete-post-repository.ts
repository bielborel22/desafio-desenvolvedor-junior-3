export interface DeletePostRepository {
  delete(id: string): Promise<boolean>;
}
