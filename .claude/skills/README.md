# Дизайн-скиллы проекта

Три скилла, установленные в репозиторий по запросу. Claude Code подхватывает
их автоматически из `.claude/skills/` — отдельной установки не требуется.

| Скилл | Источник | Что даёт |
| --- | --- | --- |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Метод постановки визуального направления: как не свалиться в шаблонную эстетику, как выбирать типографику и где тратить смелость. |
| `ui-ux-pro-max` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Поисковая база: 79 стилей, 192 палитры, 74 пары шрифтов, 119 правил UX, 25 типов графиков, 22 стека, пресеты анимации. |
| `canvas-design` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/canvas-design) | Визуальная графика в PNG и PDF плюс набор шрифтов под неё. |

## Как пользоваться поисковой базой

```bash
# Направление для нового раздела или страницы
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<запрос>" --design-system -p "HRQT"

# Точечный вопрос: доступность, анимация, типографика, сетка
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "scroll reveal stagger" --domain gsap
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "focus not obscured" --domain ux

# Рекомендации под стек проекта
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "suspense streaming" --stack nextjs
```

## Что из этого уже применено

Палитра и типографика проекта не менялись: они заданы брендбуком HRQT (Фаза 6),
и рекомендация скилла по цвету — «профессиональный navy + синий CTA» — осталась
рекомендацией. Скиллы использованы там, где у проекта не было собственного
решения:

- система движения построена по коридорам из `--domain gsap` (шаг волны 20–100 мс,
  не больше восьми элементов в волне, обязательный `prefers-reduced-motion`);
- чек-лист перед сдачей из `--design-system` пройден целиком: тач-цели 44×44,
  видимый фокус, контраст, проверка на 320/375/768/1024/1440;
- остановка бегущей строки по наведению и по фокусу — прямое требование
  паттерна «Trust & Authority» из базы.

Лицензии скиллов лежат рядом с ними (`LICENSE.txt`, `LICENSE`).
