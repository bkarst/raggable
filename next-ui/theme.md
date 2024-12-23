Theme

Theming is a key element in designing user interfaces (UIs). It enables the application of a
consistent aesthetic across your application, enhancing the user experience and maintaining
visual uniformity.

In NextUI, we facilitate easy and flexible theme customization using a
TailwindCSS plugin. This plugin, which is based on the tw-colors
plugin developed by L-Blondy, allows you to customize color schemes,
layout configurations, and more, across different components of your application.

What is a Theme?
A theme, in the context of NextUI, is a predefined set of colors, layout attributes, and other
UI elements that you can consistently apply across your application. Themes ensure visual
consistency, enrich the user experience, and simplify the management and updates of your
app's look and feel.
Setup
The first step to using NextUI's theming capability is adding the `nextui` plugin to your
`tailwind.config.js` file. Below is an example of how to do this:

**Note**: If you are using pnpm and monorepo architecture, please make sure you are pointing to the ROOT `node_modules`

```js
// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
```
Usage
After adding the plugin to your `tailwind.config.js` file, you can utilize any of the default
themes (light/dark) or a custom one. Here's how you can apply these themes in your `main.jsx` or `main.tsx`:

Go to the src directory and inside `main.jsx` or `main.tsx`, apply the following class names to the root element:

-   `light` for the light theme.
-   `dark` for the dark theme.
-   `text-foreground` to set the text color.
-   `bg-background` to set the background color.

```jsx

```

**Note**: See the Colors section to learn more about the color classes.

Default Plugin Options
The `nextui` plugin provides a default structure. It is outlined as follows:

```js

```
Themes Options
These are the options that you can use to apply custom configurations to your themes.

```js

```
Nested themes
NextUI supports nested themes, allowing you to apply different themes to different sections
of your application:

```html

```
Theme based variants
NextUI enables you to apply TailwindCSS styles based on the currently active theme. Below are
examples of how to do this:

```html

```
API Reference
The following table provides an overview of the various attributes you can use when working
with themes in NextUI:

| Attribute         | Type                                                                                                                    | Description                                                                                                                                                        | Default   |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| prefix            | `string`                                                                                                                | The prefix for the css variables.                                                                                                                                  | `nextui`  |
| addCommonColors   | `boolean`                                                                                                               | If true, the common nextui colors (e.g. "blue", "green", "purple") will replace the TailwindCSS default colors.                                                     | `false`   |
| defaultTheme      | `light` \| `dark`                                                                                                       | The default theme to use.                                                                                                                                          | `light`   |
| defaultExtendTheme | `light` \| `dark`                                                                                                       | The default theme to extend.                                                                                                                                       | `light`   |
| layout            | [LayoutTheme](#layouttheme)                                                                                             | The layout definitions.                                                                                                                                            | -         |
| themes            | [ConfigThemes](#configthemes)                                                                                           | The theme definitions.                                                                                                                                             | -         |
Types
ConfigThemes
```ts
export type ConfigThemes = Record<
  string,
  {
    extend?: "dark" | "light"; // optional, default to "light"
    layout?: Partial<LayoutTheme>; // optional
    colors?: Partial<ThemeColors>; // optional
  }
>;
```
LayoutTheme
```ts
export type LayoutTheme = {
  spacingUnit: string; // default: 4
  disabledOpacity: string; // default: 0.5
  dividerWeight: string; // default: "1px"
  fontSize: {
    tiny: string; // default: "0.75rem"
    small: string; // default: "0.875rem"
    medium: string; // default: "1rem"
    large: string; // default: "1.125rem"
  };
  lineHeight: {
    tiny: string; // default: "1rem"
    small: string; // default: "1.25rem"
    medium: string; // default: "1.5rem"
    large: string; // default: "1.75rem"
  };
  radius: {
    small: string; // default: "0.25rem"
    medium: string; // default: "0.5rem"
    large: string; // default: "0.75rem"
  };
  borderWidth: {
    small: string; // default: "1px"
    medium: string; // default: "1px"
    large: string; // default: "2px"
  };
  boxShadow: {
    small: string; // default: "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3);"
    medium: string; // default: "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3);"
    large: string; // default: "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3);"
  };
  zIndex: {
    1: string; // default: 1
    2: string; // default: 2
    3: string; // default: 3
    4: string; // default: 4
    5: string; // default: 5
    10: string; // default: 10
    50: string; // default: 50
    100: string; // default: 100
    auto: string; // default: "auto"
  };
  transition: {
    duration: {
      faster: string; // default: "50ms"
      fast: string; // default: "100ms"
      normal: string; // default: "150ms"
      slow: string; // default: "200ms"
      slower: string; // default: "300ms"
    };
    easing: {
      linear: string; // default: "linear"
      ease: string; // default: "ease"
      in: string; // default: "ease-in"
      out: string; // default: "ease-out"
      inOut: string; // default: "ease-in-out"
    };
  };
};
```
ThemeColors
```ts
export type ThemeColors = {
  background: string; // base background color
  foreground: string; // base text color
  divider: string; // divider and border color
  overlay: string; // overlay color for modal, popover, etc.
  focus: string; // focus ring color
  content1: string; // content1 background color
  content2: string; // content2 background color
  content3: string; // content3 background color
  content4: string; // content4 background color

  // default theme
  default: string;
  defaultHover: string; // hover state
  defaultContrast: string; // contrast text color
  // primary theme
  primary: string;
  primaryHover: string; // hover state
  primaryContrast: string; // contrast text color
  // secondary theme
  secondary: string;
  secondaryHover: string; // hover state
  secondaryContrast: string; // contrast text color
  // success theme
  success: string;
  successHover: string; // hover state
  successContrast: string; // contrast text color
  // warning theme
  warning: string;
  warningHover: string; // hover state
  warningContrast: string; // contrast text color
  // danger theme
  danger: string;
  dangerHover: string; // hover state
  dangerContrast: string; // contrast text color
};
```
