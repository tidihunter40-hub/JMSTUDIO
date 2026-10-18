# JMSTUDIO

Site institucional em Next.js, React, TypeScript e Tailwind CSS. Conteúdo gerenciado em `content/site.ts`, sem banco de dados.

## Rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para validar a versão de produção, rode `npm run build` e `npm start`.

## Conteúdo e arquivos

- `content/site.ts`: contato, serviços, vídeos, fotos e depoimentos. Adicione apenas material real/autorizado.
- `public/images/studio-hero.webp`: imagem ilustrativa gerada para o layout. Não representa as instalações reais.
- `public/images/simbolo-jmstudio.png`: reconstrução da marca a partir do flyer fornecido. Para fidelidade máxima, substitua pelo arquivo vetorial oficial quando disponível.
- `scripts/build-assets.py`: gera versões da marca e ícones de PWA a partir do símbolo.
- `reference/`: cópias do layout aprovado e do flyer recebido, para orientar futuras revisões.

O portfólio contém três vídeos identificados no canal oficial do YouTube em 18/10/2026. `studioPhotos` e `testimonials` começam vazios até que materiais reais sejam fornecidos.

## Publicação

Este projeto não foi publicado. Configure `NEXT_PUBLIC_SITE_URL` com o domínio final para o sitemap. A PWA registra o service worker apenas em produção.

## Validação feita

`npm run build` passou. Navegação, menu mobile e envio ao WhatsApp foram testados na prévia local. Manifesto, service worker, página offline, sitemap e robots responderam com HTTP 200. O layout foi conferido em larguras de desktop, tablet e celular.
