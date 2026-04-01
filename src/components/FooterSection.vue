<template>
  <footer class="footer">
    <div class="footer-inner">
      <a href="#home" class="footer-logo" @click.prevent="scrollTop">
        <img src="/ngd-logo.png" alt="Next Gen Dev" class="footer-logo-img" />
      </a>
      <p class="footer-copy">© 2025 Next Gen Dev. Alle rechten voorbehouden. Met trots gemaakt in Genk, België.</p>
      <nav class="footer-links">
        <a href="#" @click.prevent="showPrivacy = true">Privacybeleid</a>
        <a href="#" @click.prevent="showTerms = true">Voorwaarden</a>
        <a href="https://www.linkedin.com/in/brent-d-9a4908331/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://www.instagram.com/brentx04/" target="_blank" rel="noopener">Instagram</a>
      </nav>
    </div>
    <div class="footer-line"></div>
  </footer>

  <!-- Privacybeleid modal -->
  <Transition name="fade">
    <div v-if="showPrivacy" class="terms-backdrop" @click.self="showPrivacy = false">
      <div class="terms-modal terms-modal--tall">
        <div class="terms-header">
          <p class="section-tag" style="margin:0">// PRIVACYBELEID</p>
          <button class="terms-close" @click="showPrivacy = false" aria-label="Sluiten">✕</button>
        </div>
        <div class="terms-body terms-scroll">
          <p class="terms-date">Laatste update: april 2025</p>

          <h3>1. Wie zijn wij?</h3>
          <p>Next Gen Dev is een digitaal bureau gevestigd in Genk, België. Wij zijn momenteel in oprichting en deze website heeft een demonstratief karakter. Contactpersoon: Brent Daenen — <a href="mailto:nextgendev28@gmail.com">nextgendev28@gmail.com</a>.</p>

          <h3>2. Welke gegevens verzamelen wij?</h3>
          <p>Via het contactformulier op deze website kunnen de volgende persoonsgegevens worden verzameld:</p>
          <ul>
            <li>Naam</li>
            <li>E-mailadres</li>
            <li>Inhoud van uw bericht</li>
            <li>Soort project (optioneel)</li>
          </ul>

          <h3>3. Waarvoor gebruiken wij uw gegevens?</h3>
          <p>Uw gegevens worden uitsluitend gebruikt om uw contactverzoek te beantwoorden. Wij verkopen, verhuren of delen uw gegevens nooit met derden voor commerciële doeleinden.</p>

          <h3>4. Hoe lang bewaren wij uw gegevens?</h3>
          <p>Uw gegevens worden bewaard zolang nodig om uw vraag te beantwoorden, en daarna verwijderd. Er is geen automatische langdurige opslag.</p>

          <h3>5. Cookies</h3>
          <p>Deze website maakt geen gebruik van tracking- of analytische cookies. Er worden geen persoonlijke gegevens automatisch opgeslagen bij een bezoek aan de site.</p>

          <h3>6. Derde partijen</h3>
          <p>Wij maken gebruik van <strong>EmailJS</strong> voor het verwerken van contactformulieren. EmailJS verwerkt uw gegevens uitsluitend om de e-mail te bezorgen en slaat deze niet op. Meer info: <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener">emailjs.com/legal/privacy-policy</a>.</p>

          <h3>7. Uw rechten (AVG/GDPR)</h3>
          <p>U heeft het recht op inzage, correctie en verwijdering van uw persoonsgegevens. Neem hiervoor contact op via <a href="mailto:nextgendev28@gmail.com">nextgendev28@gmail.com</a>.</p>

          <h3>8. Wijzigingen</h3>
          <p>Dit privacybeleid kan worden aangepast naarmate Next Gen Dev verder ontwikkelt. De meest recente versie is altijd beschikbaar op deze pagina.</p>

          <p class="terms-note">Vragen over dit beleid? Mail ons op <a href="mailto:nextgendev28@gmail.com">nextgendev28@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Voorwaarden modal -->
  <Transition name="fade">
    <div v-if="showTerms" class="terms-backdrop" @click.self="showTerms = false">
      <div class="terms-modal">
        <div class="terms-header">
          <p class="section-tag" style="margin:0">// ALGEMENE VOORWAARDEN</p>
          <button class="terms-close" @click="showTerms = false" aria-label="Sluiten">✕</button>
        </div>
        <div class="terms-body">
          <h3>Prototype — Geen actief bedrijf</h3>
          <p>
            Deze website is op dit moment een <strong>prototype</strong> en wordt uitsluitend gebruikt ter demonstratie
            van de diensten en het portfolio van Next Gen Dev.
          </p>
          <p>
            Next Gen Dev is momenteel <strong>geen officieel geregistreerd bedrijf</strong>. De bedrijfsaanvraag is
            lopende en de registratie is nog niet afgerond. Alle vermelde diensten, projecten en contactgegevens dienen
            enkel ter informatie en vormen geen bindende zakelijke overeenkomst.
          </p>
          <p>
            Zodra de bedrijfsregistratie is goedgekeurd, worden deze voorwaarden volledig bijgewerkt en is Next Gen Dev
            operationeel als officiële onderneming.
          </p>
          <p class="terms-note">
            Voor vragen kunt u contact opnemen via <a href="mailto:nextgendev28@gmail.com">nextgendev28@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

const showPrivacy = ref(false)
const showTerms = ref(false)

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
