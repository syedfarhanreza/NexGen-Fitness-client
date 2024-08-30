import { IconType } from "react-icons/lib";

export interface ICategory {
  label: string;
  Icon: IconType;
  value: string;
}
export interface IProduct {
  image: string;
  title: string;
  price: number;
  stock: number;
  details: string;
  category: string;
  _id: string;
  tag?: string;
}
