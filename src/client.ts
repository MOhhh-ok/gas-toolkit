declare global {
  interface Window {
    google?: { script: { run: any } };
  }
}

declare const window: Window;

export function googleScriptRun<Arg extends unknown, Result>(
  functionName: string,
  arg: Arg,
  ops?: {
    mock?: (arg: Arg) => Promise<Result>;
  }
): Promise<Result> {
  if (window.google) {
    return new Promise((resolve, reject) => {
      window.google?.script.run
        .withSuccessHandler((result: Result) => resolve(result))
        .withFailureHandler((error: unknown) => reject(error))
        [functionName](arg);
    });
  } else if (ops?.mock) {
    return ops.mock(arg);
  } else {
    throw new Error('Google Script Run is not available');
  }
}
