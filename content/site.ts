/**
 * Every word on the site.
 *
 * The shape of this file follows beamery.com's homepage section model
 * (SECTION_MAP.md, репозиторий aura) — that is the container being copied.
 * The words are HRQT's, from the supplied package: HRQT_hifi_главная.html,
 * HRQT_тексты_услуги и _о-нас (Фаза 7), the brand platform (Фаза 2) and the
 * ЛПР map (Фаза 1).
 *
 * Where the reference has a slot HRQT cannot legitimately fill — client
 * logos, client testimonials, case studies with numbers — the slot carries
 * HRQT's own material instead, and the comment above it says so. Nothing here
 * is a fabricated quote or a fabricated result.
 *
 * Edit this file to change the site's words. No component holds copy.
 */

export const brand = {
  name: "HRQT",
  descriptor: "Кадровые технологии",
  email: "hello@hrqt.ru",
  phone: "+7 495 120-44-08",
  phoneHref: "tel:+74951204408",
  legal: "© 2026 ООО «ЭйчАрКьюТи» · ИНН 7702450912",
} as const;

/**
 * The reference runs four mega-menu triggers between the logo and a text
 * link plus a filled pill on the right. HRQT's sitemap (Фаза 3) gives three.
 */
export const nav = {
  menus: [
    {
      label: "Услуги",
      columns: [
        {
          title: "Системы и данные",
          links: [
            { label: "WebSoft HCM под ваши процессы", href: "/services/websoft" },
            { label: "Порядок в данных и 1С ЗУП", href: "/services/1c" },
            { label: "Локальные ИИ-агенты", href: "/services/ai" },
          ],
        },
        {
          title: "Аудит и контроль",
          links: [
            { label: "Аудит HR-автоматизации и надзор", href: "/services/audit" },
            { label: "Аудит информационной безопасности", href: "/services/security-audit" },
          ],
        },
        {
          title: "Порталы и сервисы",
          links: [
            { label: "Корпоративные порталы и EX", href: "/services/portals" },
            { label: "Внешние сайты и карьерные порталы", href: "/services/career-sites" },
            { label: "Собственные HR-сервисы", href: "/services/custom" },
          ],
        },
      ],
    },
    {
      label: "Экспертиза",
      columns: [
        {
          title: "Проекты",
          links: [
            { label: "Проекты специалистов HRQT", href: "#projects" },
            { label: "Форматы работы", href: "#packages" },
          ],
        },
        {
          title: "Материалы",
          links: [
            { label: "Блог", href: "/blog" },
            { label: "WebSoft, 1С, ИИ в HR", href: "/blog" },
          ],
        },
        {
          title: "Безопасность",
          links: [
            { label: "Закрытый контур и 152-ФЗ", href: "#security" },
            { label: "Архитектурный надзор", href: "/services/audit" },
          ],
        },
      ],
    },
    {
      label: "Компания",
      columns: [
        {
          title: "О нас",
          links: [
            { label: "О команде HRQT", href: "#team" },
            { label: "Подход", href: "/about" },
          ],
        },
        {
          title: "Контакты",
          links: [
            { label: "Связаться", href: "/contacts" },
            { label: "Реквизиты", href: "/contacts#requisites" },
          ],
        },
        {
          title: "Правовое",
          links: [
            { label: "Политика обработки ПДн", href: "/legal/privacy" },
            { label: "Cookie", href: "/legal/cookie" },
          ],
        },
      ],
    },
  ],
  quiet: { label: "Написать", href: "/contacts" },
  cta: { label: "Оставить заявку", href: "/contacts" },
} as const;

/**
 * Section 2 — hero. Centre-aligned, gradient on one emphasised run, two CTAs
 * in the reference's fixed order (quiet one first), then a wide visual that
 * overlaps the section below.
 */
export const hero = {
  titleLead: "Сложное — на нас. ",
  titleAccent: "Простой результат",
  titleTail: " — вам.",
  lead: "Дорабатываем WebSoft HCM и 1С под ваши процессы, внедряем локальные ИИ-агенты и держим архитектуру под контролем. Один ответственный за весь контур.",
  secondary: { label: "Смотреть услуги", href: "#services" },
  primary: { label: "Оставить заявку", href: "/contacts" },
  note: "Начинаем с экспресс-аудита за 5 рабочих дней",
  panel: {
    title: "Весь контур в одной команде",
    items: [
      { name: "WebSoft HCM", note: "доработка под процессы" },
      { name: "1С ЗУП и данные", note: "порядок и интеграции" },
      { name: "Локальные ИИ-агенты", note: "закрытый контур" },
      { name: "Аудит и надзор", note: "архитектура под контролем" },
    ],
  },
} as const;

