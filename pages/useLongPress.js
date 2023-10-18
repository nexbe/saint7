import React, { useCallback, useRef, useState } from "react";

const isTouchEvent = (event) => {
  return "touches" in event;
};

const preventDefault = (event) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

const useLongPress = ({ onLongPress, options }) => {
  //console.log(onLongPress);
  const [longPressed, setLongPressed] = useState(false);
  const timeout = useRef();
  const target = useRef();

  const start = useCallback(
    (event) => {
      if (options?.shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressed(true);
      }, options?.delay);
    },
    [onLongPress, options?.delay, options?.shouldPreventDefault]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = false) => {
      timeout.current && clearTimeout(timeout.current);
      setLongPressed(false);
      if (options?.shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [options?.shouldPreventDefault, longPressed]
  );
  return {
    onMousedown: (e) => start(e),
    onTouchStart: (e) => start(e),
    onMouseUp: (e) => clear(e),
    onMouseLeave: (e) => clear(e, false),
    onTouchEnd: (e) => clear(e),
  };
};

export default useLongPress;
