// hook from https://usehooks.com/useOnClickOutside/
import { useEffect } from "react";

// Hook
function useOnClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: { target: any }) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, // ... function on every render that will cause this effect ... // It's worth noting that because passed in handler is a new ... // Add ref and handler to effect dependencies
  // ... callback/cleanup to run every render. It's not a big deal ...
  // ... but to optimize you can wrap handler in useCallback before ...
  // ... passing it into this hook.
  [ref, handler]);
}

export default useOnClickOutside;
