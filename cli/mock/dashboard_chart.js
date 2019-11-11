function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [220, 130, 111, 117, 215, 616];

      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
