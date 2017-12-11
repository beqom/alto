---
title: "Button"
layout: "component"
menu:
  main:
    parent: "components"
---

## Design Guidelines

These are design guidelines

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus iste repellat fuga asperiores ea nemo possimus. Recusandae minima fuga in, nulla nemo consequatur, porro cumque libero. Temporibus aliquam, sed debitis.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus iste repellat fuga asperiores ea nemo possimus. Recusandae minima fuga in, nulla nemo consequatur, porro cumque libero. Temporibus aliquam, sed debitis.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus iste repellat fuga asperiores ea nemo possimus. Recusandae minima fuga in, nulla nemo consequatur, porro cumque libero. Temporibus aliquam, sed debitis.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus iste repellat fuga asperiores ea nemo possimus. Recusandae minima fuga in, nulla nemo consequatur, porro cumque libero. Temporibus aliquam, sed debitis.
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus iste repellat fuga asperiores ea nemo possimus. Recusandae minima fuga in, nulla nemo consequatur, porro cumque libero. Temporibus aliquam, sed debitis.


## Code & Examples

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
{{end}}
