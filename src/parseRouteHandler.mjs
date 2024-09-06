import { generateRouteMatchList } from '@quanxiaoxiao/httttp';

export default async (pathname) => {
  const { default: config } = await import(`file://${pathname}`);
  if (typeof config.onRequest === 'function') {
    return {
      routeMatchList: generateRouteMatchList(config.routes || {}),
      onRequest: config.onRequest,
    };
  }
  return {
    onRequest: () => {},
    routeMatchList: generateRouteMatchList(config),
  };
};
