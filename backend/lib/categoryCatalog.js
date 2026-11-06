// Category catalog imagery (Unsplash photo IDs, hotlink-friendly) with color variants.
// Each variant image is shown as a product in the matching GODS OWN STORE category.
const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

module.exports = {
  categoryCatalog: {
    'Necklaces & Pendants': [
      { color: 'Gold', name: 'Gold Pendant Necklace', group: 'Pendant Necklace', image: u('1599643478518-a784e5dc4c8f') },
      { color: 'Silver', name: 'Silver Chain Necklace', group: 'Chain Necklace', image: u('1515562141207-7a88fb7ce338') },
      { color: 'Rose Gold', name: 'Rose Gold Necklace', group: 'Signature Necklace', image: u('1611652022419-a9419f74343d') },
      { color: 'Emerald', name: 'Emerald Accent Necklace', group: 'Accent Necklace', image: u('1602751584552-8ba73aad10e1') },
      { color: 'Pearl', name: 'Pearl Pendant Necklace', group: 'Pearl Necklace', image: u('1535632066927-ab7c9ab60908') },
    ],
    'Rings': [
      { color: 'Gold', name: 'Gold Statement Ring', group: 'Statement Ring', image: u('1605100804763-247f67b3557e') },
      { color: 'Silver', name: 'Silver Band Ring', group: 'Band Ring', image: u('1603561591411-07134e71a2a9') },
      { color: 'Rose Gold', name: 'Rose Gold Ring', group: 'Classic Ring', image: u('1603974372039-adc49044b6bd') },
      { color: 'Diamond', name: 'Crystal Diamond Ring', group: 'Crystal Ring', image: u('1602751584552-8ba73aad10e1') },
      { color: 'Black', name: 'Black Onyx Ring', group: 'Onyx Ring', image: u('1617038260897-41a1f14a8ca0') },
    ],
    'Bracelets & Bangles': [
      { color: 'Gold', name: 'Gold Bangle Bracelet', group: 'Bangle Bracelet', image: u('1611591437281-460bfbe1220a') },
      { color: 'Silver', name: 'Silver Charm Bracelet', group: 'Charm Bracelet', image: u('1573408301185-9146fe634ad0') },
      { color: 'Rose Gold', name: 'Rose Gold Cuff', group: 'Cuff Bracelet', image: u('1602173574767-37ac01994b2a') },
      { color: 'Emerald', name: 'Emerald Bracelet', group: 'Gem Bracelet', image: u('1535632787350-4e68ef0ac584') },
      { color: 'Pearl', name: 'Pearl Bracelet', group: 'Pearl Bracelet', image: u('1599643477877-530eb83abc8e') },
    ],
    'Earrings & Sets': [
      { color: 'Gold', name: 'Gold Drop Earrings', group: 'Drop Earrings', image: u('1535632066927-ab7c9ab60908') },
      { color: 'Silver', name: 'Silver Stud Earrings', group: 'Stud Earrings', image: u('1635767798638-3e25273a8236') },
      { color: 'Rose Gold', name: 'Rose Gold Earring Set', group: 'Earring Set', image: u('1588444837495-c6cfeb53f32d') },
      { color: 'Emerald', name: 'Emerald Earrings', group: 'Gem Earrings', image: u('1617038260897-41a1f14a8ca0') },
      { color: 'Pearl', name: 'Pearl Earring Set', group: 'Pearl Earrings', image: u('1610694955371-d4a3e0ce4b52') },
    ],
    'Watches': [
      { color: 'Gold', name: 'Gold Luxury Watch', group: 'Luxury Watch', image: u('1524592094714-0f0654e20314') },
      { color: 'Silver', name: 'Silver Classic Watch', group: 'Classic Watch', image: u('1522312346375-d1a52e2b99b3') },
      { color: 'Rose Gold', name: 'Rose Gold Watch', group: 'Fashion Watch', image: u('1523170335258-f5ed11844a49') },
      { color: 'Black', name: 'Black Strap Watch', group: 'Strap Watch', image: u('1508685096489-7aacd43bd3b1') },
      { color: 'Two-Tone', name: 'Two-Tone Fashion Watch', group: 'Two-Tone Watch', image: u('1547996160-81dfa63595aa') },
    ],
    'Customised Jewelry': [
      { color: 'Gold', name: 'Custom Gold Name Piece', group: 'Name Piece', image: u('1611652022419-a9419f74343d') },
      { color: 'Silver', name: 'Custom Silver Pendant', group: 'Custom Pendant', image: u('1515562141207-7a88fb7ce338') },
      { color: 'Rose Gold', name: 'Custom Rose Gold Gift', group: 'Gift Piece', image: u('1602173574767-37ac01994b2a') },
      { color: 'Mixed', name: 'Bespoke Mixed-Metal Set', group: 'Bespoke Set', image: u('1599643478518-a784e5dc4c8f') },
      { color: 'Personalised', name: 'Personalised Jewelry Design', group: 'Personalised Design', image: u('1535632787350-4e68ef0ac584') },
    ],
  },
};
