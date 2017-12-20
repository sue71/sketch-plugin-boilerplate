import WebUI from 'sketch-module-web-view';

/**
 * App
 * Controller for sketch plugins
 */
export class App {
  get identifier() {
    return 'com.github.sue71.pluginname';
  }

  constructor(context, debug) {
    log('App#constructor');
    this.setup(context, debug);
  }

  setup(context, debug) {
    log('App#setup');

    const width = 320;
    const height = 480;
    this.webUI = new WebUI(context, 'index.html', {
      identifier: this.identifier, // to reuse the UI
      x: 0,
      y: 0,
      width: width,
      height: height,
      background: NSColor.whiteColor(),
      blurredBackground: false,
      onlyShowCloseButton: true,
      title: 'Plugin title',
      hideTitleBar: false,
      shouldKeepAround: true,
      resizable: false,
      frameLoadDelegate: {
        'webView:didFinishLoadForFrame:': (webView, webFrame) => {
          log('App#didFinishLoadForFrame');
          const message = 'ping';
          this.webUI.eval(`window.bridge(${message})`);
        }
      },
      onPanelClose: () => {
        WebUI.clean();
      },
      uiDelegate: {}, // https://developer.apple.com/reference/webkit/webuidelegate?language=objc
      handlers: {
        callFromJS: message => {
          log(message);
        }
      }
    });

    // set context
    this.context = context;
  }
}
