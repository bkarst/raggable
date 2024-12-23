This document describes how to use Swapy, a JavaScript library for swapping DOM elements. Here's a breakdown of the key concepts and steps:

**Core Idea**

Swapy enables you to easily swap the positions of HTML elements within a designated container. This is useful for creating interactive layouts, drag-and-drop interfaces, or any scenario where you need to rearrange elements dynamically.

**Key Concepts**

1. **Container:** The parent element that holds all the swappable elements. You'll create a Swapy instance associated with a specific container.
2. **Slots:** Designated areas within the container where items can be placed. Each slot can hold only one item at a time.
3. **Items:** The actual HTML elements that can be moved between slots.

**Setting up the HTML**

1. **Define Slots:**
    *   Use the `data-swapy-slot` attribute to mark an element as a slot.
    *   Give each slot a unique name (e.g., "a", "b", "top", "bottom").

    ```html
    <div data-swapy-slot="foo"></div>
    ```

2. **Define Items:**
    *   Use the `data-swapy-item` attribute to mark an element as an item.
    *   Give each item a unique name (e.g., "a", "b", "item-1").

    ```html
    <div data-swapy-item="bar"></div>
    ```

3. **Structure:**
    *   Place items inside their initial slots within the container.
    *   You can use the same name for a slot and an item.

**Example HTML Structure**

```html
<div class="container">
  <!-- Slot A -->
  <div data-swapy-slot="a">
    <!-- Item A -->
    <div data-swapy-item="a">
      <div>A</div>
    </div>
  </div>

  <!-- Slot B -->
  <div data-swapy-slot="b">
    <!-- Item B -->
    <div data-swapy-item="b">
      <div>B</div>
    </div>
  </div>

  <!-- Slot C -->
  <div data-swapy-slot="c">
    <!-- Item C -->
    <div data-swapy-item="c">
      <div>C</div>
    </div>
  </div>
</div>
```

**Initializing Swapy with JavaScript**

1. **Import `createSwapy`:**

    ```javascript
    import { createSwapy } from 'swapy';
    ```

2. **Get the Container Element:**

    ```javascript
    const container = document.querySelector('.container');
    ```

3. **Create a Swapy Instance:**

    ```javascript
    const swapy = createSwapy(container, {
      // Your config options (optional)
    });
    ```

**Configuration and Events**

*   **Config Options:** The second argument to `createSwapy` is an object where you can customize Swapy's behavior (e.g., animation settings). The document links to a separate page with details on configuration options.
*   **Events:** Swapy emits events during the swapping process (e.g., `swapStart`, `swapEnd`, `beforeSwap`). You can listen to these events to trigger custom logic. The document links to a separate page with details on events.

**Additional Notes**

*   **Multiple Instances:** You can have multiple independent Swapy instances on a single page. Each instance operates on its own container.
*   **Vanilla TypeScript Example:** The document provides a link to a full example using vanilla TypeScript, which can be helpful for understanding the setup in a real project.
*   **Further Documentation:** The document links to other pages that cover topics like installation, handle elements, animation settings, and swap events.
*   **Copyright:** The document includes a copyright notice for Taha Shashtari, the creator of Swapy.

**In essence, Swapy provides a simple yet powerful way to make your web layouts more dynamic and interactive by allowing users to rearrange elements within a defined structure.**
