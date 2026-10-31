import GoldButton from '@/components/ui/GoldButton';

export default function NotFound() {
  return (
    <div className="py-20 px-4 text-center">
      <h1 className="font-cormorant text-6xl text-gold mb-4">404</h1>
      <p className="text-textSecondary mb-8">Page not found</p>
      <GoldButton href="/">Return Home</GoldButton>
    </div>
  );
}
