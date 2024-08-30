import { ICategory } from "@/types";
import {
  FaBicycle,
  FaChild,
  FaDumbbell,
  FaHome,
  FaMedkit,
  FaRunning,
  FaTools,
  FaTree,
  FaTshirt,
  FaYoast,
} from "react-icons/fa";

export const categories: ICategory[] = [
  { label: "Cardio Equipment", Icon: FaRunning, value: "cardio" },
  { label: "Strength Training", Icon: FaDumbbell, value: "strength" },
  { label: "Cycling", Icon: FaBicycle, value: "cycling" },
  { label: "Yoga and Pilates", Icon: FaYoast, value: "yoga" },
  { label: "Home Gym Essentials", Icon: FaHome, value: "gym" },
  { label: "Fitness Accessories", Icon: FaTools, value: "fitness" },
  { label: "Recovery and Wellness", Icon: FaMedkit, value: "recover" },
  { label: "Apparel and Footwear", Icon: FaTshirt, value: "footwear" },
  { label: "Outdoor Fitness", Icon: FaTree, value: "outdoor" },
  { label: "Kids' Fitness", Icon: FaChild, value: "kids" },
];
