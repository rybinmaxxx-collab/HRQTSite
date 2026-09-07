"use client";

import { useEffect, useRef } from "react";

/**
 * Сцена первого экрана.
 *
 * Фиксированный холст высотой в один экран, лежащий под всей страницей. Виден
 * он только там, где содержимое прозрачно, — то есть под героем: все секции
 * ниже имеют собственный непрозрачный фон и закрывают его при прокрутке.
 *
 * Что рисуется: семь планов процедурной платы, разложенных по глубине.
 * Ближние крупные и яркие, дальние мелкие и тусклые; каждый смещается своим
 * темпом, поэтому при движении курсора они расходятся — это и есть глубина,
 * а не картинка с параллаксом. Красные шины идут поверх всех планов.
 *
 * Почему шейдер, а не видео. Ролик того же содержания весит мегабайты, тянет
 * за собой хостинг и не подстраивается под форму окна. Здесь всё считается на
 * месте: композиция сама уходит вправо на широком экране и вверх на узком,
 * освобождая колонку под заголовок, а грейдинг и виньетка живут в том же
 * проходе, так что фильтров поверх кадра не нужно.
 *
 * Стоимость кадра: один полноэкранный треугольник. Плотность пикселей
 * ограничена DPR 1.5 — на ретине честный DPR утраивает работу шейдера, а
 * разницы на такой картинке не видно. Во вкладке в фоне кадры не рисуются, при
 * prefers-reduced-motion рисуется один кадр и цикл не запускается, при
 * отсутствии WebGL остаётся статичная подложка на градиентах.
 */

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}";

const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPar;
uniform float uForm;   /* 0 — широкое окно, 1 — узкое */

