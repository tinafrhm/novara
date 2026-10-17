import { mkdirSync, writeFileSync } from 'node:fs'

mkdirSync('src/lottie', { recursive: true })

const cyan = [0.353, 0.831, 1, 1]
const cyanSoft = [0.72, 0.92, 1, 1]

function transform(extra = {}) {
  return {
    ty: 'tr',
    p: { a: 0, k: [0, 0] },
    a: { a: 0, k: [0, 0] },
    s: { a: 0, k: [100, 100] },
    r: { a: 0, k: extra.r ?? 0 },
    o: { a: 0, k: extra.o ?? 100 },
  }
}

function layer(ind, name, shapes, rotation, opacity, op = 240) {
  return {
    ddd: 0,
    ind,
    ty: 4,
    nm: name,
    sr: 1,
    ks: {
      o: opacity ?? { a: 0, k: 100 },
      r: rotation,
      p: { a: 0, k: [200, 200, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes,
    ip: 0,
    op,
    st: 0,
  }
}

function staticRot(deg) {
  return { a: 0, k: deg }
}

function spin(turns, frames) {
  return {
    a: 1,
    k: [
      { t: 0, s: [0], i: { x: [1], y: [1] }, o: { x: [0], y: [0] } },
      { t: frames, s: [360 * turns] },
    ],
  }
}

function hand(len, width, color) {
  return [
    {
      ty: 'gr',
      nm: 'hand',
      it: [
        {
          ty: 'rc',
          d: 1,
          p: { a: 0, k: [0, -len / 2] },
          s: { a: 0, k: [width, len] },
          r: { a: 0, k: width / 2 },
        },
        { ty: 'fl', c: { a: 0, k: color }, o: { a: 0, k: 100 } },
        transform(),
      ],
    },
  ]
}

function ticks() {
  const groups = []
  for (let i = 0; i < 12; i += 1) {
    const major = i % 3 === 0
    groups.push({
      ty: 'gr',
      nm: `tick${i}`,
      it: [
        {
          ty: 'rc',
          d: 1,
          p: { a: 0, k: [0, -124] },
          s: { a: 0, k: [major ? 5 : 3, major ? 14 : 8] },
          r: { a: 0, k: 2 },
        },
        { ty: 'fl', c: { a: 0, k: cyan }, o: { a: 0, k: major ? 100 : 50 } },
        transform({ r: i * 30 }),
      ],
    })
  }
  return groups
}

function ring() {
  return [
    {
      ty: 'gr',
      nm: 'ring',
      it: [
        { ty: 'el', d: 1, p: { a: 0, k: [0, 0] }, s: { a: 0, k: [300, 300] } },
        { ty: 'st', c: { a: 0, k: cyan }, o: { a: 0, k: 100 }, w: { a: 0, k: 6 }, lc: 2, lj: 2 },
        transform(),
      ],
    },
  ]
}

function hub() {
  return [
    {
      ty: 'gr',
      nm: 'hub',
      it: [
        { ty: 'el', d: 1, p: { a: 0, k: [0, 0] }, s: { a: 0, k: [18, 18] } },
        { ty: 'fl', c: { a: 0, k: cyanSoft }, o: { a: 0, k: 100 } },
        transform(),
      ],
    },
  ]
}

const clock = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 240,
  w: 400,
  h: 400,
  nm: 'Novara Clock',
  ddd: 0,
  assets: [],
  layers: [
    layer(1, 'hub', hub(), staticRot(0)),
    layer(2, 'second', hand(128, 3, cyanSoft), spin(8, 240)),
    layer(3, 'minute', hand(110, 6, cyanSoft), spin(1, 240)),
    layer(4, 'hour', hand(74, 8, cyan), staticRot(-60)),
    layer(5, 'ticks', ticks(), staticRot(0)),
    layer(6, 'ring', ring(), staticRot(0)),
  ],
}

function quad(p0, p1, p2) {
  const c1 = [p0[0] + (2 / 3) * (p1[0] - p0[0]), p0[1] + (2 / 3) * (p1[1] - p0[1])]
  const c2 = [p2[0] + (2 / 3) * (p1[0] - p2[0]), p2[1] + (2 / 3) * (p1[1] - p2[1])]
  return {
    c: false,
    v: [p0, p2],
    o: [
      [c1[0] - p0[0], c1[1] - p0[1]],
      [0, 0],
    ],
    i: [
      [0, 0],
      [c2[0] - p2[0], c2[1] - p2[1]],
    ],
  }
}

function fade(delay) {
  const points = [
    [0, 42],
    [delay, 42],
    [delay + 14, 100],
    [72, 100],
    [104, 48],
    [140, 42],
  ]
  const keys = []
  let last = -1
  for (const [time, value] of points) {
    const t = Math.max(time, last + 1)
    const key = { t, s: [value], i: { x: [0.6], y: [1] }, o: { x: [0.4], y: [0] } }
    keys.push(key)
    last = t
  }
  delete keys[keys.length - 1].i
  delete keys[keys.length - 1].o
  return { a: 1, k: keys }
}

function arcLayer(ind, name, p0, p1, p2, delay, width) {
  return {
    ddd: 0,
    ind,
    ty: 4,
    nm: name,
    sr: 1,
    ks: {
      o: fade(delay),
      r: { a: 0, k: 0 },
      p: { a: 0, k: [0, 0, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      {
        ty: 'gr',
        nm: name,
        it: [
          { ty: 'sh', ks: { a: 0, k: quad(p0, p1, p2) } },
          { ty: 'st', c: { a: 0, k: cyan }, o: { a: 0, k: 100 }, w: { a: 0, k: width }, lc: 2, lj: 2 },
          transform(),
        ],
      },
    ],
    ip: 0,
    op: 140,
    st: 0,
  }
}

function dotLayer() {
  return {
    ddd: 0,
    ind: 4,
    ty: 4,
    nm: 'dot',
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [200, 292, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      {
        ty: 'gr',
        nm: 'dot',
        it: [
          { ty: 'el', d: 1, p: { a: 0, k: [0, 0] }, s: { a: 0, k: [22, 22] } },
          { ty: 'fl', c: { a: 0, k: cyan }, o: { a: 0, k: 100 } },
          transform(),
        ],
      },
    ],
    ip: 0,
    op: 140,
    st: 0,
  }
}

const wifi = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 140,
  w: 400,
  h: 400,
  nm: 'Novara Wifi',
  ddd: 0,
  assets: [],
  layers: [
    arcLayer(1, 'outer', [58, 210], [200, 48], [342, 210], 28, 16),
    arcLayer(2, 'mid', [102, 228], [200, 112], [298, 228], 14, 16),
    arcLayer(3, 'inner', [146, 246], [200, 176], [254, 246], 0, 16),
    dotLayer(),
  ],
}

writeFileSync('src/lottie/clock.json', JSON.stringify(clock))
writeFileSync('src/lottie/wifi.json', JSON.stringify(wifi))
console.log('lottie files written')