/**
 * Section 3 — the marquee. The reference runs client logos here. HRQT has
 * none it may show: the Фаза 1 NDA framing rules them out until it has
 * projects of its own. The strip carries the systems it works in instead.
 */
export const marquee = [
  "1С:ЗУП",
  "WebSoft HCM",
  "Active Directory",
  "SAP HR",
  "BI-системы",
  "API / SSO",
  "Почта / Exchange",
  "Корпоративные порталы",
  "RPA",
  "Аудит IT",
  "Аудит ИБ",
  "Go",
  "Python",
] as const;

/**
 * Раздел услуг — 8 направлений консалтинга.
 *
 * Позиционирование по ТЗ: комплексный консалтинг и инженерные решения, а не
 * доработка софта. Сетка 2 ряда по 4 карточки на десктопе, 2 колонки на
 * планшете, стек на мобильном.
 *
 * `art` выбирает иллюстрацию из components/ServiceArt.tsx.
 */
export const services = {
  title: "Закрываем весь контур кадровых технологий",
  lead: "Восемь направлений, которые закрывают путь от аудита ландшафта до собственных сервисов. Берём весь контур или ту часть, где вам не хватает рук и независимого взгляда.",
  items: [
    {
      title: "WebSoft HCM под ваши процессы",
      body: "Развитие модулей, личные кабинеты, единая точка входа для доступа к HR-сервисам.",
      href: "/services/websoft",
      art: "portal",
    },
    {
      title: "Порядок в кадровых данных и 1С ЗУП",
      body: "Интеграции, очистка данных, устранение ручной сверки.",
      href: "/services/1c",
      art: "integration",
    },
    {
      title: "Локальные ИИ-агенты в закрытом контуре",
      body: "Автоматизация операционной рутины без передачи данных в интернет и облака.",
      href: "/services/ai",
      art: "agent",
    },
    {
      title: "Аудит HR-автоматизации и архитектурный надзор",
      body: "Экспертная оценка ландшафта, контроль сторонних подрядчиков.",
      href: "/services/audit",
      art: "audit",
    },
    {
      title: "Аудит информационной безопасности HR-систем",
      body: "Защита персональных данных по 152-ФЗ, аудит доступов, прав и интеграций.",
      href: "/services/security-audit",
      art: "security",
    },
    {
      title: "Корпоративные порталы и цифровой опыт",
      body: "Единое окно сотрудника, личные кабинеты, геймификация.",
      href: "/services/portals",
      art: "dashboard",
    },
    {
      title: "Внешние сайты и карьерные порталы",
      body: "Посадочные страницы и порталы для привлечения кандидатов и внешних аудиторий.",
      href: "/services/career-sites",
      art: "career",
    },
    {
      title: "Собственные HR-сервисы",
      body: "Микросервисы, кафетерии льгот, сервисы признания и конструкторы под ключ.",
      href: "/services/custom",
      art: "services",
    },
  ],
} as const;

/**
 * Раздел «О команде HRQT». Текст из ТЗ дословно.
 *
 * На мобильном по умолчанию показывается короткая версия, полная
 * раскрывается по кнопке — по требованию ТЗ.
 */
