Okay, let's break down the NextUI Tabs component documentation.

**NextUI Tabs: A Comprehensive Overview**

**Introduction**

The NextUI Tabs component provides a user-friendly way to organize and navigate between different sections of content within a React application. It leverages the power of `react-aria` to ensure accessibility and smooth user interactions.

**Installation**

You can install the Tabs component individually using the NextUI CLI:

```bash
npx nextui-cli@latest add tabs
```

Alternatively, if you have `@nextui-org/react` installed globally, you can skip this step.

**Import**

NextUI offers two ways to import the Tabs component:

1. **Individual Import:**

    ```javascript
    import {Tabs, Tab} from "@nextui-org/react";
    ```

2. **Global Import:**

    ```javascript
    import {Tabs, Tab} from "@nextui-org/theme";
    ```

**Basic Usage**

Here's a simple example of how to use the Tabs component:

```javascript
import {Tabs, Tab} from "@nextui-org/react";

function MyTabs() {
  return (
    <Tabs aria-label="Options">
      <Tab key="photos" title="Photos">
        <div>Content for Photos tab</div>
      </Tab>
      <Tab key="music" title="Music">
        <div>Content for Music tab</div>
      </Tab>
      <Tab key="videos" title="Videos">
        <div>Content for Videos tab</div>
      </Tab>
    </Tabs>
  );
}
```

**Dynamic Tabs**

You can render tabs dynamically using the `items` prop:

```javascript
import {Tabs, Tab} from "@nextui-org/react";

function MyDynamicTabs() {
  const items = [
    { key: "photos", title: "Photos" },
    { key: "music", title: "Music" },
    { key: "videos", title: "Videos" },
  ];

  return (
    <Tabs aria-label="Dynamic tabs" items={items}>
      {(item) => (
        <Tab key={item.key} title={item.title}>
          <div>Content for {item.title} tab</div>
        </Tab>
      )}
    </Tabs>
  );
}
```

**Disabled Tabs**

You can disable the entire Tabs component or individual tabs:

*   **Disable all tabs:**

    ```javascript
    <Tabs isDisabled>
        {/* Tabs here */}
    </Tabs>
    ```

*   **Disable a specific tab:**

    ```javascript
    <Tabs>
        <Tab key="photos" title="Photos">
            {/* Content */}
        </Tab>
        <Tab key="music" title="Music" isDisabled>
            {/* Content */}
        </Tab>
    </Tabs>
    ```

**Customization**

**Sizes**

Control the size of the tabs with the `size` prop:

```javascript
<Tabs size="sm"> {/* Small tabs */}
<Tabs size="md"> {/* Medium tabs (default) */}
<Tabs size="lg"> {/* Large tabs */}
```

**Radius**

Adjust the rounded corners with the `radius` prop:

```javascript
<Tabs radius="none"> {/* No rounding */}
<Tabs radius="sm">   {/* Small rounding */}
<Tabs radius="md">   {/* Medium rounding */}
<Tabs radius="lg">   {/* Large rounding */}
<Tabs radius="full"> {/* Fully rounded */}
```

**Colors**

Change the color scheme using the `color` prop:

```javascript
<Tabs color="default">   {/* Default color */}
<Tabs color="primary">   {/* Primary color */}
<Tabs color="secondary"> {/* Secondary color */}
<Tabs color="success">   {/* Success color */}
<Tabs color="warning">   {/* Warning color */}
<Tabs color="danger">    {/* Danger color */}
```

**Variants**

Modify the visual style with the `variant` prop:

```javascript
<Tabs variant="solid">      {/* Solid background (default) */}
<Tabs variant="bordered">   {/* Border around tabs */}
<Tabs variant="light">      {/* Light background */}
<Tabs variant="underlined"> {/* Underline indicator */}
```

**With Icons**

Add icons to your tabs for better visual representation:

```javascript
import {Tabs, Tab} from "@nextui-org/react";
import { AiFillCamera, AiFillCustomerService, AiFillVideoCamera } from "react-icons/ai";

function TabsWithIcons() {
    return (
        <Tabs aria-label="Options" variant="bordered">
            <Tab
                key="photos"
                title={
                    <div className="flex items-center space-x-2">
                        <AiFillCamera />
                        <span>Photos</span>
                    </div>
                }
            >
                {/* Content */}
            </Tab>
            <Tab
                key="music"
                title={
                    <div className="flex items-center space-x-2">
                        <AiFillCustomerService />
                        <span>Music</span>
                    </div>
                }
            >
                {/* Content */}
            </Tab>
            <Tab
                key="videos"
                title={
                    <div className="flex items-center space-x-2">
                        <AiFillVideoCamera />
                        <span>Videos</span>
                    </div>
                }
            >
                {/* Content */}
            </Tab>
        </Tabs>
    )
}

export default TabsWithIcons;
```

