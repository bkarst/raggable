This HTML code snippet demonstrates how to implement a "handle" element within a draggable item using the "Swapy" library (presumably a JavaScript library for drag-and-drop functionality).

**Core Concept: Handle Element**

*   **Default Behavior:** By default, Swapy allows users to drag an item from any point within its boundaries.
*   **Handle Element:** You can restrict the draggable area to a specific element within the item. This designated element is called the "handle."
*   **Purpose:** This provides finer control over the drag-and-drop interaction, preventing accidental drags when clicking on other parts of the item.

**Implementation: `data-swapy-handle` Attribute**

To define a handle, you add the `data-swapy-handle` attribute to the desired element inside the draggable item.

**Example:**

```html
<div data-swapy-item="foo">
  <!-- This div is now the handle -->
  <div data-swapy-handle></div>
  <!-- Item content... -->
</div>
```

In this example:

1. The outer `div` with `data-swapy-item="foo"` represents the draggable item.
2. The inner `div` with `data-swapy-handle` is designated as the handle.
3. Users can only initiate a drag by clicking and holding within the handle `div`.

**Code Breakdown:**

*   **Header:**
    *   Sets up the title "Handle Element" and a brief description.
*   **Content:**
    *   Explains the concept of a handle element and its default behavior.
    *   Provides instructions on using `data-swapy-handle` to specify the handle.
    *   Includes a code example demonstrating the attribute's usage.
*   **`astro-island` Component:**
    *   This section appears to be a dynamic component (likely using a framework like Astro) that renders an interactive example.
    *   It showcases a grid layout with four draggable items (A, B, C, D).
    *   Each item has a small square `div` with the class `handle` and the `data-swapy-handle` attribute, making it the handle for that item.
*   **Footer:**
    *   Contains navigation links to related documentation ("Simple Example" and "No Drag Elements").
    *   Includes copyright information.

**How to Use `data-swapy-handle`**

1. **Include Swapy:** Make sure you have included the Swapy JavaScript library in your project and initialized it according to its documentation.
2. **Identify Draggable Items:** Add the `data-swapy-item` attribute to the elements you want to make draggable.
3. **Define the Handle:** Inside each draggable item, add the `data-swapy-handle` attribute to the element that should serve as the handle.
4. **Style the Handle (Optional):** You might want to visually distinguish the handle element using CSS. In the provided example, the `handle` class likely applies some styling to the handle `div`.

**Benefits of Using Handles:**

*   **Improved User Experience:** Prevents accidental dragging when interacting with other elements within the draggable item.
*   **Precise Control:** Allows you to define specific areas for initiating drag interactions.
*   **Cleaner Interface:** Can lead to a more intuitive and user-friendly interface, especially when dealing with complex draggable items.
*   **Accessibility:** By carefully designing the handle's size and position, you can improve the accessibility of the drag-and-drop interaction for users with motor impairments.

**Note:** The provided code snippet focuses on the HTML structure for defining handles. The actual drag-and-drop functionality is handled by the Swapy library, which is not fully detailed in this snippet. You would need to refer to the Swapy documentation for complete implementation instructions.


This documentation excerpt describes how to prevent specific HTML elements from being draggable within a drag-and-drop interface built with a library called "Swapy". The core concept is using the `data-swapy-no-drag` attribute.

**Core Idea: No-Drag Elements**

*   **Default Behavior:** When a draggable item in Swapy doesn't have a designated "handle" element (which would limit dragging to only that handle), the entire item becomes draggable.
*   **Problem:** Sometimes, you want parts of a draggable item to *not* initiate a drag. For example, you might have buttons or interactive areas within the draggable item that should perform their own actions instead of starting a drag.
*   **Solution:** The `data-swapy-no-drag` attribute. By adding this attribute to any element *inside* a draggable item, you prevent that element and its children from triggering a drag operation.

**How to Use `data-swapy-no-drag`**

1. **Identify Draggable Items:** Your HTML should already have elements marked as draggable using Swapy's `data-swapy-item` attribute. For instance:

    ```html
    <div data-swapy-item="item1">
        </div>
    ```

2. **Mark Non-Draggable Elements:** Inside the draggable item, add the `data-swapy-no-drag` attribute to any element that should not initiate a drag:

    ```html
    <div data-swapy-item="item1">
        <button data-swapy-no-drag>Click Me</button> 
        <div data-swapy-no-drag>
            <p>This text is not draggable</p>
        </div>
    </div>
    ```

**Example Breakdown**

The provided HTML code demonstrates this:

```html
<div data-swapy-item="foo">
  <div data-swapy-no-drag></div>
  <button data-swapy-no-drag></button>
  &lt;!-- Item content... --&gt;
</div>
```

*   **`data-swapy-item="foo"`:** This `div` is a draggable item.
*   **`<div data-swapy-no-drag></div>`:** An empty `div` marked as non-draggable.
*   **`<button data-swapy-no-drag></button>`:** A button that won't initiate a drag when clicked.

