---
title: "Sidenav"
layout: "docs"
menu:
  docs:
    parent: "components"
---

{{< example lang="markup" >}}
<aside class="sidenav">
  <header class="sidenav__header">
    <a class="sidenav__logo" href="#">
      LOGO
    </a>
    <a class="sidenav__logo sidenav__logo--narrow" href="#">
      L
    </a>
    <button class="button button--outline button--white">Menu</button>
  </header>
  <ul class="sidenav__sections-list">{this.renderNavItems()}</ul>
  <ul class="sidenav__sections-list-narrow", { open })} aria-hidden={!open}>
    {this.renderNavItems()}
  </ul>
  <button
    class={bemClass(
      'sidenav__icon-container',
      { reverse: collapsed },
      'sidenav__toggle-button'
    )}
    onClick={this.handleToggle}
    aria-expanded={collapsed}
  >
    <ArrowLeftIcon />
    <VisuallyHidden>{collapsed ? expandButtonLabel : collapseButtonLabel}</VisuallyHidden>
  </button>
</aside>
{{< /example >}}
