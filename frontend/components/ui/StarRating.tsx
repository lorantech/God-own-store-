import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 16 }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size}
          className={star <= rating ? 'text-gold' : 'text-textSecondary'}
        />
      ))}
    </div>
  );
}
