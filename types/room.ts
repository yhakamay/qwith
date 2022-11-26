import { Quiz } from "./quiz";

export type Room = {
  id: string;
  pin: number;
  status: "waiting" | "playing" | "finished";
  description: string;
  quizzes: Quiz[];
};
