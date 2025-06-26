# React Calculator App

A modern, modular calculator built with React, TypeScript, and Material UI. Supports keyboard and button input, undo/redo/history, math parsing, and a responsive UI.

## Features

- **Modular Components:** Number, operator, and utility buttons are reusable and customizable.
- **Keyboard & Button Input:** Use your keyboard or click buttons for all calculator operations.
- **Undo/Redo & History:** Step backward/forward through calculations. History is preserved for easy review.
- **Math Parsing:** Expressions are parsed and evaluated using `mathjs` for accuracy and flexibility.
- **Responsive UI:** Layout adapts to different screen sizes. Tooltips provide keyboard shortcut hints.
- **Accessibility:** All buttons have descriptive tooltips and keyboard navigation support.

## Key Bindings

- **Numbers & Operators:** Use 0-9, +, -, \*, /, =, Enter, and .
- **Undo:** Ctrl/Cmd + Z
- **Redo:** Ctrl/Cmd + Y or Shift + Z
- **Clear:** Esc or C
- **Delete:** Backspace or ⌫
- **Toggle Sign:** +/- button
- **Show Keybindings:** Hamburger icon in the UI

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

- `src/components/` — Modular React components (NumberButton, Operator, Output, UtilButton, etc.)
- `src/utils/` — Utility functions for keyboard handling, math operations, and history management
- `src/App.tsx` — Main app logic and state management
- `public/` — Static assets

## Customization

- **Add new operations:** Edit `src/utils/operations.ts` and update the Operator component.
- **Change layout or styles:** Edit component CSS modules or `App.css`.
- **Update keybindings:** See `src/utils/keyboardUtils.ts` and `KeybindingsList` component.

## Dependencies

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [mathjs](https://mathjs.org/)
- [Vite](https://vitejs.dev/)

## License

MIT