export const team = {
  title: "О команде HRQT",
  short:
    "HRQT — команда специалистов по кадровым технологиям с опытом более 8 лет у каждого. Мы объединили экспертизу в архитектуре, аналитике и разработке, чтобы решать сложные задачи автоматизации HR — от аудита и проектирования до внедрения и поддержки.",
  full: [
    "HRQT — Кадровые технологии объединяет архитекторов, аналитиков и разработчиков, специализирующихся на автоматизации HR и внутренних процессов. У каждого ключевого участника команды — более 8 лет опыта в ИТ и корпоративных проектах.",
    "Раньше мы работали вместе над решениями для крупных компаний, а теперь объединили накопленную экспертизу под брендом HRQT. Мы проводим аудит процессов и ИТ-ландшафта, проектируем архитектуру, интегрируем системы, разрабатываем решения и сопровождаем их развитие.",
    "Под каждую задачу мы формируем компактную команду с необходимыми компетенциями. Заказчик работает непосредственно со специалистами, которые погружаются в его процессы, принимают решения и отвечают за результат.",
    "Мы превращаем сложные процессы, разрозненные системы и ручные операции в понятные, управляемые и работающие цифровые решения.",
  ],
  stats: [
    { value: "8+", label: "лет опыта у каждого" },
    { value: "8", label: "направлений консалтинга" },
    { value: "1", label: "ответственный за контур" },
  ],
} as const;

/** Заголовок раздела проектов зафиксирован ТЗ и не сокращается до «Кейсы». */
export const projectsSection = {
  title: "Проекты, реализованные специалистами HRQT",
  lead: "Работы, которые участники команды вели до и внутри HRQT. Каждая карточка — что было, что сделали и чем закончилось.",
} as const;

/**
 * Section 5 — the tint band. The reference puts a client testimonial here,
 * with a client logo chip above it. HRQT has no client quotes it may publish,
 * and inventing one is not an option, so the band carries the founder's own
 * statement of approach — Фаза 7, «Наш подход» — attributed to him by name.
 * The chip holds HRQT's own mark.
 */
export const statement = {
  leadIn: "Мы не подрядчик «по ТЗ» и не продавец коробок. Мы ",
  accent1: "берём на себя инженерную сложность",
  middle: ", а вам отдаём ",
  accent2: "понятный результат",
  tail: ".",
  author: "Кирилл Эфрос",
  role: "Основатель и архитектор HRQT",
} as const;

/**
 * Section 6 — the audience grid. The reference runs four cards, one per buyer
 * persona, each linking to a solutions page. HRQT's ЛПР map (Фаза 1) gives
 * three roles, so the grid is three wide. Bodies are that map's own wording.
 */
export const audiences = {
  titleLead: "Решение принимают трое — ",
  titleAccent: "говорим с каждым",
  items: [
    {
      title: "HR-директору",
      body: "Ручные процессы в WebSoft и 1С, разрозненные данные, время на рутину. Показываем понятные услуги и процессы на языке HR-боли.",
      art: "role-hr",
      cta: { label: "Что меняется для HR", href: "/services/websoft" },
    },
    {
      title: "ИТ и безопасности",
      body: "Интеграции, безопасность данных, контроль подрядчика, импортозамещение. Прозрачная архитектура, локальный ИИ без интернета, соответствие 152-ФЗ.",
      art: "role-it",
      cta: { label: "Архитектура и контур", href: "/services/ai" },
    },
    {
      title: "Бизнесу и гендиру",
      body: "Деньги, сроки, риски. Независимый аудит и архитектурный надзор, целевая архитектура, приоритеты и бюджетные рамки.",
      art: "role-biz",
      cta: { label: "Аудит и надзор", href: "/services/audit" },
    },
  ],
} as const;

/**
 * Section 7 — the two-card tint block. The reference fills both cards with
 * partner testimonials. HRQT's equivalents are its two hardest
 * differentiators, with the RTB text from Фаза 2 behind them.
 */
export const proof = {
  title: "Работаем с вашим ландшафтом",
  action: { label: "Обсудить интеграции", href: "/contacts" },
  lead: "Не навязываем коробку и не просим переезжать. Подключаемся к тому, что у вас уже стоит — WebSoft HCM, 1С ЗУП, Active Directory, BI, почта, SSO — и наводим порядок внутри вашего периметра.",
  cards: [
    {
      title: "Локальный ИИ в закрытом контуре",
      body: "Собственные ИИ-агенты HRQT работают offline, без облака — там, где важны безопасность и импортозамещение. Данные не покидают периметр компании.",
      meta: "Дифференциатор · Фаза 2",
    },
    {
      title: "Независимый архитектурный надзор",
      body: "Опыт корпоративного архитектора: целевая архитектура, контроль подрядчиков, защита интересов заказчика. Работаем и с вашим текущим подрядчиком — как независимая сторона.",
      meta: "Дифференциатор · Фаза 2",
    },
  ],
} as const;

