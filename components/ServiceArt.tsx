/**
 * Иллюстрации для карточек услуг и аудиторий.
 *
 * ТЗ просит в карточках услуг «релевантные скриншоты/мокапы интерфейсов», а в
 * блоке аудиторий — «тематические иллюстрации или сток-фото». Реальных
 * скриншотов продуктов заказчика у меня нет, а рисовать правдоподобные
 * «скриншоты чужой админки» — значит выдавать выдумку за доказательство.
 *
 * Поэтому здесь схематичные векторные мокапы в фирменной палитре: они читаются
 * как интерфейс, но никем не притворяются. Каждый — обычный SVG, заменяется на
 * настоящий скриншот или фото одной строкой в карточке.
 */

type ArtProps = { className?: string };

const FRAME = "h-full w-full";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 176"
      className={FRAME}
      role="img"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

const ink = "var(--color-ink)";
const accent = "var(--color-accent)";
const soft = "var(--color-accent-soft)";
const line = "var(--color-line)";
/* Тело панели в мокапе. Раньше здесь стоял литеральный #fff — на тёмной
   карточке он бил в глаза белым прямоугольником. Теперь это токен, и
   иллюстрации перекрашиваются вместе с остальным сайтом. */
const plate = "var(--color-panel)";

/** Портал: шапка, боковое меню, плитки сервисов. */
function Portal() {
  return (
    <Frame>
      <rect x="24" y="20" width="272" height="136" fill={plate} stroke={line} />
      <rect x="24" y="20" width="272" height="22" fill={soft} />
      <circle cx="38" cy="31" r="3.5" fill={accent} />
      <rect x="50" y="28" width="46" height="6" fill={accent} opacity="0.55" />
      <rect x="34" y="54" width="62" height="90" fill={soft} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="42" y={64 + i * 18} width="46" height="6" fill={accent} opacity="0.4" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={110 + (i % 2) * 88}
          y={54 + Math.floor(i / 2) * 46}
          width="76"
          height="38"
          fill={plate}
          stroke={line}
        />
      ))}
      <rect x="118" y="64" width="30" height="5" fill={ink} opacity="0.65" />
      <rect x="206" y="64" width="38" height="5" fill={ink} opacity="0.65" />
      <rect x="118" y="110" width="42" height="5" fill={ink} opacity="0.65" />
      <rect x="206" y="110" width="26" height="5" fill={ink} opacity="0.65" />
    </Frame>
  );
}

/** Интеграция: два узла и обмен между ними. */
function Integration() {
  return (
    <Frame>
      <rect x="26" y="52" width="84" height="72" fill={plate} stroke={line} />
      <rect x="210" y="52" width="84" height="72" fill={plate} stroke={line} />
      <rect x="38" y="66" width="48" height="6" fill={ink} opacity="0.6" />
      <rect x="38" y="80" width="34" height="5" fill={ink} opacity="0.3" />
      <rect x="38" y="92" width="42" height="5" fill={ink} opacity="0.3" />
      <rect x="222" y="66" width="48" height="6" fill={ink} opacity="0.6" />
      <rect x="222" y="80" width="38" height="5" fill={ink} opacity="0.3" />
      <rect x="222" y="92" width="30" height="5" fill={ink} opacity="0.3" />
      <path d="M112 76 H208" stroke={accent} strokeWidth="2" strokeDasharray="5 5" />
      <path d="M208 100 H112" stroke={accent} strokeWidth="2" strokeDasharray="5 5" />
      <path d="M200 70 l8 6 -8 6" fill="none" stroke={accent} strokeWidth="2" />
      <path d="M120 94 l-8 6 8 6" fill="none" stroke={accent} strokeWidth="2" />
      <rect x="140" y="20" width="40" height="20" fill={soft} />
      <circle cx="160" cy="30" r="4" fill={accent} />
    </Frame>
  );
}

