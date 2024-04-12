import { useEffect, useCallback, RefObject } from 'react';
import { useDragLayer, XYCoord, DragLayerMonitor } from 'react-dnd';

interface UseScrollOnDragParams {
  sensitivity?: number;
  speed?: number;
}

interface DragLayerState {
  isDragging: boolean;
  clientOffset: XYCoord | null;
}

const useScrollOnDrag = (
  scrollContainerRef: RefObject<HTMLDivElement>,
  { sensitivity = 30, speed = 30 }: UseScrollOnDragParams
): void => {
  const collectMonitorItems = (monitor: DragLayerMonitor): DragLayerState => ({
    isDragging: monitor.isDragging(),
    clientOffset: monitor.getClientOffset(),
  });

  const { isDragging, clientOffset } = useDragLayer(collectMonitorItems);

  const scrollAutomatically = useCallback(() => {
    if (!isDragging || !clientOffset || !scrollContainerRef.current) {
      return;
    }

    handleVerticalScroll(
      clientOffset,
      scrollContainerRef.current,
      sensitivity,
      speed
    );
  }, [isDragging, clientOffset, scrollContainerRef, sensitivity, speed]);

  useEffect(() => {
    const interval = setInterval(scrollAutomatically, 1);
    return () => clearInterval(interval);
  }, [scrollAutomatically]);
};

const handleVerticalScroll = (
  clientOffset: XYCoord,
  container: HTMLElement,
  sensitivity: number,
  speed: number
): void => {
  const { top, bottom } = container.getBoundingClientRect();
  const { y } = clientOffset;

  if (y >= bottom - sensitivity) {
    container.scrollTop += speed;
  } else if (y <= top + sensitivity) {
    container.scrollTop -= speed;
  }
};

export default useScrollOnDrag;
