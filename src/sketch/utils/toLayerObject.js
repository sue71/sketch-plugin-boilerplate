export default function toLayerObject(layer) {
  log("#toLayerObject");
  const color = getColorCode(layer);
  let object = {
    objectid: layer.objectID() + "",
    name: layer.name() + "",
    class: layer.class() + "",
    value: (layer.stringValue && layer.stringValue() + "") || "",
    color: color && color.NSColorWithColorSpace(nil).hexValue()
  };

  if (layer.parentGroup()) {
    object.parent = toLayerObject(layer.parentGroup());
  }

  return object;
}

// Get color from layer
function getColorCode(layer) {
  switch (layer.class()) {
    case MSTextLayer:
      return layer.textColor();
      break;

    default:
      if (layer.style) {
        const fill = layer.style().fills().first;
        if (fill && fill.isEnabled()) {
          return fill.color();
        }
      }

      return null;
  }

  return null;
}
