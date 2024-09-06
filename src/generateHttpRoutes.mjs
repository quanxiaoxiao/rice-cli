import { generateRouteMatchList } from '@quanxiaoxiao/httttp';
import store from './store/store.mjs';
const { dispatch } = store;

export default async (pathname) => {
  const { default: routes } = await import(`file://${pathname}`);
  const routeMatchList = generateRouteMatchList(routes);
  dispatch('routeMatchList', routeMatchList);
};
