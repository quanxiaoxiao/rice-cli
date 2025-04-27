import process from 'node:process';

import { getPathname } from '@quanxiaoxiao/node-utils';
import shelljs from 'shelljs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import createHttpServer from './createHttpServer.mjs';
import getPackageInfo from './getPackageInfo.mjs';
import parseRouteHandler from './parseRouteHandler.mjs';

const argv = yargs(hideBin(process.argv))
  .option('port', {
    alias: 'p',
    type: 'number',
    description: 'listen port default is 3000',
    default: 3000,
  })
  .option('config', {
    alias: 'c',
    type: 'string',
    description: 'http route config file path',
    default: 'rice.config.mjs',
  })
  .coerce('port', (port) => {
    if (port <= 0 || port > 65535) {
      throw new Error(`port \`${port}\` invalid`);
    }
    return port;
  })
  .coerce('config', (pathname) => {
    const routePathname = getPathname(pathname);
    if (!shelljs.test('-f', routePathname)) {
      throw new Error(`route config \`${routePathname}\` not found`);
    }
    return routePathname;
  })
  .version(getPackageInfo().version)
  .parse();

process.nextTick(async () => {
  const { onRequest, routeMatchList } = await parseRouteHandler(argv.config);
  createHttpServer({
    port: argv.port,
    onRequest,
    routeMatchList,
  });
});