/**
 * Section 8 — the carousel with the dark panel. The reference runs case
 * studies here: stats and a quote on a gradient panel, the story on white.
 * HRQT has no cases it may publish, so the same component carries the three
 * work formats (Фаза 3, §7) — real, and the thing a visitor actually chooses.
 */
export const packages = {
  titleLead: "Три понятных ",
  titleAccent: "пакета",
  actions: [
    { label: "Все услуги", href: "#services", variant: "tertiary" as const },
    { label: "Оставить заявку", href: "/contacts", variant: "primary" as const },
  ],
  items: [
    {
      tab: "Экспресс-аудит",
      stats: [
        { label: "Срок", value: "5 рабочих дней" },
        { label: "Формат", value: "Разбор ситуации" },
        { label: "Для кого", value: "Первый шаг" },
      ],
      pull: "За 5 рабочих дней разберём текущую ситуацию, покажем быстрые улучшения, риски и возможную дорожную карту.",
      tags: ["С ЧЕГО НАЧАТЬ", "АУДИТ"],
      title: "Разбор процессов и ландшафта",
      body: "Смотрим, что уже работает, где костыли и что менять первым. На выходе — быстрые улучшения, список рисков и черновая дорожная карта с приоритетами.",
      cta: { label: "Начать с аудита", href: "/contacts" },
    },
    {
      tab: "Внедрение под ключ",
      stats: [
        { label: "Состав", value: "WebSoft · 1С · ИИ" },
        { label: "Формат", value: "Поэтапно" },
        { label: "Ответственный", value: "Один за контур" },
      ],
      pull: "Настройка модулей под процессы, интеграции, тестирование, запуск. Делаем поэтапно и держим вас в курсе.",
      tags: ["ЧАЩЕ ВЫБИРАЮТ", "ВНЕДРЕНИЕ"],
      title: "Доработка WebSoft и 1С под ваши процессы",
      body: "Ключевые модули, личные кабинеты и роли, интеграции с 1С, Active Directory и BI. Локальные ИИ-агенты — там, где они нужны. Без перекладывания сложности на вас.",
      cta: { label: "Обсудить проект", href: "/contacts" },
    },
    {
      tab: "Сопровождение",
      stats: [
        { label: "Формат", value: "Постоянно" },
        { label: "Включено", value: "Поддержка и развитие" },
        { label: "Плюс", value: "Надзор" },
      ],
      pull: "Поддерживаем и развиваем систему дальше — вместе с архитектурным надзором за тем, что делают другие.",
      tags: ["ПОСЛЕ ЗАПУСКА", "СОПРОВОЖДЕНИЕ"],
      title: "Поддержка, доработки и развитие системы",
      body: "Обновления без потери доработок, новые сценарии по мере роста процессов, независимый контроль качества внедрений. Система остаётся вашей, а не подрядчика.",
      cta: { label: "Подключить", href: "/contacts" },
    },
  ],
} as const;

/**
 * Section 9 — the dark band. Not in the reference homepage; HRQT's own design
 * spec (Фаза 6) reserves a dark section for security and control, and the
 * homepage template (Фаза 3) requires the block. Rendered in the reference's
 * idiom.
 */
export const security = {
  eyebrow: "Безопасность и контроль",
  titleLead: "ИИ и автоматизация — ",
  titleAccent: "в закрытом контуре",
  lead: "Там, где важны безопасность и импортозамещение, наши ИИ-агенты работают локально, без передачи данных в облако и интернет.",
  items: [
    { title: "Закрытый контур", body: "Данные не покидают периметр." },
    { title: "Прозрачная архитектура", body: "Понятно, как всё устроено." },
    { title: "Соответствие ИБ и 152-ФЗ", body: "Учитываем требования безопасности." },
  ],
} as const;

/** Пункт 5 шаблона HRQT — процесс. Не из референса, но обязателен по Фазе 3. */
export const process = {
  title: "Прозрачный процесс без сюрпризов",
  steps: [
    { title: "Заявка", body: "Связываемся в течение рабочего дня, уточняем задачу." },
    { title: "Экспресс-аудит", body: "За 5 рабочих дней разбираем ситуацию, риски и приоритеты." },
    { title: "Предложение", body: "Показываем варианты, сроки и стоимость." },
    {
      title: "Реализация",
      body: "Внедрение под ключ или архитектурный надзор за вашими подрядчиками — по ситуации.",
    },
    { title: "Сопровождение", body: "Поддерживаем и развиваем систему дальше." },
  ],
} as const;

