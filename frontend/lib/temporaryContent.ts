import { CEOCorner, Review } from '@/types';

export const temporaryCeoCorner: CEOCorner = {
  _id: 'temp-ceo-corner',
  title: 'A Word from Our Founder',
  fullName: "GOD'S OWN STORE",
  position: 'Founder & CEO',
  welcomeMessage: 'Welcome to GOD’S OWN STORE — where elegance, quality, and personal style meet.',
  introduction:
    "At GOD'S OWN STORE, we believe every piece of jewelry should feel meaningful. From everyday elegance to statement pieces and customised designs, our focus is simple: offer beautiful jewelry that customers can wear with confidence.",
  story:
    "GOD'S OWN STORE was created to make quality jewelry accessible without losing the feeling of luxury. What began as a passion for timeless accessories has grown into a trusted destination for necklaces, rings, bracelets, earrings, watches, and bespoke pieces crafted to match each customer's style.",
  vision:
    'To become a trusted jewelry brand known for elegance, authenticity, and memorable customer experiences across every collection we offer.',
  mission:
    'To provide carefully selected and customised jewelry pieces with excellent service, honest value, and a luxury feel that every customer deserves.',
  personalMessage:
    'Thank you for choosing GOD’S OWN STORE. Every order matters to us, and we are committed to helping you find pieces that celebrate your moments, your style, and your story.',
  quote:
    'Thank you for choosing GOD’S OWN STORE. Every order matters to us, and we are committed to helping you find pieces that celebrate your moments, your style, and your story.',
  content:
    "At GOD'S OWN STORE, we believe every piece of jewelry should feel meaningful. From everyday elegance to statement pieces and customised designs, our focus is simple: offer beautiful jewelry that customers can wear with confidence.",
  image: '',
  published: true,
  createdAt: '2026-01-01T00:00:00.000Z',
};

export const temporaryReviews: Review[] = [
  {
    _id: 'temp-review-1',
    name: 'Amaka O.',
    handle: '@amaka.luxe',
    rating: 5,
    title: 'Elegant & Timely',
    comment:
      "I ordered a customised necklace and the finish was beautiful. The team was patient with my request and delivery was smooth. GOD'S OWN STORE made the whole experience feel premium.",
    type: 'text',
    approved: true,
    createdAt: '2026-03-12T10:00:00.000Z',
  },
  {
    _id: 'temp-review-2',
    name: 'Tunde A.',
    handle: '@tunde.a',
    rating: 5,
    title: 'Perfect Gift Piece',
    comment:
      'Bought a stainless steel bracelet as a birthday gift and it looked even better in person. Great quality, neat packaging, and fast WhatsApp support.',
    type: 'text',
    approved: true,
    createdAt: '2026-03-28T10:00:00.000Z',
  },
  {
    _id: 'temp-review-3',
    name: 'Chioma N.',
    handle: '@chioma.style',
    rating: 5,
    title: 'My Go-To Jewelry Store',
    comment:
      'The earrings set I purchased is lightweight, classy, and exactly what I wanted. I love that I can get Xuping, stainless steel, and customised options in one place.',
    type: 'text',
    approved: true,
    createdAt: '2026-04-10T10:00:00.000Z',
  },
];