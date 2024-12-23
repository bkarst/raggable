This documentation describes the `Skeleton` component, a placeholder used to indicate a loading state and display the expected shape of a component before the actual content is loaded.

## Installation

The `Skeleton` component can be installed individually using package managers like npm, yarn, pnpm, or bun. Alternatively, if `@nextui-org/react` is already installed globally, you can skip the individual installation.

**Installation using CLI:**

```bash
npx nextui-cli@latest add skeleton
```

## Import

You can import the `Skeleton` component either individually or globally.

**Individual Import:**

```javascript
import {Skeleton} from "@nextui-org/skeleton";
```

## Usage

The `Skeleton` component is used to provide a visual placeholder while content is being loaded. Here's a basic example:

```javascript
import {Skeleton} from "@nextui-org/skeleton";

<div className="w-[200px] space-y-5 p-4">
  <Skeleton className="rounded-lg">
    <div className="h-24 rounded-lg bg-default-300"></div>
  </Skeleton>
  <div className="space-y-3">
    <Skeleton className="w-3/5 rounded-lg">
      <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
    </Skeleton>
    <Skeleton className="w-4/5 rounded-lg">
      <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
    </Skeleton>
    <Skeleton className="w-2/5 rounded-lg">
      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
    </Skeleton>
  </div>
</div>;
```

### Standalone Usage

While `Skeleton` typically adopts the shape of its children, it can also function as a standalone component:

```javascript
import {Skeleton} from "@nextui-org/skeleton";

<div className="max-w-[300px] w-full flex items-center gap-3">
  <div>
    <Skeleton className="flex rounded-full w-12 h-12" />
  </div>
  <div className="w-full flex flex-col gap-2">
    <Skeleton className="h-3 w-3/5 rounded-lg" />
    <Skeleton className="h-3 w-4/5 rounded-lg" />
  </div>
</div>;
```

### Loaded State

The `isLoaded` prop controls the skeleton animation. When set to `true`, the animation stops, and the children components are displayed:

```javascript
import React from "react";
import {Skeleton, Button} from "@nextui-org/react";

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Skeleton isLoaded={isLoaded} className="w-[200px] space-y-5 p-4 rounded-xl">
        <div className="h-24 rounded-lg bg-secondary"></div>
        <div className="space-y-3">
          <div className="h-3 w-3/5 rounded-lg bg-secondary"></div>
          <div className="h-3 w-4/5 rounded-lg bg-secondary-300"></div>
          <div className="h-3 w-2/5 rounded-lg bg-secondary-200"></div>
        </div>
      </Skeleton>
      <Button
        color="secondary"
        variant="shadow"
        onClick={() => setIsLoaded(!isLoaded)}
      >
        {isLoaded ? "Show Skeleton" : "Hide Skeleton"}
      </Button>
    </div>
  );
}
```

## Slots

The `Skeleton` component has two slots:

-   **base**: The main container, responsible for the animation using `before` and `after` pseudo-elements.
-   **content**: The child component that becomes visible when `isLoaded` is `true`.

## Data Attributes

The `base` element of the `Skeleton` has the following data attribute:

-   **data-loaded**: Reflects the `isLoaded` prop's value, indicating whether the content is loaded.

## API

### Skeleton Props

| Prop               | Type                                             | Default | Description                                                                                                 |
| ------------------ | ------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------- |
| `children`         | `ReactNode`                                      | -       | The content to be displayed once loaded.                                                                    |
| `isLoaded`         | `boolean`                                        | `false` | Controls whether the skeleton animation is active and if the children are displayed.                       |
| `disableAnimation` | `boolean`                                        | `false` | Disables the shimmer animation.                                                                            |
| `classNames`       | `Partial<Record<"base" \| "content", string>>` | -       | Allows customization of the CSS classes for the `base` and `content` slots, enabling tailored styling. |
