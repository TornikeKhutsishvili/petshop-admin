export interface animalsList {
  uuid: number;
  name: string;
  species?: string;
  breed?: string;
  age?: number;
  price: number;
  image: string;
  description: string;
  inStock?: number;
  popular?: boolean;
}
