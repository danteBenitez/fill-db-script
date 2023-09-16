export const unique = <T, A>(
  callback: (...args: A[]) => T,
  includes: (arr: Array<T>, elmt: T) => boolean = Array.prototype.includes.call
) => {
  const selected: Array<T> = [];

  return (...args: A[]) => {
    let result;
    while (true) {
      result = callback(...args);
      const included = includes(selected, result);
      if (!included) {
        selected.push(result);
        return result;
      }
    }
  };
};
