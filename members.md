---
layout: default
title: Members
permalink: /members/
---
<section class="hero">
  <div class="section-heading">
    <div>
      <p class="badge">People</p>
      <h1>Our lab family</h1>
      <p class="muted">Meet the researchers building dependable, energy-efficient computing at ASU.</p>
    </div>
  </div>
</section>

{% assign grouped = site.data.members | group_by: "degree" %}
{% for group in grouped %}
  <div class="member-header">{{ group.name }}</div>
  <div class="cards">
    {% for member in group.items %}
      <div class="card bio">
        <div>
          <strong>{{ member.name }}</strong><br>
          <span class="muted">{{ member.role }}</span>
        </div>
        <div>{{ member.bio }}</div>
        <div class="chips">
          {% assign tags = member.focus | split: ',' %}
          {% for tag in tags %}
            <span class="chip">{{ tag | strip }}</span>
          {% endfor %}
        </div>
      </div>
    {% endfor %}
  </div>
{% endfor %}
