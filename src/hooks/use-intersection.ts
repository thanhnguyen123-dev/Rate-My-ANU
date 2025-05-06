import { useEffect, useState } from 'react';

type UseIntersectionOptions = IntersectionObserverInit

export function useIntersection(
  elementRef: React.RefObject<Element | null>,
  options: UseIntersectionOptions = {},
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry?.isIntersecting ?? false);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, options]);

  return isIntersecting;
}
