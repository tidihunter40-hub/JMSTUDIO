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

O projeto está pronto para importar na Vercel a partir do repositório GitHub `tidihunter40-hub/JMSTUDIO`:

1. Em **Add New → Project**, selecione o repositório `JMSTUDIO`.
2. Mantenha **Framework Preset: Next.js** e **Root Directory: `./`**. A Vercel usará `npm run build` (Webpack) e o diretório de saída padrão do Next.js; não é preciso configurar um Output Directory.
3. Faça o deploy. Nenhuma variável de ambiente é obrigatória. A URL do próprio deployment será usada nos metadados e no sitemap.
4. Se conectar um domínio próprio, defina `NEXT_PUBLIC_SITE_URL` com a URL completa (por exemplo, `https://www.seu-dominio.com.br`) **somente no ambiente Production** e faça um novo deploy. Assim, os previews continuam usando seus próprios endereços.

O projeto usa Node.js 24.x e o lockfile do npm. A PWA registra o service worker apenas em produção. O envio de orçamento abre o WhatsApp; não há banco de dados nem servidor de e-mail para configurar.

## Validação feita

`npm run build` passou. Navegação, menu mobile e envio ao WhatsApp foram testados na prévia local. Manifesto, service worker, página offline, sitemap e robots responderam com HTTP 200. O layout foi conferido em larguras de desktop, tablet e celular.