/** Агент в закрытом контуре: периметр, внутри — узел, наружу связи нет. */
function Agent() {
  return (
    <Frame>
      <rect x="30" y="24" width="260" height="128" fill="none" stroke={accent} strokeDasharray="7 6" />
      <rect x="120" y="60" width="80" height="56" fill={soft} />
      <circle cx="160" cy="80" r="9" fill={accent} />
      <rect x="136" y="98" width="48" height="6" fill={accent} opacity="0.5" />
      {[62, 160, 258].map((x, i) => (
        <rect key={i} x={x - 22} y={126} width="44" height="14" fill={plate} stroke={line} />
      ))}
      <path d="M120 88 H70" stroke={accent} strokeWidth="2" />
      <path d="M200 88 H250" stroke={accent} strokeWidth="2" />
      <path d="M300 88 h14" stroke={ink} strokeWidth="2" opacity="0.25" />
      <path d="M304 82 l8 12 M312 82 l-8 12" stroke={ink} strokeWidth="2" opacity="0.35" />
    </Frame>
  );
}

/** Аудит: слои ландшафта и отметки проверки. */
function Audit() {
  return (
    <Frame>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="40"
          y={34 + i * 38}
          width="240"
          height="28"
          fill={i === 1 ? soft : plate}
          stroke={line}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="54" y={44 + i * 38} width={110 - i * 24} height="7" fill={ink} opacity="0.55" />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(246 ${41 + i * 38})`}>
          <circle cx="9" cy="9" r="9" fill={accent} opacity={i === 2 ? 0.25 : 1} />
          <path d="M5 9 l3 3 l6 -6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
    </Frame>
  );
}

/** ИБ: щит поверх слоёв доступа. */
function Security() {
  return (
    <Frame>
      <rect x="32" y="34" width="120" height="108" fill={plate} stroke={line} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="46" y={50 + i * 22} width={92 - (i % 2) * 26} height="7" fill={ink} opacity="0.3" />
      ))}
      <path
        d="M228 34 l52 20 v34 c0 26 -22 42 -52 54 c-30 -12 -52 -28 -52 -54 V54 z"
        fill={soft}
        stroke={accent}
        strokeWidth="2"
      />
      <path d="M210 88 l12 12 l24 -26" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <path d="M154 88 H172" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
    </Frame>
  );
}

/** Дашборд: метрики и график. */
function Dashboard() {
  return (
    <Frame>
      <rect x="24" y="20" width="272" height="136" fill={plate} stroke={line} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={40 + i * 88} y="36" width="72" height="34" fill={soft} />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={50 + i * 88} y="46" width="34" height="8" fill={accent} opacity="0.7" />
      ))}
      <rect x="40" y="84" width="240" height="56" fill={plate} stroke={line} />
      <path
        d="M54 126 L92 106 L130 116 L168 92 L206 100 L244 78 L266 86"
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[54, 130, 206, 266].map((x, i) => (
        <circle key={i} cx={x} cy={[126, 116, 100, 86][i]} r="3.5" fill={accent} />
      ))}
    </Frame>
  );
}

/** Карьерный сайт: обложка и карточки вакансий. */
function Career() {
  return (
    <Frame>
      <rect x="24" y="20" width="272" height="136" fill={plate} stroke={line} />
      <rect x="24" y="20" width="272" height="48" fill={soft} />
      <rect x="42" y="36" width="104" height="8" fill={accent} opacity="0.7" />
      <rect x="42" y="50" width="62" height="6" fill={ink} opacity="0.3" />
      <rect x="228" y="38" width="50" height="18" fill={accent} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="42" y={82 + i * 24} width="236" height="18" fill={plate} stroke={line} />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="54" y={88 + i * 24} width={112 - i * 22} height="6" fill={ink} opacity="0.45" />
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="264" cy={91 + i * 24} r="4" fill={accent} opacity="0.5" />
      ))}
    </Frame>
  );
}

/** Собственные сервисы: набор модулей вокруг ядра. */
function Services() {
  return (
    <Frame>
      <circle cx="160" cy="88" r="26" fill={soft} />
      <circle cx="160" cy="88" r="8" fill={accent} />
      {[
        [62, 44],
        [258, 44],
        [62, 132],
        [258, 132],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M160 88 L${x} ${y}`} stroke={accent} strokeWidth="1.5" opacity="0.45" />
          <rect x={x - 34} y={y - 15} width="68" height="30" fill={plate} stroke={line} />
          <rect x={x - 22} y={y - 3} width="44" height="6" fill={ink} opacity="0.45" />
        </g>
      ))}
    </Frame>
  );
}

