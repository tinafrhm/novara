import { Configurator, MobileBar } from './components/Configurator'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PrintSheet } from './components/PrintSheet'
import { NovaraProvider } from './context'

export default function App() {
  return (
    <NovaraProvider>
      <div className="site no-print">
        <Header />
        <main>
          <Hero />
          <Features />
          <Configurator />
        </main>
        <Footer />
        <MobileBar />
      </div>
      <PrintSheet />
    </NovaraProvider>
  )
}
