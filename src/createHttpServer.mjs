import net from 'node:net';

import {
  createHttpRequestHandler,
  handleSocketRequest,
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
