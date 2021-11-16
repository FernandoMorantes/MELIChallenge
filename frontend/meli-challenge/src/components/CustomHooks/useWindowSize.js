import {
    useLayoutEffect,
    useState
} from 'react';

// Custom hook que implementa el hook useLayoutEffect y un window listener 
// para obtener el ancho y el alto de la pantalla
function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default useWindowSize;