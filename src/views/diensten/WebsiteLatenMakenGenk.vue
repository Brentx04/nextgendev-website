<template>
  <div>
    <header class="article-hero">
      <p class="article-tag">// LOKAAL — GENK &amp; LIMBURG</p>
      <h1 class="article-title">Website laten maken in <span>Genk</span></h1>
      <p class="article-intro">
        Een lokale webdesigner die u persoonlijk kent en die uw markt begrijpt. Next Gen Codes is gevestigd in Genk en bouwt professionele websites voor ondernemers in heel Limburg — met vaste prijzen en persoonlijk contact.
      </p>
    </header>

    <article class="article-body">
      <h2>Waarom kiezen voor een lokale webdesigner uit Genk?</h2>
      <p>U kunt uw website laten maken door een groot, onpersoonlijk bureau in Brussel — of door iemand die in de buurt zit, snel bereikbaar is en uw bedrijf echt begrijpt. Als lokale partner bieden wij:</p>
      <ul>
        <li><strong>Persoonlijk contact</strong> — face-to-face afspraken in Genk of omgeving, geen callcenter</li>
        <li><strong>Snelle communicatie</strong> — korte lijnen, u praat rechtstreeks met de ontwikkelaar</li>
        <li><strong>Kennis van de lokale markt</strong> — we weten hoe Limburgse ondernemers klanten aantrekken</li>
        <li><strong>Lokale SEO</strong> — gevonden worden door klanten die "in uw buurt" zoeken</li>
      </ul>

      <h2>Voor welke ondernemers werken wij?</h2>
      <p>Van zelfstandigen en KMO's tot horeca, bouw, retail en dienstverleners — wij bouwen websites voor elk type onderneming in Genk, Hasselt, Maasmechelen, Bilzen en de rest van Limburg. Of u nu een eenvoudige presentatiesite of een volledige webshop nodig heeft, we starten altijd met een gratis gesprek.</p>

      <div class="callout">
        <p class="callout-title">📍 LOKAAL VINDBAAR WORDEN</p>
        <p>Wilt u bovenaan staan wanneer klanten "uw dienst + Genk" zoeken in Google? Wij optimaliseren uw website én uw Google Bedrijfsprofiel voor lokale zoekresultaten.</p>
      </div>

      <h2>Wat kost een website in Genk?</h2>
      <p>Onze prijzen zijn dezelfde, eerlijke richtprijzen ongeacht waar u zit: een landingspagina vanaf <strong>€199</strong>, een volledige bedrijfswebsite vanaf <strong>€399</strong>, en een webshop of maatwerk applicatie vanaf <strong>€599</strong>. Gebruik de <a href="/calculator/index.html">prijscalculator</a> voor een directe schatting.</p>

      <div class="article-cta">
        <h3>Laten we samenzitten</h3>
        <p>Plan een gratis, vrijblijvend gesprek — telefonisch of in persoon in Genk. Wij reageren binnen 24 uur.</p>
        <div class="cta-buttons">
          <a href="/#contact" class="btn-primary">CONTACT OPNEMEN</a>
          <a href="tel:+32472196739" class="btn-secondary">BEL +32 472 19 67 39</a>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'

const url = 'https://ngcodes.com/diensten/website-laten-maken-genk'
useHead({
  title: 'Website laten maken in Genk & Limburg | Next Gen Codes',
  link: [{ rel: 'canonical', href: url }],
  meta: [
    { name: 'description', content: 'Lokale webdesigner in Genk. Next Gen Codes maakt professionele websites voor ondernemers in Genk, Hasselt en heel Limburg. Persoonlijk contact, vaste prijzen, gratis offerte.' },
    { property: 'og:title', content: 'Website laten maken in Genk & Limburg' },
    { property: 'og:description', content: 'Lokale webdesigner in Genk. Professionele websites voor ondernemers in heel Limburg.' },
    { property: 'og:url', content: url },
  ],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Next Gen Codes',
      image: 'https://ngcodes.com/og-image.svg',
      url,
      email: 'daenenbrent@gmail.com',
      telephone: '+32472196739',
      priceRange: '€€',
      areaServed: ['Genk', 'Hasselt', 'Limburg', 'BE'],
      address: { '@type': 'PostalAddress', addressLocality: 'Genk', addressRegion: 'Limburg', addressCountry: 'BE' },
    }),
  }],
})
</script>
