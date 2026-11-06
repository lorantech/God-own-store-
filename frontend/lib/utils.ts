export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
};

export const categories = [
  'Necklaces & Pendants',
  'Rings',
  'Bracelets & Bangles',
  'Earrings & Sets',
  'Watches',
  'Customised Jewelry'
];
