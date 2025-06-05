import type React from 'react';
import Image from 'next/image';

const NourishNetPinIcon = ({ className = '', ...props }: { className?: string }) => (
  <div className={`relative ${className}`} style={{ width: '28px', height: '28px' }} {...props}>
    <Image
      src="/NourishNet_offical_logo.png"
      alt="NourishNet Logo"
      fill
      sizes="28px"
      className="object-contain"
      priority
    />
  </div>
);

export default NourishNetPinIcon;
