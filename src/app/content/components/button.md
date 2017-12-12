---
title: "Button"
layout: "docs"
menu:
  docs:
    parent: "components"
---
{{< lead >}}
Buttons allow an application to communicate action and direct user intent.
{{< /lead >}}

{{< hr-dg >}}

## Three different types

{{< button-three-types >}}

## Placement

There are two distinct patterns when it comes to the placement of a button.

Z-PATTERN and F-PATTERN


## Visual Style

### Border Radius

Alto buttons have a border radius of 3px;

### Size

Alto offers three button sizes:

- Small height of 24px
- Default height of 36px
- Large height of 48px

Small buttons are used in content areas where smaller buttons are needed to de-emphasize calls to action. This is especially true when multiple actions of equal importance are available.

Large buttons are reserved for use in websites and should not be used in application development.


### Primary Color

A primary color provides consistency across an application. It trains the user to look for that color when trying to find an action. Alto defaults to blue. This “action blue” can be found across all types of buttons, tabs, and other action-related components.

### Action-based Color

Different colors may be used based on the severity of an action’s result. For example, using a red button when “deleting” files indicates high severity.

{{< hr-ec >}}

Alto defines three button styles:

- **Solid**. A solid background with light text. These buttons are prominent on the page.
- **Outline**. A transparent background with colored border and text. On hover, the button fills with color.
- **Flat**. Text in Action Blue, used to indicate an action.

{{< demo >}}
<button class="button">Primary Action</button>
<button class="button button--outline">Secondary Action</button>
<button class="button button--flat">Tertiary Action</button>
{{< /demo >}}


## Base
{{< example lang="markup" >}}
<button class="button">Solid Button</button>
<button class="button button--success">Success</button>
<button class="button button--danger">Danger</button>
<button class="button" disabled>Disabled</button>
{{< /example >}}

## Sizes
{{< example lang="markup" >}}
<button class="button button--small">Small Button</button>
<button class="button">Default Button</button>
<button class="button button--large">Large Button</button>
{{< /example >}}

## Wrapping
{{< example lang="markup" >}}
<button style="width:200px" class="button button--small">Small Button with really long thext that should wrap</button>
<button style="width:200px" class="button">Default Button with really long thext that should wrap</button>
<button style="width:200px" class="button button--large">Large Button with really long thext that should wrap</button>
{{< /example >}}


## Outline
{{< example lang="markup" >}}
<button class="button button--outline">Ouline Button</button>
<button class="button button--outline button--success">Success</button>
<button class="button button--outline button--danger">Danger</button>
<button class="button button--outline" disabled>Disabled</button>
{{< /example >}}


## Flat

Flat buttons have less horizontal padding than other buttons, so they do not feel so far apart when placed inline.

{{< example lang="markup" >}}
<button class="button button--flat">Flat Button</button>
<button class="button button--flat button--success">Success</button>
<button class="button button--flat button--danger">Danger</button>
<button class="button button--flat" disabled>Disabled</button>
{{< /example >}}

## White
{{< example lang="markup" class="dark-background" >}}
<button class="button button--white">White Button</button>
<button class="button button--white button--outline">White Outline Button</button>
<button class="button button--white button--flat">White Flat Button</button>
{{< /example >}}
