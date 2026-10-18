export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 32 32" role="img" aria-label="WhatsApp">
    <circle cx="16" cy="16" r="15" fill="#22c65b" stroke="#fff" strokeWidth="2" />
    <path d="M9.2 22.4l1-3.2a8 8 0 1 1 3.2 3.1l-4.2 1.1Z" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M12.5 12.3c.2-.4.5-.4.7-.4h.6c.2 0 .4.1.5.4l.8 1.7c.1.2.1.4-.1.6l-.6.7c.6 1.1 1.4 1.9 2.6 2.5l.7-.7c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.3.5l-.1.7c-.2.6-1 1.1-1.7 1.1-3.2-.2-6.3-3.3-6.6-6.5 0-.6.2-1 .6-1.3Z" fill="#fff" />
  </svg>;
}