**Interactive Demo**

The `astro-island` tag in the documentation represents an interactive demo. Here's what it illustrates:

*   It creates a layout with draggable elements labeled A, B, C, and D.
*   Elements A has two areas with the text "No-drag" inside, which have been given the `data-swapy-no-drag` attribute.
*   **Functionality:** You can drag items A, B, C, and D around, but clicking and dragging on the "No-drag" areas within element A will *not* start a drag.

**In essence, `data-swapy-no-drag` provides fine-grained control over which parts of a draggable item can be used to initiate a drag operation, allowing you to create more complex and user-friendly drag-and-drop interfaces.**


This HTML code snippet provides documentation for a JavaScript library feature, likely related to drag-and-drop functionality, called "Swap Mode". It explains how to configure whether items swap positions on hover or on drop.

**Key Concepts**

*   **Swap Mode:** This setting determines when dragged items will exchange positions with other elements within a defined area (likely a container or a set of slots).
*   **Hover (default):** Items swap positions as soon as the dragged item hovers over a target slot.
*   **Drop:** Items swap positions only when the dragged item is explicitly dropped onto a target slot.

**Code Examples and Usage**

The documentation provides two code examples, demonstrating how to set the `swapMode` option using a hypothetical function `createSwapy`:

**1. Hover Mode (Default)**

```javascript
createSwapy(container, {
  swapMode: 'hover'
})
```

*   **`createSwapy(container, options)`:** This function appears to be the primary way to initialize the library, taking a `container` element and a set of `options` as arguments.
*   **`swapMode: 'hover'`:** This explicitly sets the swap mode to "hover". Since it's the default, this line could technically be omitted.

**2. Drop Mode**

```javascript
createSwapy(container, {
  swapMode: 'drop'
})
```

*   **`swapMode: 'drop'`:** This sets the swap mode to "drop", meaning swaps will only occur when the user releases the mouse button while dragging an item over a valid target.

**Interactive Demos**

The documentation includes two interactive demos that visually demonstrate the difference between "hover" and "drop" modes:

*   **First Demo (Hover):**  There are four slots labeled A, B, C, and D. When you drag an item and hover over another slot, they immediately swap places.
*   **Second Demo (Drop):** In this demo, dragging an item over another slot won't trigger a swap. The swap only happens when you release the mouse button, dropping the item onto the target slot.

**HTML Structure and Styling**

The HTML code also reveals some details about the structure and styling of the documentation page and the demos:

*   **Tailwind CSS:** The extensive use of utility classes (e.g., `w-full`, `mx-auto`, `pt-10`, `text-sm`, `font-semibold`, `dark:text-sky-400`) indicates that Tailwind CSS is being used for styling.
*   **Dark Mode Support:** The presence of `dark:` prefixed classes suggests that the documentation page supports a dark mode theme.
*   **Code Highlighting:** The `astro-code` classes and inline styles related to `--shiki-` variables suggest that a code highlighting library (likely Shiki) is being used to format the code examples.
*   **Astro Islands:** The `<astro-island>` tag, along with attributes like `component-url`, `renderer-url`, and `props`, indicate that this documentation is likely built using the Astro framework, and these are interactive components.

**Navigation**

The footer of the documentation includes:

*   **Previous/Next Links:** Links to navigate to other sections of the documentation ("Enabled" and "Auto-scroll on Drag").
*   **Copyright:** A copyright notice for Taha Shashtari, indicating the author of the library or documentation.

**Summary**

This documentation snippet effectively explains the "Swap Mode" feature, providing clear code examples, interactive demos, and links to related documentation. It highlights the use of Tailwind CSS, a code highlighter, and Astro Islands, giving insights into the technical implementation of the documentation page. This library seems to provide a simple yet flexible way to control drag-and-drop behavior, allowing developers to choose between immediate swapping on hover or a more controlled swap on drop.

This documentation excerpt describes how to enable or disable a Swapy instance, a JavaScript library for reordering elements on a webpage. Here's a breakdown:

**Core Concept: Enabling and Disabling Swapy**

*   **Default State:** A Swapy instance is enabled by default unless explicitly configured otherwise during initialization.
*   **Disabling:** You can disable an active Swapy instance using the `swapy.enable(false)` method. This prevents any further reordering actions.
*   **Enabling:** To re-enable a disabled instance, use `swapy.enable(true)`.

**Example**

```javascript
// Assuming you have initialized Swapy as 'swapy'

// Disable Swapy
swapy.enable(false);

// Re-enable Swapy
swapy.enable(true);
```

**Interactive Demo**

The documentation includes an interactive demo that visually demonstrates the enable/disable functionality.

*   **Checkbox:** A checkbox labeled "Enabled" controls the state of the Swapy instance in the demo.
*   **Visual Elements:** The demo contains four draggable elements (A, B, C, D) within a container.
    *   When "Enabled" is checked, you can drag and reorder these elements.
    *   When unchecked, the dragging functionality is disabled, and the elements remain fixed in their positions.

