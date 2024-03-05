export {};

declare global {
  interface Window {
    electronAPI: {
      installEA: (arg: any) => void;
      responseOfInstallEA: (callback: (response: any) => void) => void;
    };
  }
}
