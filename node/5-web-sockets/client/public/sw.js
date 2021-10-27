const PARAMS = {
    WS_ULR: "ws://localhost:5000"
}

self.addEventListener('install', event => {
    console.log('Service worker установлен');
});

self.addEventListener('activate', function(event) {
    console.log('Service worker активирован');
});

socket = new WebSocket(PARAMS.WS_ULR);

socket.onopen = () => {
    socket.send('Hello');
};

socket.onclose = (e) => {
    console.log(`WebSocket close: ${e}`)
};

socket.onmessage = async (e) => {
    const { title, text } = JSON.parse(e.data);
    try {
        const clients = await globalThis.clients.matchAll({
            includeUncontrolled: true,
            type: "window",
        });

        if (clients) {
            clients.forEach((client) => {
                client.postMessage({
                    title,
                    text,
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
};
