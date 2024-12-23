This documentation section focuses on integrating the Swapy library into a React application. It outlines the proper way to initialize and manage a Swapy instance within a React component's lifecycle.

**Key Considerations for React Integration**

1. **Client-Side Library:** Swapy operates on the client side, meaning it interacts directly with the DOM. Therefore, you need to ensure that the DOM is fully loaded and the React component is mounted before attempting to create a Swapy instance.

2. **`useEffect` Hook:** The recommended way to handle this in React is to use the `useEffect` hook with an empty dependency array (`[]`). This ensures that the code inside `useEffect` runs only once after the initial render when the component is mounted.

3. **Component Unmounting:** It's crucial to clean up the Swapy instance when the component is unmounted to prevent memory leaks or unexpected behavior. You achieve this by returning a cleanup function from within the `useEffect` hook.

**Code Breakdown**

The provided React example demonstrates these concepts:

```jsx
import { createSwapy } from 'swapy'
import { useEffect, useRef } from 'react'

function App() {
  const swapy = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    // If container element is loaded
    if (container.current) {
      swapy.current = createSwapy(container.current)

      // Your event listeners
      swapy.current.onSwap((event) => {
        console.log('swap', event);
      })
    }

    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy()
    }
  }, [])

  return (
    <div ref={container}>

      <div data-swapy-slot="a">
        <div data-swapy-item="a">
          <div>A</div>
        </div>
      </div>

      <div data-swapy-slot="b">
        <div data-swapy-item="b">
          <div>B</div>
        </div>
      </div>

    </div>
  )
}
```

-   **`useRef` for Swapy Instance and Container:**
    -   `swapy`: Holds a reference to the Swapy instance. It's initialized to `null` and will be assigned the Swapy object later. Using `useRef` ensures that the Swapy instance persists across re-renders.
    -   `container`: Stores a reference to the DOM element that will act as the Swapy container. This is assigned using `ref={container}` in the JSX.

-   **`useEffect` Logic:**
    -   **Initialization:**
        -   `if (container.current)`: Checks if the container element has been rendered and is accessible.
        -   `swapy.current = createSwapy(container.current)`: Creates the Swapy instance, passing the container element as an argument. The instance is stored in `swapy.current`.
    -   **Event Listeners:**
        -   `swapy.current.onSwap((event) => { ... })`: Sets up an event listener for the `onSwap` event. This is where you would handle any logic that needs to occur when items are swapped.
    -   **Cleanup:**
        -   `return () => { swapy.current?.destroy() }`: This function is returned by `useEffect` and is executed when the component unmounts. `swapy.current?.destroy()` calls the `destroy()` method on the Swapy instance (if it exists) to properly clean it up.

-   **JSX Structure:**
    -   The JSX defines the structure of the Swapy container and its initial items and slots using `data-swapy-slot` and `data-swapy-item` attributes.

**How to Use in Your React Project**

1. **Installation:** Make sure you have the Swapy library installed in your project. You can likely install it using npm or yarn:
    ```bash
    npm install swapy
    # or
    yarn add swapy
    ```

2. **Import:** Import `createSwapy` from the Swapy library and `useEffect`, `useRef` from React at the top of your component file.

3. **Component Structure:** Create a functional component (like the `App` component in the example).

4. **Refs:** Use `useRef` to create references for the Swapy instance and the container element.

5. **`useEffect`:** Implement the `useEffect` hook as shown in the example to initialize Swapy after the component mounts and to destroy it when the component unmounts.

6. **JSX:** Define your Swapy container, slots, and items in your JSX using the `data-swapy-slot` and `data-swapy-item` attributes.

**Important Note about Dynamic Updates**

The documentation includes a warning:

> If your use case involves adding or removing slots and items, please check out the React (Dynamic) guide.

This implies that if you need to dynamically add or remove items or slots *after* the initial render, you'll need to use the `swapy.update()` method as explained in the "Update" documentation page. The basic React example provided here doesn't cover dynamic updates. You would likely need to combine the `update()` method with React's state management to handle dynamic changes effectively.

**In summary, this documentation provides a solid foundation for integrating Swapy into a basic React application where the structure of the Swapy container is static after the initial render. For dynamic scenarios, you'll need to consult the React (Dynamic) guide and utilize the `update()` method in conjunction with React state management.**
