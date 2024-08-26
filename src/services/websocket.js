// src/services/websocket.js

class WebSocketClient {
    constructor() {
      this.socket = null;
    }
  
    connect(url) {
      this.socket = new WebSocket(url);
  
      this.socket.onopen = () => {
        console.log('WebSocket connection established');
      };
  
      this.socket.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  
    sendMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      } else {
        console.error('WebSocket is not open. Ready state is:', this.socket.readyState);
      }
    }
  }
  
  const webSocketClient = new WebSocketClient();
  export default webSocketClient;
  