/// <reference path="../node_modules/@types/w3c-screen-orientation/index.d.ts" />
/// <reference path="../node_modules/@types/html2canvas/index.d.ts" />

interface Console {
  history: string[],
  store: (type: string, lines: IArguments) => void,
}

interface Window {
  console: Console,
}

interface Navigator {
  readonly oscpu?: string,
  readonly userLanguage?: string,
}
