export type Quiz = {
  id: string;
  q: string;
  qType: "option" | "text";
  options?: string[];
  answer?: string;
};
