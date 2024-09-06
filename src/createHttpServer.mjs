import net from 'node:net';
import {
  handleSocketRequest,
  createHttpRequestHandler,
} from '@quanxiaoxiao/httttp';

export default ({
  routeMatchList,
  onRequest,
  port,
}) => {
  const server = net.createServer((socket) => handleSocketRequest({
    socket,
    ...createHttpRequestHandler({
      onRequest,
      list: routeMatchList,
    }),
  }));

  server.listen(port, () => {
    console.log(`server listen at \`${port}\``);
  });
};
