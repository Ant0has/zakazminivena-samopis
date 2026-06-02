// Самолётик Telegram (без обводки круга — круглый фон даёт кнопка).
export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.93 4.21 2.6 11.66c-1.32.51-1.31 1.27-.24 1.6l4.95 1.55 11.46-7.23c.54-.33 1.03-.15.63.21l-9.28 8.39h-.01l.01.01-.34 5.1c.5 0 .72-.23 1-.5l2.4-2.34 4.99 3.69c.92.51 1.58.24 1.81-.85L24 5.92c.34-1.36-.51-1.97-1.7-1.71l-.37.02z" />
    </svg>
  );
}

// MAX — простая буква «M» жирная (круг даёт фон кнопки).
export function MaxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <text
        x="12"
        y="18"
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        M
      </text>
    </svg>
  );
}
