import { useEffect, useRef } from 'react';

/**
 * Hook para implementar lazy loading con Intersection Observer
 * @param {function} onIntersect - Callback cuando el elemento es visible
 * @param {object} options - Opciones del Intersection Observer
 * @returns {object} Ref del elemento centinela
 */
export function useInfiniteScroll(onIntersect, options = {}) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '100px',
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    }, defaultOptions);

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [onIntersect]);

  return sentinelRef;
}

/**
 * Hook para manejar el modal con Enter/Escape keys
 * @param {function} onClose - Callback para cerrar el modal
 * @returns {function} Handler de key down
 */
export function useModalKeyboard(onClose) {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return handleKeyDown;
}
