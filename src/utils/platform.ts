export function isServer() {
  return typeof window === "undefined";
}

export function setPageTitle(title: string) {
  if (isServer()) {
    return;
  }

  document.title = title;
}

export function getUrl() {
  return isServer()
    ? ""
    : window.location.href.replace(window.location.hash, "");
}

export function getHref() {
  return isServer() ? "" : window.location.href;
}

export function getUrlOrigin() {
  return isServer() ? "" : window.location.origin;
}

export function isDebugJSSDK() {
  return isServer() ? false : /DEBUG_JS_SDK/.test(window.location.hash);
}

export function isWechat() {
  return isServer() ? false : /MicroMessenger/.test(window.navigator.userAgent);
}

export function getSignatureUrl() {
  return isServer() ? "" : `${getUrlOrigin()}/v1/api/wechat/getJsConfig`;
}

export function isBuildRelease() {
  return process.env.NODE_ENV === "production";
}

export function isEnvProduction() {
  return process.env.ENV === "production";
}

export function clientWidth() {
  return isServer() ? 0 : window.document.body.clientWidth;
}

export function isMobile() {
  return isServer()
    ? false
    : /android|webos|iphone|ipod|blackberry/i.test(window.navigator.userAgent);
}

export function isWebkit() {
  return isServer() ? false : /webkit/i.test(window.navigator.userAgent);
}

export function isSafari() {
  const ua = window.navigator.userAgent;
  return isServer() ? false : /Safari/.test(ua) && !/Chrome/.test(ua);
}

// 判断 parent 包含 child
export function isChildOf(child: Element, parent: Element) {
  if (child.parentNode === parent) {
    return true;
  }

  if (child.parentNode === null) {
    return false;
  }

  return isChildOf(child.parentNode as Element, parent);
}
