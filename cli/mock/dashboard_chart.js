function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [220, 50, 111, 117, 215, 66];

      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
