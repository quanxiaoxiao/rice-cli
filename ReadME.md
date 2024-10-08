### Example

```shell
$ rice --port 3333 --config rice.config.mjs
```


### `rice.config.mjs`

```javascript
  onRequest: () => {},
  routes: {
    '/forward/(.*)': {
      get: (ctx) => {
        ctx.forward = {
          hostname: '127.0.0.1',
          path: `/${ctx.request.params[0]}?${ctx.request.querystring}`,
          port: 6566,
        };
      },
    },
    '/test': {
      get: (ctx) => {
        ctx.response = {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
          body: fs.readFileSync(path.resolve(process.cwd(), 'dist', 'static', 'index.html')),
        };
      },
    },
    '/static/(.*)': {
      get: (ctx) => {
        const pathname = path.resolve(process.cwd(), 'dist', 'static', ctx.request.params[0]);
        if (!fs.existsSync(pathname)) {
          throw createError(404);
        }
        const contentType = path.extname(pathname) ? mime.getType(path.extname(pathname)) : null;
        ctx.response = {
          headers: {
            ...contentType ? {
              'Content-Type': contentType,
            } : {},
          },
          body: fs.readFileSync(path.resolve(pathname)),
        };
      },
    },
  },
```
