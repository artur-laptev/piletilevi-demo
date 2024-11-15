export const getDiscounts = () => fetch('https://api.intra.piletilevi.ee/v1/discounts')
  .then((response) => response.json())
  .then((data) => data);