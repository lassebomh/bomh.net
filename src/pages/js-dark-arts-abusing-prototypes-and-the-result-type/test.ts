type Result<T> = { value: T; error?: never } | { error: Error };

declare global {
  interface Function {
    try<T extends (...args: any) => any>(
      this: T,
      ...args: Parameters<T>
    ): ReturnType<T> extends Promise<infer R> ? Promise<Result<R>> : Result<ReturnType<T>>;
  }
}

Function.prototype.try = function <T extends (...args: any) => any>(this: T, ...args: Parameters<T>) {
  try {
    const maybe = this(...args);
    if ((maybe as any) instanceof Promise) {
      return maybe
        .then((value: ReturnType<T>) => ({
          value,
        }))
        .catch((error: Error) => ({ error }));
    } else {
      return { value: maybe };
    }
  } catch (error) {
    return { error: error };
  }
};

function defuseBomb(): Result<boolean> {
  if (Math.random() < 0.1) {
    return { error: new Error() };
  }

  return { value: true };
}

const result = defuseBomb();
//    ^ Result<boolean>

if (result.error === undefined) {
  console.log("defused", result.value);
  //                            ^ boolean
}

export {};