float h21(vec2 p){
  p = fract(p * vec2(127.31, 311.7));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

/* Один план платы: дорожки, углы, кристаллы, матрицы точек, бруски. */
float board(vec2 p, float seed, out float metal){
  vec2 g = floor(p), f = fract(p);
  float r  = h21(g + seed);
  float r2 = h21(g + seed + 41.7);
  float m = 0.0;
  metal = 0.0;
  float w = 0.055;
  if(r < 0.30){
    m = max(m, smoothstep(w, 0.0, abs(f.y - 0.5)));
  }else if(r < 0.52){
    m = max(m, smoothstep(w, 0.0, abs(f.x - 0.5)));
  }else if(r < 0.60){
    float a = smoothstep(w, 0.0, abs(f.y - 0.5)) * step(f.x, 0.5);
    float b = smoothstep(w, 0.0, abs(f.x - 0.5)) * step(0.5, f.y);
    m = max(m, max(a, b));
  }
  if(r2 > 0.972){
    vec2 d = abs(f - 0.5);
    float box = step(max(d.x, d.y), 0.36);
    m = max(m, box * 0.14);
    m = max(m, box * step(0.30, max(d.x, d.y)));
    metal = max(metal, box);
  }else if(r2 > 0.905){
    vec2 q = fract(f * 5.0) - 0.5;
    m = max(m, step(length(q), 0.17) * step(max(abs(f.x - 0.5), abs(f.y - 0.5)), 0.42) * 0.7);
    metal = max(metal, 0.6);
  }else if(r2 > 0.83){
    vec2 d = abs(f - vec2(0.5, 0.5));
    m = max(m, step(d.x, 0.30) * step(d.y, 0.07));
  }
  return m;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  vec2 c = uv;
  c.x -= mix(0.42, 0.02, uForm);
  c.y -= mix(0.0,  0.22, uForm);

  vec3 col = vec3(0.0);
  float glow = 0.0;

  for(int i = 0; i < 7; i++){
    float fi = float(i);
    float z  = 1.0 + fi * 0.78;
    float sc = 26.0 / z;
    vec2 p = c * sc
           + uPar * (7.0 / z)
           + vec2(uTime * 0.045 / z, uTime * 0.017 / z)
           + fi * 23.3;
    float metal;
    float m = board(p, fi * 9.1, metal);
    /* Крупная модуляция: плата должна дышать пустотами, а не идти ковром. */
    float dens = 0.30 + 0.70 * smoothstep(0.30, 0.78, h21(floor(p / 6.0) + fi * 5.3));
    m *= dens;
    float fade = 1.0 / (1.0 + fi * fi * 0.16);
    vec3 tint = mix(vec3(0.87, 0.075, 0.085), vec3(0.72, 0.75, 0.80), metal * 0.48);
    col  += m * tint * fade * 0.40;
    glow += m * fade * 0.10;
  }

  /* Горизонтальные шины — длинные прострелы за кадр. */
  for(int k = 0; k < 3; k++){
    float fk = float(k);
    float y  = -0.30 + fk * 0.29 + 0.04 * sin(uTime * 0.13 + fk * 2.1);
    float line = smoothstep(0.0022, 0.0, abs(c.y - y));
    float run  = smoothstep(-0.05, 0.35, c.x + 0.5);
    col += vec3(0.95, 0.10, 0.11) * line * run * 0.80;
  }
  /* Вертикальные шины. */
  for(int k = 0; k < 3; k++){
    float fk = float(k);
    float x = 0.10 + fk * 0.34 + 0.05 * sin(uTime * 0.11 + fk * 3.7);
    col += vec3(0.92, 0.10, 0.11) * smoothstep(0.0020, 0.0, abs(c.x - x)) * 0.55;
  }

  col += vec3(0.55, 0.06, 0.07) * glow * 0.5;

  /* Дальний край гаснет, освобождая колонку под текст. */
  float edge = 0.10 * (h21(floor(uv.yy * 22.0)) - 0.5);
  float falloffW = smoothstep(-0.16 + edge, 0.44 + edge, uv.x);
  float falloffH = smoothstep(0.02, 0.40, uv.y);
  col *= mix(falloffW, falloffH, uForm);

  col *= 0.72 + 0.28 * smoothstep(1.05, 0.15, length(uv * vec2(0.8, 1.0)));

  float grain = h21(gl_FragCoord.xy + fract(uTime) * 91.7);
  col += (grain - 0.5) * 0.022;

  col = max(col, 0.0);
  col = pow(col, vec3(0.92)) * 0.92;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function Stage() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = cv.getContext("webgl", {
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
      }) as WebGLRenderingContext | null;
    } catch {
      /* остаётся статичная подложка */
    }
    if (!gl) return;
    const g = gl;

    const compile = (type: number, src: string) => {
      const sh = g.createShader(type);
      if (!sh) return null;
      g.shaderSource(sh, src);
      g.compileShader(sh);
      return g.getShaderParameter(sh, g.COMPILE_STATUS) ? sh : null;
    };

    const vs = compile(g.VERTEX_SHADER, VERT);
    const fs = compile(g.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = g.createProgram();
    if (!prog) return;
    g.attachShader(prog, vs);
    g.attachShader(prog, fs);
    g.linkProgram(prog);
    if (!g.getProgramParameter(prog, g.LINK_STATUS)) return;
    g.useProgram(prog);

    const buf = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, buf);
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
    const loc = g.getAttribLocation(prog, "a");
    g.enableVertexAttribArray(loc);
    g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);

    const uRes = g.getUniformLocation(prog, "uRes");
    const uTime = g.getUniformLocation(prog, "uTime");
    const uPar = g.getUniformLocation(prog, "uPar");
    const uForm = g.getUniformLocation(prog, "uForm");

    let W = 0;
    let H = 0;
    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 1.5);
      W = Math.max(1, Math.round(window.innerWidth * d));
      H = Math.max(1, Math.round(window.innerHeight * d));
      cv.width = W;
      cv.height = H;
      g.viewport(0, 0, W, H);
    };
    size();

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    /* На телефоне вместо курсора — наклон устройства. */
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tx = Math.max(-1, Math.min(1, e.gamma / 35));
      ty = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
    };

    const t0 = performance.now();
    const draw = (t: number) => {
      g.uniform2f(uRes, W, H);
      g.uniform1f(uTime, t / 1000);
      g.uniform2f(uPar, mx * 0.1, -my * 0.06);
      g.uniform1f(uForm, window.innerWidth / window.innerHeight < 1 ? 1 : 0);
      g.drawArrays(g.TRIANGLES, 0, 3);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      const still = () => {
        size();
        draw(4200);
      };
      still();
      window.addEventListener("resize", still);
      return () => window.removeEventListener("resize", still);
    }

    let raf = 0;
    const loop = () => {
      if (!document.hidden) {
        mx += (tx - mx) * 0.05;
        my += (ty - my) * 0.05;
        draw(performance.now() - t0);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("resize", size);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("deviceorientation", onTilt, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onTilt);
      g.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[100svh] overflow-hidden bg-black"
    >
      {/* Подложка на случай, если WebGL недоступен: та же композиция статикой. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 92% at 84% 28%, rgba(200,27,28,.22), transparent 62%)," +
            "radial-gradient(84% 64% at 98% 72%, rgba(200,27,28,.13), transparent 70%), #000",
        }}
      />
      <canvas ref={ref} className="absolute inset-0 block h-full w-full opacity-85" />
      {/*
        Затемнение по центру. На главной заголовок стоит по центру колонки и
        попадает ровно на самую плотную часть схемы; без этого слоя он читается
        поверх помех. Схема остаётся видна по краям, где текста нет.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(62% 58% at 44% 40%, #000 0%, rgba(0,0,0,.86) 42%, rgba(0,0,0,.35) 68%, transparent 84%)",
        }}
      />
      {/* Стык со страницей: сцена не должна обрываться линией по нижней кромке. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
