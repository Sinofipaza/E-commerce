export interface CartItems {
    id: number;
  username: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  imageurl: string | null;
  softdelete: boolean;
  ordered: boolean;
}