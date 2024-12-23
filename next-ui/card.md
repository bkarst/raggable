```html
Card
Card is a container for text, photos, and actions in the context of a single subject.
Storybook
@nextui-org/card
Source
Styles source

Installation
Installation commands

CLI
npm
yarn
pnpm
bun

npx nextui-cli@latest add card

The above command is for individual installation only. You may skip this step if  is already installed globally.
Import
NextUI exports 4 card-related components:

Card: The main component to display a card.
CardHeader: Commonly used for the title of a card.
CardBody: The content of the card.
CardFooter: Commonly used for actions.

NextUI import commands
Individual
Global

Usage
Code demo tabs
Preview
Code

Make beautiful websites regardless of your design experience.
With Divider
Code demo tabs
Preview
Code

NextUI
nextui.org

Make beautiful websites regardless of your design experience.
Visit source code on GitHub.

See the Divider component for more details.
With Image
Code demo tabs
Preview
Code

Daily Mix
12 Tracks
Frontend Radio

Blurred Footer
You can pass the `isFooterBlurred` prop to the card to blur the footer.
Code demo tabs
Preview
Code

Available soon.
Notify me

Composition
You can use other NextUI components inside the card to compose a more complex card.
Code demo tabs
Preview
Code

Zoey Lang
@zoeylang
Follow

Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
#FrontendWithZoey💻

4
Following

97.1K
Followers

Blurred Card
You can pass the `isBlurred` prop to the card to blur the card. Card gets blurred properties based on its ancestor element.

Note: To achieve the blur effect as seen in the preview, you need to provide a suitable background (e.g., `bg-gradient-to-tr from-[#FFB457] to-[#FF705B]`) to an ancestor element of the Card component allowing the Card's blur effect to be visible.
Code demo tabs
Preview
Code

Daily Mix
12 Tracks
Frontend Radio

1:23
4:32

Primary Action
If you pass the `isPressable` prop to the card, it will be rendered as a button.
Code demo tabs
Preview
Code

Orange
$5.50
Tangerine
$3.00
Raspberry
$10.00
Lemon
$5.30
Avocado
$15.70
Lemon 2
$8.00
Banana
$7.50
Watermelon
$12.20

Note: that the used callback function is `onPress` instead of `onClick`. Please see the usePress component for more details.
Cover Image
You can use `Image` component as the cover of the card by taking it out of the `CardBody` component.
Code demo tabs
Preview
Code

What to watch
Stream the Acme event

Plant a tree
Contribute to the planet

Supercharged
Creates beauty like a beast

New
Acme camera

Available soon.
Get notified.
Notify Me

Your day your way
Your checklist for better sleep

Breathing App
Get a good night's sleep.
Get App

Slots

base:
The main container of the card, where the header, body, and footer are placed.
header:
The header of the card, usually used for the title.
body:
The body of the card, where the main content is placed.
footer:
The footer of the card, usually used for actions.

Data Attributes
`Card` has the following attributes on the `base` element:

data-hover:
When the card is being hovered. Based on useHover
data-focus:
When the card is being focused. Based on useFocusRing.
data-focus-visible:
When the card is being focused with the keyboard. Based on useFocusRing.
data-disabled:
When the card is disabled. Based on `isDisabled` prop.
data-pressed:
When the card is pressed. Based on usePress

API
Card Props
Prop
Type
Default

`children`
ReactNode | ReactNode[]
—

`shadow`
none | sm | md | lg
"md"

`radius`
none | sm | md | lg
"lg"

`fullWidth`
boolean
false

`isHoverable`
boolean
false

`isPressable`
boolean
false

`isBlurred`
boolean
false

`isFooterBlurred`
boolean
false

`isDisabled`
boolean
false

`disableAnimation`
boolean
false

`disableRipple`
boolean
false

`allowTextSelectionOnPress`
boolean
false

`classNames`
Partial&lt;Record&lt;'base' | 'header' | 'body' | 'footer', string&gt;&gt;
—

Card Events
Prop
Type
Default

`onPress`
(e: PressEvent) =&gt; void
—

`onPressStart`
(e: PressEvent) =&gt; void
—

`onPressEnd`
(e: PressEvent) =&gt; void
—

`onPressChange`
(isPressed: boolean) =&gt; void
—

`onPressUp`
(e: PressEvent) =&gt; void
—
```