**Controlled Tabs**

For more control, manage the selected tab using `selectedKey` and `onSelectionChange`:

```javascript
import {Tabs, Tab} from "@nextui-org/react";
import React, {useState} from "react";

function ControlledTabs() {
  const [selectedKey, setSelectedKey] = useState("photos");

  return (
    <>
        <Tabs
            aria-label="Options"
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
        >
            <Tab key="photos" title="Photos">
                <div>Content for Photos tab</div>
            </Tab>
            <Tab key="music" title="Music">
                <div>Content for Music tab</div>
            </Tab>
            <Tab key="videos" title="Videos">
                <div>Content for Videos tab</div>
            </Tab>
        </Tabs>
        <div>Selected tab: {selectedKey}</div>
    </>
  );
}
```

**Placement**

Change the position of the tabs using the `placement` prop:

```javascript
<Tabs placement="top">    {/* Tabs at the top (default) */}
<Tabs placement="bottom"> {/* Tabs at the bottom */}
<Tabs placement="start">  {/* Tabs on the left */}
<Tabs placement="end">    {/* Tabs on the right */}
```

**Vertical Tabs**

Make the tabs vertical using the `isVertical` prop, note that this will invalidate the `placement` prop:

```javascript
<Tabs isVertical>
  {/* Tabs will be stacked vertically */}
</Tabs>
```

**Tabs as Links**

Render tabs as links using the `href` prop in the `Tab` component. This is particularly useful when integrating with client-side routers like Next.js App Router or React Router.

**Example with Next.js App Router:**

```javascript
// app/layout.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {Link} from "@nextui-org/link";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";

import {Link as NextLink} from "next/link";
import {usePathname} from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
              <Navbar>
                <NavbarBrand>
                  <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                  <NavbarItem className={pathname === "/" ? "active" : ""}>
                    <Link as={NextLink} color="foreground" href="/">
                      Home
                    </Link>
                  </NavbarItem>
                  <NavbarItem className={pathname === "/profile" ? "active" : ""}>
                    <Link as={NextLink} color="foreground" href="/profile">
                      Profile
                    </Link>
                  </NavbarItem>
                  <NavbarItem className={pathname === "/settings" ? "active" : ""}>
                    <Link as={NextLink} color="foreground" href="/settings">
                      Settings
                    </Link>
                  </NavbarItem>
                </NavbarContent>
              </Navbar>
              {children}
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
```

*   Create routes for each tab in your Next.js app (`/`, `/profile`, `/settings`).
*   Use `usePathname` to get the current URL path.
*   Set the `selectedKey` of the `Tabs` component based on the current path.
*   Pass the `href` to each `Link` component.

**Example with React Router:**

```javascript
import {Tabs, Tab} from "@nextui-org/react";
import {Link, useLocation} from "react-router-dom";

function RouterTabs() {
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <Tabs aria-label="Options" selectedKey={selectedKey}>
      <Tab key="/" title="Home" href="/" as={Link}>
        <div>Content for Home</div>
      </Tab>
      <Tab key="/profile" title="Profile" href="/profile" as={Link}>
        <div>Content for Profile</div>
      </Tab>
      <Tab key="/settings" title="Settings" href="/settings" as={Link}>
        <div>Content for Settings</div>
      </Tab>
    </Tabs>
  );
}
```

**Tabs within Forms**

You can seamlessly integrate Tabs within forms:

```javascript
import {Tabs, Tab, Input, Textarea, Button} from "@nextui-org/react";

function FormTabs() {
  return (
    <form>
        <Tabs aria-label="Form Tabs">
            <Tab key="login" title="Login">
                <div className="flex flex-col gap-4">
                    <Input isRequired type="email" label="Email" placeholder="Enter your email" />
                    <Input isRequired type="password" label="Password" placeholder="Enter your password" />
                    <p className="text-center text-small">
                        Need to create an account? <a className="text-primary">Sign up</a>
                    </p>
                    <div className="flex gap-2 justify-end">
                        <Button fullWidth color="primary">
                            Login
                        </Button>
                    </div>
                </div>
            </Tab>
            <Tab key="sign-up" title="Sign up">
                <div className="flex flex-col gap-4">
                    <Input isRequired type="email" label="Email" placeholder="Enter your email" />
                    <Input isRequired type="password" label="Password" placeholder="Enter your password" />
                    <Textarea
                        isRequired
                        label="Bio"
                        placeholder="Enter your bio"
                        className="col-span-2"
                    />
                    <div className="flex gap-2 justify-end">
                        <Button fullWidth color="primary">
                            Sign up
                        </Button>
                    </div>
                </div>
            </Tab>
        </Tabs>
    </form>
  );
}
```

