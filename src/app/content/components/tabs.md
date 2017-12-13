---
title: "Tabs"
layout: "docs"
menu:
  docs:
    parent: "components"
---

{{< lead >}}
Tabs divide content into separagate views which users navigate between.
{{< /lead >}}

{{< hr-ec >}}

## Simple Tabs

The following is a static example of tabs with their associated sections. You cannot switch between tabs in this static demo because it does not contain the JavaScript to handle this behavior.

The active tab should have the additional class `active`. The stylesheet will hide all the section elements where attribute `aria-hidden` is set to `true`.

<div>
<ul class="tabs" role="tablist">
  <li class="tabs__tab" role="presentation">
    <a id="tab1" class="tabs__link" type="button"
            aria-controls="panel1" aria-selcted="false">Home</a>
  </li>
  <li class="tabs__tab" role="presentation">
    <a id="tab2" class="tabs__link tabs__link--active" type="button"
            aria-controls="panel2" aria-selected="true">Docs</a>
  </li>
  <li class="tabs__tab" role="presentation">
    <a id="tab3" class="tabs__link" type="button"
            aria-controls="panel3" aria-selcted="false">Releases</a>
  </li>
</ul>
</div>

You cannot switch between tabs in this static demo because it does not contain the JavaScript to handle this behavior. The demo is here to show the look of tabs and the DOM structure.

{{< code lang="markup" >}}
<ul class="tabs" role="tablist">
  <li class="tabs__tab" role="presentation">
    <a href="#panel1" id="tab1" class="tabs__link" type="button"
       aria-controls="panel1" aria-selcted="false">Home</a>
  </li>
  <li class="tabs__tab" role="presentation">
    <a href="#panel2" id="tab2" class="tabs__link tabs__link--active" type="button"
       aria-controls="panel2" aria-selected="true">Docs</a>
  </li>
  <li class="tabs__tab" role="presentation">
    <a href="#panel3" id="tab3" class="tabs__link" type="button"
       aria-controls="panel3" aria-selcted="false">Releases</a>
  </li>
</ul>
<section id="panel1" role="tabpanel" aria-labelledby="tab1">
  ...
</section>
<section id="panel2" role="tabpanel" aria-labelledby="tab2">
  ...
</section>
<section id="panel3" role="tabpanel" aria-labelledby="tab3">
  ...
</section>
{{< /code >}}

### Accessibility

The active tab should have the attribute `aria-selected` set to `true`, and the others to `false`.

The active panel associated with the active tab should have the attribute `aria-hidden` set to `true`, and the others to `false`.

In addition, each tab should have an aria-controls attribute set to the id of the matching panel and each panel should have an `aria-labelledby` attribute set to the id of the tab associated with the panel.

{{< example lang="markup" >}}
<ul class="tabs" role="tablist">
  <li class="tabs__tab" role="presentation">
    <a href="#" class="tabs__link">
      Home
    </a>
  </li>
  <li class="tabs__tab" role="presentation">
    <a href="#" class="tabs__link tabs__link--active">
      Docs
    </a>
  </li>
  <li class="tabs__tab" role="presentation">
    <a href="#" class="tabs__link">
      Releases
    </a>
  </li>
  <li class="tabs__tab" role="presentation">
    <a href="#" class="tabs__link">
      Storybook
    </a>
  </li>
</ul>


{{< /example >}}

## Panel Tabs


{{< example lang="markup" >}}
<ul class="tabs tabs--panel tabs--border-radius-content">
  <li class="tabs__tab">
    <a href="#" class="tabs__link tabs__link--panel">
      Tab
    </a>
  </li>
  <li class="tabs__tab">
    <a href="#" class="tabs__link tabs__link--panel tabs__link--active">
      Active Tab
    </a>
  </li>
  <li class="tabs__tab">
    <a href="#" class="tabs__link tabs__link--panel">
      Tab
    </a>
  </li>
  <li class="tabs__tab">
    <a href="#" class="tabs__link tabs__link--panel">
      Tab
    </a>
  </li>
</ul>
<div class="example-tabbed-content p-around--large">
  I'm tabbed content.
</div>
{{< /example >}}


{{< hr-dg >}}

## Usage
Use tabs for alternate views within the sidenav or main content area.

Don’t use tabs to break user interactions into a series of steps. Serial workflows are best presented in a wizard.

Avoid using tabs in cards and modals.

## Presentation

Tabs appear in a single, non-scrollable row, above their content. The width of each tab is dependent on its label.

To ensure that all tabs appear in the container, avoid using more than seven tabs and limit labels to one or two words.

## Content

While the content within tabs is flexible, follow these guidelines for organization and presentation:

- Ensure that the content in each view is independent of the content in other views.
Don’t force users to navigate back and forth to compare data–keep such content in the same view.
- Avoid cross-linking between tabs.
- If the content within a view is broad, divide it into subsections.

## Labels

- Ensure that the labels show a clear relationship between views.
- Favor nouns over verbs, for example, Settings, Permissions, and Performance.
- Avoid generic labels such as General or Advanced.
- Use title-style caps.
- Avoid using icons in labels.