/** Аудитория HR: люди и процесс. */
function RoleHr() {
  return (
    <Frame>
      <rect x="36" y="34" width="248" height="108" fill={plate} stroke={line} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${58 + i * 84} 58)`}>
          <circle cx="18" cy="14" r="11" fill={soft} />
          <circle cx="18" cy="11" r="5" fill={accent} />
          <path d="M8 22 a10 8 0 0 1 20 0" fill={accent} opacity="0.4" />
          <rect x="0" y="34" width="36" height="6" fill={ink} opacity="0.4" />
          <rect x="6" y="46" width="24" height="5" fill={ink} opacity="0.22" />
        </g>
      ))}
      <path d="M94 72 H136 M178 72 H220" stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" />
    </Frame>
  );
}

/** Аудитория ИТ и ИБ: контуры сети и замок. */
function RoleIt() {
  return (
    <Frame>
      <rect x="34" y="30" width="252" height="116" fill="none" stroke={line} />
      <rect x="52" y="48" width="70" height="34" fill={soft} />
      <rect x="198" y="48" width="70" height="34" fill={soft} />
      <rect x="125" y="102" width="70" height="34" fill={plate} stroke={line} />
      <path d="M122 65 H198" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" />
      {/* fill="none" здесь обязателен. У <path> заливка по умолчанию чёрная, а
          эти два пути — уголки из вертикального и горизонтального отрезка:
          SVG мысленно замыкает их прямой от конца к началу и красит
          получившийся треугольник. Именно поэтому в карточке «ИТ и
          безопасности» посреди схемы висели два чёрных клина. */}
      <path d="M87 82 V102 H125" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M233 82 V102 H195" fill="none" stroke={accent} strokeWidth="1.5" />
      <g transform="translate(148 108)">
        <rect x="0" y="8" width="24" height="18" fill={accent} />
        <path d="M6 8 V5 a6 6 0 0 1 12 0 V8" fill="none" stroke={accent} strokeWidth="2.5" />
      </g>
    </Frame>
  );
}

/** Аудитория бизнеса: рост и бюджетные рамки. */
function RoleBiz() {
  return (
    <Frame>
      <rect x="36" y="30" width="248" height="116" fill={plate} stroke={line} />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={68 + i * 52}
          y={122 - (i + 1) * 18}
          width="34"
          height={(i + 1) * 18}
          fill={i === 3 ? accent : soft}
        />
      ))}
      {/* Линия роста и её наконечник.
          Наконечник был нарисован как «M244 40 h18 v18» — уголок из
          горизонтального и вертикального отрезка, приклеенный к концу линии.
          Уголок смотрит вправо-вниз, линия приходит вправо-вверх: стрелка
          указывала не туда, куда шла, и читалась как излом. Теперь это две
          короткие черты, симметричные направлению последнего сегмента
          (216,52 → 258,38), — обычный наконечник, который продолжает линию,
          а не спорит с ней. */}
      <path
        d="M60 112 L112 92 L164 78 L216 52 L258 38"
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M240 34 L258 38 L246 52"
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Frame>
  );
}

const ART = {
  portal: Portal,
  integration: Integration,
  agent: Agent,
  audit: Audit,
  security: Security,
  dashboard: Dashboard,
  career: Career,
  services: Services,
  "role-hr": RoleHr,
  "role-it": RoleIt,
  "role-biz": RoleBiz,
} as const;

export type ArtKey = keyof typeof ART;

export function ServiceArt({ name, className = "" }: { name: string; className?: string } & ArtProps) {
  const Component = ART[name as ArtKey] ?? Portal;
  return (
    <div className={`flex h-full w-full items-center justify-center p-4 ${className}`}>
      <Component />
    </div>
  );
}
