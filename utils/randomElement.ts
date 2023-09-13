export const randomElement = <T>(arr: Array<T>): (typeof arr)[number] =>
  arr[Math.floor(Math.random() * arr.length)];