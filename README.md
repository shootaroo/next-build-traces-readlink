# next-build-traces-readlink

Minimal reproduction: with pnpm, `next build --webpack` with `output: 'standalone'` calls `readlink` about 40 times per distinct path while collecting build traces.

## Steps

```bash
pnpm install
NODE_OPTIONS="--require ./count-readlink.cjs" pnpm build
node trace-time.cjs
```

`count-readlink.cjs` counts calls to `fs/promises.readlink` in the build process, and `trace-time.cjs` prints span durations from `.next/trace`.

## Result

Next.js 16.5.0-canary.30, Node.js 22.21.0, pnpm 10.15.1, macOS (arm64):

|                           | readlink calls (distinct paths) | `node-file-trace-build` | `next build` |
| ------------------------- | ------------------------------- | ----------------------- | ------------ |
| as is                     | 180,698 (4,450)                 | 10.8–12.6s              | 16.3–19.7s   |
| custom `readlink` removed | 6,266 (4,450)                   | 8.2–8.7s                | 13.0–13.4s   |

The traced file lists (`.nft.json`) are the same in both cases, apart from webpack chunk ids.
