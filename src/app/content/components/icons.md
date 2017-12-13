---
title: "Icons"
layout: "docs"
menu:
  docs:
    parent: "components"
---

{{< lead >}}
Alto uses Clarity Icons for its icon set.
{{< /lead >}}

## How to Use Clarity Icons

### Set icons

By default, the size for Clarity Icons is 16 by 16 pixels, and you have two ways of customizing this default value. One is through the use of the size attribute; the other is manually customizing the width and height values in your icon's style.

{{< example lang="markup" lang="markup" >}}
<!--A. SETTING THE SIZE THROUGH CLR-ICON SIZE ATTRIBUTE-->
<clr-icon shape="info-circle" size="12"></clr-icon>
<clr-icon shape="info-circle" size="16"></clr-icon>
<clr-icon shape="info-circle" size="36"></clr-icon>
<clr-icon shape="info-circle" size="48"></clr-icon>
<clr-icon shape="info-circle" size="64"></clr-icon>
<clr-icon shape="info-circle" size="72"></clr-icon>

<!--B. SETTING THE SIZE IN STYLE ATTRIBUTE-->
<clr-icon shape="info-circle" style="width: 12px; height: 12px;"></clr-icon>
<clr-icon shape="info-circle" style="width: 16px; height: 16px;"></clr-icon>
<clr-icon shape="info-circle" style="width: 36px; height: 36px;"></clr-icon>
<clr-icon shape="info-circle" style="width: 48px; height: 48px;"></clr-icon>
<clr-icon shape="info-circle" style="width: 64px; height: 64px;"></clr-icon>
<clr-icon shape="info-circle" style="width: 72px; height: 72px;"></clr-icon>
{{< /example >}}



## Color

{{< example lang="markup" >}}
<clr-icon shape="info-circle" size="48"></clr-icon>
<clr-icon shape="info-circle" size="48" class="is-highlight"></clr-icon>
<clr-icon shape="info-circle" size="48" class="is-error"></clr-icon>
<clr-icon shape="info-circle" size="48" class="is-warning"></clr-icon>
<clr-icon shape="info-circle" size="48" class="is-success"></clr-icon>
<clr-icon shape="info-circle" size="48" class="is-info"></clr-icon>
{{< /example >}}

## Display Variants
{{< example lang="markup" >}}
<clr-icon shape="user" size="48"></clr-icon>
<clr-icon shape="user" size="48" class="has-alert"></clr-icon>
<clr-icon shape="user" size="48" class="has-badge"></clr-icon>
<clr-icon shape="user" size="48" class="is-solid"></clr-icon>
<clr-icon shape="user" size="48" class="is-solid has-alert"></clr-icon>
<clr-icon shape="user" size="48" class="is-solid has-badge"></clr-icon>
<clr-icon shape="user" size="48" class="is-solid has-badge--success"></clr-icon>
{{< /example >}}

## Inverse
{{< example lang="markup" class="dark-background">}}
<clr-icon shape="info-circle" size="48" class="is-inverse"></clr-icon>
{{< /example >}}
