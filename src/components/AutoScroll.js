import { useEffect, useRef } from 'react';

const AutoScroll = ({ children }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when the component mounts or updates
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [children]);

    return (
        <div>
            {children}
            <div ref={bottomRef} />
        </div>
    );
};

export default AutoScroll;