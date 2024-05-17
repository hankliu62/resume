import { useEffect, useState } from 'react';

import { isMobile as checkIsMobile } from '@/utils/platform';

export default function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(checkIsMobile());
  }, []);

  return isMobile;
}
