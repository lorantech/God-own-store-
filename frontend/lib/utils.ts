export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const categories = [
  'Necklaces & Pendants',
  'Rings',
  'Bracelets & Bangles',
  'Earrings & Sets',
  'Watches',
  'Customised Jewelry'
];
