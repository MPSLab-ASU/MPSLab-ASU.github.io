---
layout: default
title: Research
permalink: /research/
---
<section class="hero">
  <div class="section-heading">
    <div>
      <p class="badge">Research Areas</p>
      <h1>Where we innovate</h1>
      <p class="muted">Explore our core thrusts in safe autonomy, dependable compilers, and efficient edge intelligence.</p>
    </div>
  </div>

  <div class="cards">
    {% for topic in site.research %}
      <div class="card">
        <h3><a href="{{ topic.url | relative_url }}">{{ topic.title }}</a></h3>
        <p class="muted">{{ topic.summary }}</p>
        <a class="badge" href="{{ topic.url | relative_url }}">View topic</a>
      </div>
    {% endfor %}
  </div>
</section>
