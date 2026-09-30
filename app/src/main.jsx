import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './additions.css'
import './programs.css'
import './site.js'
import HeroShaderBg from './components/HeroShaderBg.jsx'
import AmbientShaderBg from './components/AmbientShaderBg.jsx'
import ShaderBoundary from './components/ShaderBoundary.jsx'
import Footer from './components/Footer.jsx'

// The page markup lives in index.html; React only renders these islands.
function mount(el, node) {
  createRoot(el).render(<StrictMode>{node}</StrictMode>)
}

const ambient = document.createElement('div')
document.body.prepend(ambient)
mount(ambient, <ShaderBoundary><AmbientShaderBg /></ShaderBoundary>)

mount(document.getElementById('hero-shader'), <ShaderBoundary><HeroShaderBg /></ShaderBoundary>)
mount(document.getElementById('footer-root'), <Footer />)