**Slots and Custom Styles**

The Tabs component is composed of various slots that you can target with Tailwind CSS classes for customization:

*   **`base`**: Main container.
*   **`tabList`**: Wraps the tab items.
*   **`tab`**: Individual tab item.
*   **`tabContent`**: Wraps the text content of a tab.
*   **`cursor`**: The animated cursor indicator.
*   **`panel`**: Wraps the content of each tab panel.

**Example:**

```javascript
<Tabs
  classNames={{
    base: "bg-gray-200 p-2",
    tabList: "bg-white border-b border-gray-300",
    tab: "text-blue-500 hover:bg-blue-100",
    cursor: "bg-blue-500",
    panel: "p-4 bg-gray-50",
  }}
>
  {/* ... */}
</Tabs>
```

**Data Attributes**

The `Tab` component exposes several data attributes on its `base` element for styling based on state:

*   **`data-selected`**: When the tab is selected.
*   **`data-disabled`**: When the tab is disabled.
*   **`data-hover`**: When the tab is hovered.
*   **`data-hover-selected`**: When the tab is hovered and not selected.
*   **`data-focus`**: When the tab is focused.
*   **`data-focus-visible`**: When the tab is focused via keyboard.
*   **`data-pressed`**: When the tab is pressed.

**Accessibility**

The NextUI Tabs component is designed with accessibility in mind:

*   Supports mouse, touch, and keyboard interactions.
*   Arrow key navigation between tabs.
*   Handles disabled tabs.
*   Follows ARIA tabs pattern for semantic structure.
*   Manages focus for tab panels without focusable children.

**API Reference**

The documentation provides detailed API tables for both `Tabs` and `Tab` props, including:

*   **Prop Name**
*   **Type**
*   **Default Value**
*   **Description**

**Tabs Props:**

*   `children`: Content of the tabs. Can be `ReactNode` or a function that renders tabs based on items.
*   `variant`: Visual style (solid, bordered, light, underlined).
*   `color`: Color scheme.
*   `size`: Size (sm, md, lg).
*   `radius`: Roundness (none, sm, md, lg, full).
*   `fullWidth`: Whether tabs should take full width.
*   `items`: Data for dynamically rendering tabs.
*   `disabledKeys`: Array of keys for disabled tabs.
*   `selectedKey`: Currently selected tab key (for controlled mode).
*   `defaultSelectedKey`: Initially selected tab key (for uncontrolled mode).
*   `shouldSelectOnPressUp`: Whether to select on press up.
*   `keyboardActivation`: "automatic" or "manual" keyboard activation.
*   `motionProps`: Props for Framer Motion integration.
*   `disableCursorAnimation`: Disables the cursor animation.
*   `isDisabled`: Disables all tabs.
*   `classNames`: Custom Tailwind CSS classes for slots.
*   `placement`: Position of tabs (top, bottom, start, end).
*   `isVertical`: Whether tabs are oriented vertically.
*   `destroyInactiveTabPanel`: Whether to destroy inactive tab panels.
*   `onSelectionChange`: Callback when the selected tab changes.

**Tab Props:**

*   `tabRef`: Ref for the tab button element.
*   `children`: Content of the tab.
*   `title`: Title of the tab.
*   `titleValue`: String value of the title.
*   `href`: URL for rendering the tab as a link.
*   `target`: Target attribute for the link.
*   `rel`: Rel attribute for the link.
*   `download`: Download attribute for the link.
*   `shouldSelectOnPressUp`: Override the Tabs `shouldSelectOnPressUp` prop.

**Conclusion**

The NextUI Tabs component offers a flexible and accessible solution for implementing tabs in your React applications. Its comprehensive features, customization options, and adherence to accessibility standards make it a valuable addition to any UI toolkit. Remember to consult the API reference tables for a complete understanding of all available props and their usage.
