"use client"
import socket from "@/plugins/socket";
import {useEffect} from "react";

const socketDisconnect = (WrappedComponent) => {
    return (props) => {
        useEffect(() => {
            return () => {
                if (socket) {
                    socket.disconnect();
                }
            };
        }, []);

        return <WrappedComponent {...props}/>;
    }
}

export default socketDisconnect;