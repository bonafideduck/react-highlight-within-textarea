// returns identifier strings that aren't necessarily "real" JavaScript types
export default function getType(instance) {
  let type = typeof instance;
  if (!instance) {
    return "falsey";
  } else if (Array.isArray(instance)) {
    if (
      instance.length === 2 &&
      typeof instance[0] === "number" &&
      typeof instance[1] === "number"
    ) {
      return "range";
    } else {
      return "array";
    }
  } else if (type === "object") {
    if (instance instanceof RegExp) {
      return "regexp";
    } else if (instance.hasOwnProperty("highlight")) {
      return "custom";
    }
  } else if (type === "function") {
    return "strategy"
  } else if (type === "string") {
    return type;
  }

  return "other";
}
