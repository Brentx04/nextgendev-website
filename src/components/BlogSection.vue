<template>
  <section id="blog" class="blog">
    <div class="section-header">
      <p class="section-tag">{{ T.blog.tag }}</p>
      <h2 class="section-title">
        {{ T.blog.title }}&nbsp;<span class="gradient-text">{{ T.blog.titleHighlight }}</span>
      </h2>
    </div>

    <div class="blog-featured">
      <!-- Left: text -->
      <div class="blog-content">
        <span class="blog-cat">{{ T.blog.posts[0].cat }}</span>
        <h3 class="blog-title">{{ T.blog.posts[0].title }}</h3>
        <p class="blog-excerpt">{{ T.blog.posts[0].excerpt }}</p>

        <ul class="blog-highlights">
          <li v-for="point in T.blog.posts[0].highlights" :key="point">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            {{ point }}
          </li>
        </ul>

        <a :href="T.blog.posts[0].url" target="_blank" rel="noopener" class="blog-read-btn">
          <span class="btn-bg"></span>
          <span class="btn-content">
            {{ T.blog.readMore }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </a>
      </div>

      <!-- Right: decorative card -->
      <div class="blog-visual">
        <div class="blog-card-preview">
          <div class="card-bar"></div>
          <div class="card-tag">{{ T.blog.posts[0].cat }}</div>
          <div class="card-lines">
            <div class="line line--wide"></div>
            <div class="line line--wide"></div>
            <div class="line line--mid"></div>
          </div>
          <div class="card-table">
            <div class="table-row" v-for="row in previewRows" :key="row.label">
              <span class="row-label">{{ row.label }}</span>
              <span class="row-val" :style="{ width: row.w }"></span>
            </div>
          </div>
          <div class="card-cta-pill">{{ T.blog.readMore }} →</div>
        </div>
        <div class="blog-glow"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const previewRows = [
  { label: 'Landingspagina', w: '55%' },
  { label: 'Bedrijfswebsite', w: '72%' },
  { label: 'Webshop', w: '88%' },
  { label: 'Maatwerk app', w: '100%' },
]
</script>

<style scoped>
.blog {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.blog-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-top: 4rem;
  background: linear-gradient(135deg, rgba(124,58,237,0.06), rgba(236,72,153,0.03));
  border: 1px solid rgba(124,58,237,0.16);
  border-radius: 20px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.blog-featured::before {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%);
  pointer-events: none;
}

/* LEFT */
.blog-cat {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--purple-light);
  background: rgba(124,58,237,0.1);
  border: 1px solid rgba(124,58,237,0.25);
  border-radius: 20px;
  padding: 0.25rem 0.8rem;
  margin-bottom: 1.1rem;
}

.blog-title {
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 900;
  letter-spacing: -0.01em;
  color: var(--white);
  line-height: 1.25;
  margin-bottom: 1rem;
}

.blog-excerpt {
  font-size: 0.92rem;
  color: var(--grey);
  line-height: 1.75;
  margin-bottom: 1.4rem;
}

.blog-highlights {
  list-style: none;
  padding: 0;
  margin-bottom: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.blog-highlights li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.88rem;
  color: var(--grey);
}
.blog-highlights svg {
  width: 14px; height: 14px;
  color: var(--purple-light);
  flex-shrink: 0;
}

.blog-read-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  overflow: hidden;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
}
.blog-read-btn .btn-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--purple), #ec4899);
  transition: opacity 0.25s;
}
.blog-read-btn:hover .btn-bg { opacity: 0.85; }
.blog-read-btn .btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.8rem;
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--white);
}
.btn-content svg { width: 14px; height: 14px; }

/* RIGHT — decorative card */
.blog-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-glow {
  position: absolute;
  width: 280px; height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%);
  pointer-events: none;
}

.blog-card-preview {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 320px;
  background: linear-gradient(145deg, rgba(13,5,32,0.95), rgba(18,10,40,0.9));
  border: 1px solid rgba(124,58,237,0.25);
  border-radius: 14px;
  padding: 1.4rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.08);
}

.card-bar {
  height: 3px;
  background: linear-gradient(90deg, #7c3aed, #a78bfa, #ec4899);
  border-radius: 2px;
  margin-bottom: 1.1rem;
}

.card-tag {
  font-family: var(--font-display);
  font-size: 0.45rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--purple-light);
  margin-bottom: 0.8rem;
}

.card-lines {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1.2rem;
}
.line {
  height: 8px;
  border-radius: 4px;
  background: rgba(255,255,255,0.06);
}
.line--wide { width: 85%; }
.line--mid { width: 55%; }

.card-table {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1.2rem;
}
.table-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.row-label {
  font-size: 0.68rem;
  color: var(--grey);
  width: 110px;
  flex-shrink: 0;
}
.row-val {
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, rgba(124,58,237,0.5), rgba(236,72,153,0.3));
}

.card-cta-pill {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--purple-light);
  background: rgba(124,58,237,0.1);
  border: 1px solid rgba(124,58,237,0.25);
  border-radius: 20px;
  padding: 0.3rem 0.9rem;
}

/* Responsive */
@media (max-width: 900px) {
  .blog-featured {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }
  .blog-visual { display: none; }
}

@media (max-width: 768px) {
  .blog-featured {
    padding: 1.4rem;
    border-radius: 14px;
    margin-top: 2.5rem;
  }
  .blog-title {
    font-size: 1rem;
  }
  .blog-excerpt {
    font-size: 0.85rem;
  }
  .blog-highlights li {
    font-size: 0.82rem;
  }
  .blog-read-btn .btn-content {
    font-size: 0.58rem;
    padding: 0.75rem 1.4rem;
  }
}

@media (max-width: 480px) {
  .blog-featured { padding: 1.1rem; }
  .blog-title { font-size: 0.95rem; }
}
</style>
