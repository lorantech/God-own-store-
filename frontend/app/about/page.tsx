import SectionHeading from '@/components/ui/SectionHeading';

export default function AboutPage() {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <SectionHeading title="About Us" subtitle="Our Story" />
      <div className="space-y-6 text-textSecondary leading-relaxed">
        <p>
          Welcome to GODS OWN STORE, your premier destination for luxury jewelry. We are dealers in all kinds of jewelry including Xuping, Stainless Steel, and Customised Jewelry.
        </p>
        <p>
          Located at 1, Obanikoro Street, Lagos Island, we pride ourselves on offering exquisite pieces that blend timeless elegance with contemporary style. Each piece in our collection is carefully selected to meet our high standards of quality and craftsmanship.
        </p>
        <p>
          Whether you're looking for the perfect gift or treating yourself to something special, our diverse collection has something for every occasion. We also specialize in custom jewelry design to bring your unique vision to life.
        </p>
      </div>
    </div>
  );
}
