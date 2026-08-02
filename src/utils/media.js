export const resolveUploadUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;

  const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
  const origin = apiBase.replace(/\/api\/?$/, '');
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
};

export const playAudioUrl = (url, onError) => {
  const resolved = resolveUploadUrl(url);
  if (!resolved) {
    onError?.('Audio not available');
    return null;
  }
  const audio = new Audio(resolved);
  audio.onerror = () => onError?.('Failed to play audio');
  audio.play().catch(() => onError?.('Failed to play audio'));
  return audio;
};
