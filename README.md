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

Site publicado: **https://jmstudio-amber.vercel.app**. Projeto Vercel: `ogaitjunior-sudos-projects/jmstudio`. A variável `NEXT_PUBLIC_SITE_URL` está configurada somente em Production com esse endereço para os metadados canônicos.

O deploy de produção foi feito a partir deste diretório com `vercel deploy --prod`. O repositório GitHub `tidihunter40-hub/JMSTUDIO` não foi conectado à Vercel porque a conta autenticada não possui permissão de escrita nele. Até que essa permissão seja resolvida, atualizações precisam de novo deploy pela CLI. O build usa `npm run build` (Webpack), Node.js 24.x e o diretório de saída padrão do Next.js.

A PWA registra o service worker apenas em produção. O envio de orçamento abre o WhatsApp; não há banco de dados nem servidor de e-mail para configurar.

## Validação feita

O build de produção na Vercel passou. Home, Serviços, Contato, manifest, service worker e vídeo vertical responderam com HTTP 200 no endereço público. A navegação, o menu, o vídeo e o modo offline foram testados localmente; o layout publicado foi conferido em Chrome em celular e desktop simulados.
