import React, { useState } from 'react';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Using XMLHttpRequest to avoid any potential 'fetch' polyfill/getter issues in the environment
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://formspree.io/f/xgolrqyz');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      
      if (xhr.status === 200) {
        setStatus('success');
        form.reset();
      } else {
        console.error('Formspree error:', xhr.status, xhr.responseText);
        setStatus('error');
      }
    };
    
    xhr.onerror = () => {
      setStatus('error');
    };

    xhr.send(JSON.stringify(data));
  };

  return (
    <section className="bg-stone-900 text-stone-100 py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Lado Izquierdo: Información */}
        <div>
          <span className="text-green-500 text-xs tracking-widest font-bold uppercase mb-4 block">Contacto</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Únete a la <br/> Revolución Textil.
          </h2>
          <p className="text-stone-400 mb-8 font-light">
            ¿Eres una cooperativa, marca de moda o inversor? Estamos listos para escalar el impacto del algodón nativo.
          </p>
          
          <div className="space-y-4 text-sm text-stone-300">
            <p>📍 Lambayeque, Perú</p>
            <p>✉️ contacto@vantage-peru.com</p>
          </div>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="bg-stone-800/50 p-8 rounded-2xl border border-stone-700">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-in">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-serif text-white mb-2">¡Mensaje Recibido!</h3>
              <p className="text-stone-400">Gracias por contactar a VANTAGE. Te responderemos pronto.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-green-400 hover:text-green-300 underline text-sm"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Nombre */}
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-stone-500 mb-1 uppercase">Nombre</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  required
                  className="w-full bg-transparent border-b border-stone-600 focus:border-green-500 text-white py-2 outline-none transition-colors"
                  placeholder="Tu nombre o empresa"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-stone-500 mb-1 uppercase">Correo Electrónico</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  required
                  className="w-full bg-transparent border-b border-stone-600 focus:border-green-500 text-white py-2 outline-none transition-colors"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-stone-500 mb-1 uppercase">Mensaje</label>
                <textarea 
                  name="message" 
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-stone-600 focus:border-green-500 text-white py-2 outline-none transition-colors resize-none"
                  placeholder="¿Cómo podemos colaborar?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full bg-stone-100 text-stone-900 font-bold py-3 px-6 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje →'}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-xs text-center mt-2">Hubo un error. Por favor intenta de nuevo.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
