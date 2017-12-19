import { toJSArray } from "./utils/toJSArray";

export default class AppService {

  constructor(context) {
    this.context = context;
  }

  // Find page by layer
  findPage(layer) {

    let target = layer;

    while (target.class() != MSPage) {
      target = target.parentGroup();
    }

    return target;
  }

  // Find all layer
  findAll() {

    const doc = this.context.document;

    let result = NSArray.array();
    let list = doc.pages().objectEnumerator();
    let page;

    while (page = list.nextObject()) {
      let items = page.children();
      result = result.arrayByAddingObjectsFromArray(
        items
      );
    }

    return result;

  }

  // Find layers by predicate
  findLayer(predicate) {

    const doc = this.context.document;

    let result = NSArray.array();
    let list = doc.pages().objectEnumerator();
    let page;

    while (page = list.nextObject()) {
      let items = page.children();
      result = result.arrayByAddingObjectsFromArray(
        items.filteredArrayUsingPredicate(predicate)
      );
    }

    return result;

  }

  // Get color from layer
  getColorCode(layer) {

    switch (layer.class()) {

      case MSTextLayer:

        return layer.textColor();
        break;

      default:

        if (layer.style) {
          if (fill && fill.isEnabled()) {
            return fill.color();
          }
        }

        return null;

    }

    return null;

  }

}