**Code Snippet Breakdown of the Demo**

*   **HTML Structure:**
    *   The demo uses `<div>` elements to represent the container and the draggable items.
    *   `data-swapy-slot` attributes define the slots where items can be placed.
    *   `data-swapy-item` attributes identify the individual draggable items.
*   **Astro-Island Component**
    *   Uses Astro components for dynamic hydration.
    *   `<astro-island>` tag defines a component that will be hydrated on the client-side.
    *   `props` attribute contains configuration for the `DocsDemo` component, including setting `addEnable` to `true`.
*   **JavaScript (within `astro-island`):**
    *   Handles the logic for enabling/disabling Swapy based on the checkbox state.
    *   The JavaScript likely interacts with the Swapy API to toggle the `enable` state.
*   **Styling (within `astro-island`):**
    *   CSS classes are used to style the container, items, and checkbox.

**Navigation**

The documentation includes "Previous" and "Next" navigation links:

*   **Previous:** "Manual Swap" - Likely refers to a documentation section explaining how to manually trigger reordering actions using Swapy's API.
*   **Next:** "Update" - Probably leads to a section describing how to update the Swapy instance or its configuration.

**Footer**

The footer contains copyright information and credits the author, Taha Shashtari.

**In Summary**

This documentation clearly explains the basic concept of enabling and disabling a Swapy instance. The interactive demo provides a practical illustration, allowing users to directly experience the effect of toggling the `enable` state. The navigation links suggest that this section is part of a larger documentation set covering various aspects of the Swapy library.

This documentation excerpt describes the `update()` method in the Swapy JavaScript library, which is crucial for managing dynamic changes within a Swapy container. Let's break down the key aspects:

**Core Concept: Re-instantiating Swapy**

-   **Dynamic DOM Updates:** When you add or remove items (elements that can be dragged and dropped) or slots (designated areas where items can be placed) within the Swapy container using JavaScript, the library doesn't automatically recognize these changes.
-   **The `update()` Method:** To inform Swapy about these modifications and ensure it continues to function correctly, you need to call the `swapy.update()` method. This essentially re-initializes the Swapy instance, allowing it to adapt to the altered DOM structure.

**How to Use `swapy.update()`**

The documentation provides a straightforward example using JavaScript functions:

```javascript
function afterAdd() {
  swapy.update()
}

function afterRemove() {
  swapy.update()
}
```

-   **`afterAdd()`:** This function is intended to be called after you've dynamically added new items or slots to the Swapy container. It invokes `swapy.update()` to refresh the Swapy instance.
-   **`afterRemove()`:** Similarly, this function should be executed after removing items or slots. It also calls `swapy.update()` to keep Swapy in sync with the DOM.

**Integration into Your Code**

1. **Event Handlers:** The most common way to use these functions is within event handlers that are triggered when you modify the DOM. For instance, if you have buttons to add or remove items, you would attach `afterAdd()` to the "add" button's click event and `afterRemove()` to the "remove" button's click event.

2. **Asynchronous Operations:** If you're making changes to the DOM based on asynchronous operations (e.g., fetching data from an API and then updating the container), make sure to call `swapy.update()` after the DOM has been successfully modified.

**Example Scenario: Adding an Item**

Let's imagine you have a button that, when clicked, adds a new item to your Swapy container. Here's how you might structure your code:

```javascript
// Assuming you have a button with id="addItemButton" and your Swapy instance is named "swapy"

const addItemButton = document.getElementById("addItemButton");

addItemButton.addEventListener("click", () => {
  // 1. Add the new item to the DOM (example using a template)
  const newItemTemplate = document.createElement("div");
  newItemTemplate.innerHTML = `<div class="item" data-swapy-item="new">New Item</div>`;
  const swapyContainer = document.querySelector(".items"); // Your Swapy container
  swapyContainer.appendChild(newItemTemplate.firstChild);

  // 2. Update Swapy
  swapy.update();
});
```

**Key Details and Additional Information**

-   **Vanilla (Dynamic) TypeScript Example:** The documentation links to a full example demonstrating dynamic updates in a vanilla TypeScript project. This can be a valuable resource for understanding the `update()` method in a more complete context.
-   **`astro-island` Component:** The provided HTML includes an `<astro-island>` component. This suggests that Swapy might be used within an Astro project. Astro is a modern static site generator. The `astro-island` component likely encapsulates the Swapy functionality and handles the client-side hydration (making the component interactive).
-   **Navigation:** The footer of the documentation suggests that this page is part of a larger set of documentation about Swapy, with links to pages explaining how to "Enable or Disable" and "Destroy" a Swapy instance.

**In essence, the `swapy.update()` method is a vital tool for ensuring that your Swapy instance remains synchronized with any dynamic changes you make to the structure of your Swapy container in the DOM. By calling `update()` after adding or removing elements, you guarantee that Swapy can continue to manage the drag-and-drop interactions correctly.**
