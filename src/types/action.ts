export default interface Action {
  id: number | string;
  from: number;
  to: number;
  moved?: boolean;
}
