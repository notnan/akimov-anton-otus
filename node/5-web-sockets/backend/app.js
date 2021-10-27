import { WebSocketServer } from 'ws';
import config from 'config';

const wss = new WebSocketServer({ port: config.get('wsPort') });

const onNewConnection = (ws, req) => {
  const {remoteAddress} = req.socket;
  console.log(`Connected ${remoteAddress}`);

  ws.on('message', message => {
    console.log(`Получено сообщение. ${remoteAddress}: ${message}`);
  });

  ws.send(JSON.stringify({ type: 'info', text: 'Connected' }));
};

const notify = () => {
  wss.clients.forEach(ws => {
    ws.send(JSON.stringify({ type: 'message', title: "Сообщение от сервера", text: config.get('message')}));
  });
};

setInterval(notify, config.get('timeOut'));

wss.on('connection', onNewConnection);
