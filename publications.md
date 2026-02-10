---
layout: default
title: Publications
permalink: /publications/
---
<section class="hero">
  <div class="section-heading">
    <div>
      <p class="badge">Publications</p>
      <h1>Recent highlights</h1>
      <p class="muted">Selected publications from the Making Programming Simple Lab.</p>
    </div>
    <a href="{{ '/publications/papers' | relative_url }}">PDF repository</a>
  </div>
</section>

<div class="pub-list">
  {% bibliography --query @* %}
</div>
