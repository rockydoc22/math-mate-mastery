/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

declare module "*.json" {
  const value: any;
  export default value;
}
