'use client';

import { useState } from 'react';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { FaCloudUploadAlt } from 'react-icons/fa';

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  accept?: string;
  folder: string;
  label: string;
}

export default function CloudinaryUpload({ onUpload, accept = 'image/*', folder, label }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const max = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > max) return alert(isVideo ? 'Video must be 50MB or less.' : 'Image must be 10MB or less.');

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, folder);
      setPreview(url);
      onUpload(url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <label className="block font-cinzel text-xs tracking-widest uppercase text-gold mb-2">
        {label}
      </label>
      <label className="border-2 border-dashed border-emerald hover:border-gold bg-primary p-8 text-center cursor-pointer transition-colors block">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />
        {uploading ? (
          <p className="text-textSecondary">Uploading...</p>
        ) : preview ? (
          <div>
            {accept.includes('image') && !accept.includes('video') ? (
              <img src={preview} alt="Preview" className="h-20 mx-auto object-cover" />
            ) : (
              <video src={preview} className="h-20 mx-auto" />
            )}
            <p className="text-textSecondary text-sm mt-2">Click to upload another</p>
          </div>
        ) : (
          <div>
            <FaCloudUploadAlt size={32} className="mx-auto text-gold mb-2" />
            <p className="text-textSecondary text-sm">Click to upload</p>
          </div>
        )}
      </label>
    </div>
  );
}
