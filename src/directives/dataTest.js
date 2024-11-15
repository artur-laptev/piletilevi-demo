const getTestAttribute = (attributes) => Object.keys(attributes).reduce((result, key) => {
  const name = `data-test-attr-${key}`;

  result[name] = attributes[key];

  return result;
}, {});

export const setElementAttributes = (element, { arg, value }) => {
  const attributes = {
    ...(arg ? { 'data-test-id': arg } : {}),
    ...getTestAttribute(value || {}),
  };

   
  for (const key of Object.keys(attributes)) {
    element.setAttribute(key, attributes[key]);
  }
};

export const dataTest = {
  created: (element, binding) => setElementAttributes(element, binding),
  updated: (element, binding) => setElementAttributes(element, binding),
};
