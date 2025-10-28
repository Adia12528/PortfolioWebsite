# Contributing to PortfolioWebsite

Thanks for your interest in contributing! This project is a personal portfolio site, but contributions that fix bugs, improve documentation, or add small, well-scoped enhancements are welcome.

## How to contribute

1. Fork the repository and create a feature branch from `main`:

```bash
# recommended branch naming
git checkout -b feat/short-description
```

2. Make small, focused changes. Keep commits atomic and message clearly (use present-tense verbs, e.g., "Fix header spacing").

3. Run a local preview to test your changes:

```powershell
# from repo root
python -m http.server 8000
# open http://localhost:8000/views/index.html
```

4. Push your branch and open a Pull Request against `main`. Describe the change, why it helps, and any testing notes.

## Code style & expectations

- HTML: keep markup semantic and accessible (use alt attributes, ARIA where appropriate).
- CSS: prefer concise, maintainable rules. Reuse existing classes where possible. Keep visual changes consistent with the current theme system.
- JavaScript: avoid large frameworks; keep changes light and dependency-free where possible. Document any new behavior in `README.md`.

## Review process

- PRs will be reviewed for correctness, accessibility, and visual regressions.
- Small fixes may be merged quickly; larger changes may request revisions.

## Issues

- Open issues for bugs or feature requests. Provide a clear description and steps to reproduce when applicable.

## License

By contributing, you agree that your contributions will be licensed under the project license (MIT) unless explicitly stated otherwise.

---

If you'd like, I can add a simple `PULL_REQUEST_TEMPLATE.md` or a `CODE_OF_CONDUCT.md` next.