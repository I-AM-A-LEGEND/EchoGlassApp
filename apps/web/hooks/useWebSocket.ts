import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to manage WebSocket connections with basic reconnection.
 *
 * @param {string} url - The WebSocket server URL.
 * @param {number} [reconnectInterval=5000] - Interval in ms to attempt reconnection.
 * @returns {object} An object containing connection status, data, and send function.
 */
const useWebSocket = (url: string, reconnectInterval: number = 5000) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [error, setError] = useState<Event | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timer ID

  const connect = useCallback(() => {
    console.log(`useWebSocket: Attempting to connect to ${url}...`);
    setError(null); // Clear previous errors on new attempt

    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('useWebSocket: Connected');
      setIsConnected(true);
      setError(null);
      // Clear any existing reconnect timer upon successful connection
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setLastMessage(message);
      } catch (e) {
        console.error('useWebSocket: Failed to parse message:', e);
        setLastMessage(event.data);
      }
    };

    ws.onerror = (event) => {
      console.error('useWebSocket: Error:', event);
      setError(event);
      // Error often precedes close, don't set socket to null here
    };

    ws.onclose = (event) => {
      console.log('useWebSocket: Disconnected:', event.code, event.reason);
      setIsConnected(false);
      setSocket(null);

      // Attempt to reconnect only if not explicitly closed (or based on specific codes)
      if (!event.wasClean && reconnectInterval > 0) {
         // Avoid setting multiple timers
        if (!reconnectTimerRef.current) {
             console.log(`useWebSocket: Will attempt to reconnect in ${reconnectInterval}ms...`);
             reconnectTimerRef.current = setTimeout(() => {
                reconnectTimerRef.current = null; // Clear ref before next attempt
                connect(); // Retry connection
             }, reconnectInterval);
        }
      }
    };

    // Note: socket state is set in onopen to ensure it's ready

  }, [url, reconnectInterval]);

  // Initial connection effect
  useEffect(() => {
    if (!url) return;

    connect(); // Initial connection attempt

    // Cleanup function
    return () => {
      console.log('useWebSocket: Cleaning up connection...');
      // Clear reconnect timer if component unmounts
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      // Explicitly close the socket if it exists
      socket?.close(1000, 'Component unmounted'); // 1000 is normal closure
      setIsConnected(false);
      setSocket(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]); // Only re-run if URL changes

  /**
   * Sends a message through the WebSocket connection.
   */
  const sendMessage = useCallback((data: any) => {
    if (socket && isConnected) {
      try {
        socket.send(JSON.stringify(data));
      } catch (e) {
        console.error('useWebSocket: Failed to send message:', e);
      }
    } else {
      console.warn('useWebSocket: Not connected. Cannot send message.');
    }
  }, [socket, isConnected]);

  return {
    isConnected,
    lastMessage,
    error,
    sendMessage,
  };
};

export default useWebSocket;
