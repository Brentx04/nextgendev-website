<template>
  <canvas ref="canvasRef" class="circuit-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animId = null
let nodes = []
let particles = []
let resizeHandler = null

function buildNodes(canvas) {
  nodes = []
  const cols = Math.ceil(canvas.width / 120) + 1
  const rows = Math.ceil(canvas.height / 120) + 1
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.45) {
        nodes.push({
          x: c * 120 + (Math.random() * 40 - 20),
          y: r * 120 + (Math.random() * 40 - 20),
          r: Math.random() * 2 + 1,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.02,
        })
      }
    }
  }
}

function buildParticles() {
  particles = []
  for (let i = 0; i < 18; i++) {
    const src = nodes[Math.floor(Math.random() * nodes.length)]
    const dst = nodes[Math.floor(Math.random() * nodes.length)]
    if (src && dst && src !== dst) {
      particles.push({ sx: src.x, sy: src.y, ex: dst.x, ey: dst.y, t: Math.random(), speed: 0.003 + Math.random() * 0.004 })
    }
  }
}

function draw(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.lineWidth = 0.6
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x
      const dy = nodes[j].y - nodes[i].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        const alpha = (1 - dist / 150) * 0.25
        ctx.strokeStyle = `rgba(124,58,237,${alpha})`
        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        const midX = nodes[i].x + (Math.random() > 0.5 ? dx : 0)
        ctx.lineTo(midX, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.stroke()
      }
    }
  }

  nodes.forEach(n => {
    n.pulse += n.speed
    const glow = (Math.sin(n.pulse) + 1) * 0.5
    ctx.beginPath()
    ctx.arc(n.x, n.y, n.r * (1 + glow * 0.5), 0, Math.PI * 2)
    ctx.fillStyle = `rgba(167,139,250,${0.3 + glow * 0.4})`
    ctx.fill()
    ctx.beginPath()
    ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(167,139,250,${0.05 + glow * 0.1})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  })

  particles.forEach(p => {
    p.t += p.speed
    if (p.t >= 1) {
      const src = nodes[Math.floor(Math.random() * nodes.length)]
      const dst = nodes[Math.floor(Math.random() * nodes.length)]
      if (src && dst && src !== dst) { p.sx = src.x; p.sy = src.y; p.ex = dst.x; p.ey = dst.y }
      p.t = 0
    }
    const x = p.sx + (p.ex - p.sx) * p.t
    const y = p.sy + (p.ey - p.sy) * p.t
    const alpha = Math.sin(p.t * Math.PI)
    ctx.beginPath()
    ctx.arc(x, y, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(192,132,252,${alpha * 0.9})`
    ctx.fill()
  })

  animId = requestAnimationFrame(() => draw(canvas, ctx))
}

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  resizeHandler = () => {
    cancelAnimationFrame(animId)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    buildNodes(canvas)
    buildParticles()
    draw(canvas, ctx)
  }

  window.addEventListener('resize', resizeHandler)
  resizeHandler()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resizeHandler)
})
</script>
