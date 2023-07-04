declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}

declare module "react-fullpage";

declare module "*.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
