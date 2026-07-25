// Type declarations for Workers-compatible module imports

// WOFF font files imported as ArrayBuffer (wrangler.toml rules: type = "Data")
declare module '*.woff' {
  const content: ArrayBuffer;
  export default content;
}
