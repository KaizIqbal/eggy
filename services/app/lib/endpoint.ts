export const endpoint = process.env.API_URI!;

export const websocket_endpoint = endpoint.replace("https://", "ws://");
