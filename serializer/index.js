const serialize = (data) => {
  if (Array.isArray(data)) {
    return JSON.stringify({
      data: data.map((item) => item.attributes),
    });
  }

  return JSON.stringify({
    data: data.attributes,
  });
}

const serializeError = (message) => {
  return JSON.stringify({
    message,
  });
}

module.exports = {
  serialize,
  serializeError,
};
