import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(isVisible) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const animetedElementRef = useRef(null);

  useEffect(() => {
    function handleAnimationEnd() {
      setShouldRender(false);
    }
    const elementRef = animetedElementRef.current;

    if (isVisible) setShouldRender(true);

    if (!isVisible && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [isVisible]);
  return { shouldRender, animetedElementRef };
}
