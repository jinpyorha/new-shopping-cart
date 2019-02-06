export const formatPrice = (x, currency) => {
  switch (currency) {
    case 'KRW':
      return x.toFixed(3).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};
