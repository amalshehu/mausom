##### Node canvas vercel lambda

```
[GET] /api/weather
17:06:32:85
2022-07-09T11:36:33.269Z undefined ERROR Error: /lib64/libz.so.1: version `ZLIB_1.2.9' not found (required by /var/task/node_modules/canvas/build/Release/libpng16.so.16)
    at Object.Module._extensions..node (node:internal/modules/cjs/loader:1189:18)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/var/task/node_modules/canvas/lib/bindings.js:3:18)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12) {
  code: 'ERR_DLOPEN_FAILED'
}
RequestId: 25209fdf-4c2e-49f4-b9a9-0b002306d817 Error: Runtime exited with error: exit status 1
Runtime.ExitError
```
