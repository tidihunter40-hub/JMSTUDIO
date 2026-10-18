"use client";

import { useState } from "react";
import { ArrowUpRight, Play, Youtube } from "lucide-react";
import { portfolioVideos, site } from "@/content/site";

type Video = (typeof portfolioVideos)[number];

function PortfolioVideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <article className="video-card portfolio-video-card">
      <div className="portfolio-video-media">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={`Reproduzindo ${video.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            className="portfolio-play"
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Reproduzir ${video.title} nesta página`}
          >
            <img
              src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
              alt=""
              width="1280"
              height="720"
              loading="lazy"
              decoding="async"
            />
            <span className="portfolio-play-icon"><Play size={29} fill="currentColor" aria-hidden="true" /></span>
            <span className="portfolio-play-label">Reproduzir vídeo</span>
          </button>
        )}
      </div>
      <div className="portfolio-video-info">
        <h3>{video.title}</h3>
        {video.artist && <p>{video.artist}</p>}
        <a className="portfolio-watch-link" href={watchUrl} target="_blank" rel="noopener noreferrer">
          <span className="portfolio-youtube-mark" aria-hidden="true"><Play size={14} fill="currentColor" /></span>
          <span>Assistir no YouTube</span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function PortfolioSection() {
  return (
    <section className="content-section portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio-ambient-wave" aria-hidden="true">
        {Array.from({ length: 13 }, (_, index) => <span key={index} />)}
      </div>
      <div className="container-narrow portfolio-layout has-videos">
        <div className="section-intro portfolio-intro">
          <span className="eyebrow">Portfólio musical</span>
          <h2 id="portfolio-title"><span className="portfolio-title-main">A música</span><span className="portfolio-title-script">fala por si.</span></h2>
          <p>Conheça os projetos publicados no canal oficial do JMSTUDIO.</p>
          <a className="portfolio-channel-link" href={site.youtube} target="_blank" rel="noopener noreferrer">
            <span className="portfolio-youtube-mark" aria-hidden="true"><Play size={15} fill="currentColor" /></span>
            <span>Conhecer nosso canal</span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
        </div>
        {portfolioVideos.length > 0 ? (
          <div className="portfolio-grid">
            {portfolioVideos.map(video => <PortfolioVideoCard video={video} key={video.id} />)}
          </div>
        ) : (
          <div className="feature-panel portfolio-panel">
            <div className="play-ring"><Youtube size={62} strokeWidth={1.3} aria-hidden="true" /></div>
            <p>Produções e novidades no YouTube</p>
            <a href={site.youtube} target="_blank" rel="noopener noreferrer">Abrir canal oficial <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        )}
      </div>
    </section>
  );
}