/** Пункт 9 шаблона HRQT — FAQ. Тоже вне референса, но в шаблоне есть. */
export const faq = {
  title: "Частые вопросы",
  action: { label: "Задать свой вопрос", href: "/contacts" },
  items: [
    {
      q: "Работаете только с WebSoft и 1С?",
      a: "Это наша основная экспертиза, но не граница. Мы проектируем архитектуру и интеграции с любыми системами, которые уже стоят у вас — от BI до внутренних сервисов.",
    },
    {
      q: "Что значит «локальный ИИ»?",
      a: "Агенты разворачиваются внутри вашего периметра и работают без выхода в интернет. Ни один документ, протокол встречи или кадровый файл не уходит в облако. В этом и весь смысл.",
    },
    {
      q: "Сколько стоит проект?",
      a: "Зависит от объёма, и честно оценить его вслепую нельзя. Поэтому мы начинаем с экспресс-аудита за 5 рабочих дней и после него даём прозрачный расчёт со сроками.",
    },
    {
      q: "Вы внедряете или только надзираете?",
      a: "И то, и другое. Можем сделать под ключ, а можем встать независимой стороной рядом с вашим текущим подрядчиком и контролировать качество в ваших интересах.",
    },
    {
      q: "Данные останутся у нас?",
      a: "Да. Мы разворачиваем решения on-premise, в вашем контуре, с разграничением прав по оргструктуре и с учётом требований 152-ФЗ.",
    },
  ],
} as const;

/** Закрывающий CTA — та же форма, что у референса: заголовок с градиентом и кнопка. */
export const closing = {
  titleLead: "Начнём с ",
  titleAccent: "экспресс-аудита",
  lead: "За 5 рабочих дней разберём текущую ситуацию, покажем быстрые улучшения, риски и возможную дорожную карту.",
  cta: { label: "Оставить заявку", href: "/contacts" },
} as const;

export const footer = {
  blurb:
    "Дорабатываем WebSoft и 1С под ваши процессы, внедряем локальный ИИ и держим архитектуру под контролем.",
  columns: [
    {
      title: "Услуги",
      links: [
        { label: "WebSoft HCM", href: "/services/websoft" },
        { label: "1С ЗУП и данные", href: "/services/1c" },
        { label: "Локальные ИИ-агенты", href: "/services/ai" },
        { label: "Аудит и надзор", href: "/services/audit" },
        { label: "Аудит ИБ", href: "/services/security-audit" },
        { label: "Порталы и EX", href: "/services/portals" },
        { label: "Карьерные порталы", href: "/services/career-sites" },
        { label: "Собственные сервисы", href: "/services/custom" },
      ],
    },
    {
      title: "Экспертиза",
      links: [
        { label: "Проекты специалистов HRQT", href: "#projects" },
        { label: "О команде", href: "#team" },
        { label: "Блог", href: "/blog" },
        { label: "Форматы работы", href: "#packages" },
      ],
    },
    {
      title: "Компания",
      links: [
        { label: "О нас", href: "/about" },
        { label: "Контакты", href: "/contacts" },
        { label: "Оставить заявку", href: "/contacts" },
      ],
    },
  ],
  contacts: {
    title: "Контакты",
    email: brand.email,
    phone: brand.phone,
    phoneHref: brand.phoneHref,
    address: "Москва, ул. Трубная, 12",
    hours: "Пн–Пт, 10:00–19:00 МСК",
    // Telegram убран сознательно: блокировки и корпоративные политики
    // заказчиков делают его плохим первым каналом. Приоритет — почта.
    action: { label: "Заявка через сайт", href: "/contacts" },
  },
  // Required on every page by 152-ФЗ, per HRQT_юр-сверка (Фаза 9).
  legalLinks: [
    { label: "Политика обработки ПДн", href: "/legal/privacy" },
    { label: "Согласие на обработку ПДн", href: "/legal/consent" },
    { label: "Cookie", href: "/legal/cookie" },
  ],
} as const;
