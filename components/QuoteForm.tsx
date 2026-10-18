"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { services, whatsappUrl } from "@/content/site";

export function QuoteForm() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [project, setProject] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = `Olá, JMSTUDIO!\n\nMeu nome é ${name.trim()}.\nServiço: ${service}.\nProjeto: ${project.trim()}\n\nAguardo retorno!`;
    window.location.assign(whatsappUrl(message));
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <label htmlFor="quote-name">Seu nome</label>
      <input id="quote-name" name="name" autoComplete="name" required maxLength={80} placeholder="Como podemos chamar você?" value={name} onChange={e => setName(e.target.value)} />
      <label htmlFor="quote-service">Serviço desejado</label>
      <select id="quote-service" name="service" required value={service} onChange={e => setService(e.target.value)}>
        <option value="">Selecione um serviço</option>
        {services.map(item => <option key={item.title} value={item.title}>{item.title}</option>)}
      </select>
      <label htmlFor="quote-project">Conte sobre o projeto</label>
      <textarea id="quote-project" name="project" required maxLength={1200} rows={5} placeholder="O que você quer gravar, produzir ou finalizar?" value={project} onChange={e => setProject(e.target.value)} />
      <button className="button-primary form-submit" type="submit"><Send size={20} aria-hidden="true" /> Enviar solicitação pelo WhatsApp <ArrowUpRight size={19} aria-hidden="true" /></button>
      <p className="form-note">Sua mensagem abre no WhatsApp. Nenhum dado é salvo neste site.</p>
    </form>
  );
}
