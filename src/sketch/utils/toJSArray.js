export function toJSArray(obj) {
  const l = obj.count()
  const r = [];
  for ( var i = 0; i < l; i++ ) {
    r.push(obj[i])
  }
  return r
}