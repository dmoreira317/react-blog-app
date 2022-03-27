import {useState, useEffect} from 'react';

const useWindowSize = ()=>{
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(()=>{
        const handleResize = ()=>{
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        handleResize();

        // Set listener for resizing to catch that event and get every resizing to use this func.
        window.addEventListener("resize", handleResize);

        // Prevent memory leak by cleaning up the event listener.
        const cleanUp = ()=>{
            console.log('runs if a useeffect dependency changes');
            window.removeEventListener("resize", handleResize);
        }

        // Return from the useeffect to use the cleanUp func
        return cleanUp;
    },[]);

    return windowSize;
}

export default useWindowSize;