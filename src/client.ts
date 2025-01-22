declare const window: any;

export function googleScriptRun<Arg extends unknown, Result>(
  functionName: string,
  arg: Arg
): Promise<Result> {
  return new Promise((resolve, reject) => {
    window.google.script.run
      .withSuccessHandler((result: Result) => resolve(result))
      .withFailureHandler((error: unknown) => reject(error))
      [functionName](arg);
  });
}
