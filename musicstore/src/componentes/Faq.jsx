import { useEffect, useRef } from "react"
import M from "materialize-css"
import "../styles/Faq.css"

const preguntas = [
  {
    pregunta: "¿Cuántos productos puedo agregar al carrito?",
    respuesta: "Hasta 10 unidades por producto y 30 artículos en total.",
  },
  {
    pregunta: "¿El pago es real?",
    respuesta: "No. El checkout es una simulación: no se cobra nada ni se guardan datos de tarjeta.",
  },
  {
    pregunta: "¿Necesito una cuenta para comprar?",
    respuesta: "Podés navegar el catálogo sin cuenta. Para guardar tus datos podés registrarte, y la cuenta queda guardada solo en tu navegador.",
  },
  {
    pregunta: "¿Cómo sé qué instrumento me conviene?",
    respuesta: "En Recomendaciones respondés unas preguntas sobre tu nivel, tipo de instrumento y presupuesto, y te sugerimos hasta 3 productos.",
  },
]

function Faq() {
  const ref = useRef(null)

  useEffect(() => {
    const instancia = M.Collapsible.init(ref.current)
    return () => instancia.destroy()
  }, [])

  return (
    <section className="faq">
      <h2>Preguntas frecuentes</h2>
      <ul className="collapsible" ref={ref}>
        {preguntas.map((p) => (
          <li key={p.pregunta}>
            <div className="collapsible-header">
              <i className="material-icons">help_outline</i>
              {p.pregunta}
            </div>
            <div className="collapsible-body">
              <span>{p.respuesta}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Faq