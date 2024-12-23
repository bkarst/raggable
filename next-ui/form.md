```html
Form
A form is a group of inputs that allows users to submit data to a server, with support for providing field validation errors.

Storybook
@nextui-org/form
Source
Styles source

Installation
CLI
npm
yarn
pnpm
bun

npx nextui-cli@latest add form

The above command is for individual installation only. You may skip this step if 
@nextui-org/react
 is already installed globally.

Import
Individual
Global

import {Form} from "@nextui-org/form";

Usage
Preview
Code

Anatomy
A 
Form
 is a container for input elements and submit/reset buttons, with support for validation messages. When labeled with 
aria-label
 or 
aria-labelledby
, it becomes a navigable 
form landmark
 for assistive technology.

Events
The 
onSubmit
 event will be triggered when a user submits the form with the 
Enter
 key or by pressing a submit button. The onReset event will be triggered when a user presses a reset button.

Preview
Code

Validation
Form
 supports native HTML constraint validation with customizable UI, custom validation functions, and server-side validation. Server-side validation errors can be provided via the 
validationErrors
 prop as an object mapping field names to error messages, which are cleared when the user modifies the field.

Preview
Code

See the 
Forms
 guide to learn more about form validation, including client-side validation, and integration with other frameworks and libraries.

Validation Behavior
Form
 validation uses ARIA attributes by default, but can be switched to native HTML validation by setting 
validationBehavior="native"
. ARIA validation shows realtime errors without blocking submission. This can be set at the form or field level.

Preview
Code

Accessibility
Built with a native HTML 
&lt;form&gt;
 element, with support for ARIA labelling to create a 
form landmark
.
Full support for browser features like form autofill.
Support for native HTML constraint validation with customizable UI, custom validation functions, realtime validation, and server-side validation errors.

API
Form Props
Prop
Type
Default
children
ReactNode
-
validationBehavior
'native' | 'aria'
"aria"
validationErrors
Record&lt;string, string | string[]&gt;
-
action
string | FormHTMLAttributes&lt;HTMLFormElement&gt;['action']
-
encType
'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
-
method
'get' | 'post' | 'dialog'
-
target
'_blank' | '_self' | '_parent' | '_top'
-
autoComplete
'off' | 'on'
-
autoCapitalize
'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'
-
className
string
-
style
CSSProperties
-
```
