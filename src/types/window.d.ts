interface SketchUp {
  import_file(url: string): void;
}

declare global {
  interface Window {
    sketchup: SketchUp;
  }
}

export {};
