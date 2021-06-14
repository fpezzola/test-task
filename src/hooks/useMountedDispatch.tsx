import React from 'react';

// Only fire the dispatch when the component is mounted on the screen to avoid the 'Cannot update state of an unmounted component'
const useMountedDispatch = (unsafeDispatch: any) => {
  const isMountedRef = React.useRef(false)
  React.useLayoutEffect(() => {
    isMountedRef.current = true
    return () => { (isMountedRef.current = false) }
  }, []);

  return React.useCallback(
    (...args) => (isMountedRef.current ? unsafeDispatch(...args) : void 0),
    [unsafeDispatch],
  )
}

export default useMountedDispatch;
