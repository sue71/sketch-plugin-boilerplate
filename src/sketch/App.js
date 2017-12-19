import WebUI from "sketch-module-web-view";
import AppService from "./AppService.js";
import { toJSArray } from "./utils/toJSArray";
import toLayerObject from "./utils/toLayerObject";

/**
 * App
 * Controller for sketch plugins
 */
export class App {
  get identifier() {
    return "com.github.sue71.pluginname";
  }

  constructor(context, debug) {
    log("App#constructor");
    this.setup(context, debug);
  }

  setup(context, debug) {
    log("App#setup");

    this.webUI = new WebUI(context, "index.html", {
      identifier: this.identifier, // to reuse the UI
      x: 0,
      y: 0,
      width: 320,
      height: 480,
      background: NSColor.whiteColor(),
      blurredBackground: false,
      onlyShowCloseButton: true,
      title: "Plugin title",
      hideTitleBar: false,
      shouldKeepAround: true,
      resizable: false,
      frameLoadDelegate: {
        "webView:didFinishLoadForFrame:": (webView, webFrame) => {
          log("App#FinishLoadForFrame");
        }
      },
      onPanelClose: () => {
        WebUI.clean();
      },
      uiDelegate: {}, // https://developer.apple.com/reference/webkit/webuidelegate?language=objc
      handlers: {
        didSelectLayer: this.didSelectLayer.bind(this),
        didSearchByText: this.didSearchByText.bind(this)
      }
    });

    // set context
    this.context = context;
    // set service
    this.service = new AppService(context);
  }

  /**
   * Handle select layer
   * @param {*} value
   */
  didSearchByText(value) {
    const predicate = NSPredicate.predicateWithFormat(
      "name CONTAINS [c] %@ ||" + "stringValue CONTAINS [c] %@",
      value,
      value
    );

    const layerObjects = toJSArray(this.service.findLayer(predicate)).map(v =>
      toLayerObject(v)
    );

    let action = {
      type: "loadLayers",
      payload: layerObjects
    };
    this.webUI.eval(`window.bridge(${JSON.stringify(action)})`);
  }

  /**
   * Handle select layer
   * @param {*} selectedID
   */
  didSelectLayer(selectedID) {
    log("App#didSelectLayer");

    const predicate = NSPredicate.predicateWithFormat(
      "objectID == %@",
      selectedID
    );

    const layer = this.service.findLayer(predicate)[0];
    const page = this.service.findPage(layer);

    this.context.document.setCurrentPage(page);
    layer.select_byExpandingSelection(true, false);
    this.context.document
      .currentView()
      .centerRect_(layer.absoluteRect().rect());
  }
}
