import {
  createRef, useCallback, useEffect, useRef, useState,
} from 'react';

export default function useAnimatedList(initialValue = []) {
  const [pendingRemovalitemsIds, setPendingRemovalItemsIds] = useState(initialValue);
  const [items, setItems] = useState([]);
  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animatedRefs.current.delete(itemId);
    animationEndListeners.current.delete(itemId);

    setItems((prevState) => prevState.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds((prevState) => prevState.filter((id) => itemId !== id));
  }, []);

  useEffect(() => {
    pendingRemovalitemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alredyHasListener = animationEndListeners.current.has(itemId);

      if (animatedElement && !alredyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [pendingRemovalitemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;
    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback(
    (id) => {
      setPendingRemovalItemsIds(
        (prevState) => [...prevState, id],
      );
    },
    [],
  );

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }
    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalitemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);
      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, pendingRemovalitemsIds, getAnimatedRef]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
