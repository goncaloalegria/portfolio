import { Mail, MapPin, Linkedin, FileText, Github } from "lucide-react";

export default function Contact() {
  return (
    <section id="contacto" className="py-20 container mx-auto px-4 mb-20">
      <h2 className="text-3xl md:text-4xl font-audiowide text-accent mb-8 scan-effect">Contacto</h2>

      <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8">
        <div className="glass-panel p-8 rounded-2xl flex flex-col justify-center">
            <p className="text-lg text-muted mb-6">
                Queres falar sobre projetos, estágios ou colaboração? Manda mensagem.
            </p>
            <div className="flex gap-4">
                <a href="mailto:g.alegria.set@gmail.com" className="px-6 py-3 bg-accent/20 border border-accent/30 rounded-xl font-audiowide hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition flex items-center gap-2">
                    <Mail size={18} /> Enviar Email
                </a>
            </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl space-y-4">
            <div className="flex justify-between border-b border-accent/10 pb-2">
                <span className="text-muted">Email</span>
                <span className="text-text">g.alegria.set@gmail.com</span>
            </div>
            <div className="flex justify-between border-b border-accent/10 pb-2">
                <span className="text-muted">Local</span>
                <span className="text-text">Lisboa, PT</span>
            </div>
            
            <div className="flex gap-3 mt-6 pt-2">
                <a href="#" className="p-3 rounded-xl bg-panel border border-accent/10 hover:border-accent/50 hover:-translate-y-1 transition"><Github size={20} /></a>
                <a href="#" className="p-3 rounded-xl bg-panel border border-accent/10 hover:border-accent/50 hover:-translate-y-1 transition"><Linkedin size={20} /></a>
                <a href="#" className="p-3 rounded-xl bg-panel border border-accent/10 hover:border-accent/50 hover:-translate-y-1 transition" title="CV"><FileText size={20} /></a>
            </div>
        </div>
      </div>
    </section>
  );
}