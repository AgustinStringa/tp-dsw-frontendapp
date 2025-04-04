export const SoundUtils = {
  notification: () => {
    const audio = new Audio('../../../assets/notification.mp3');
    audio.preload = 'auto';
    audio.volume = 0.3;
    audio.play().catch((error) => {
      console.error('Error al reproducir notificación:', error);
    });
  },

  sendMessage: () => {
    const audio = new Audio('../../../assets/sendMessage.mp3');
    audio.preload = 'auto';
    audio.volume = 0.3;
    audio.play().catch((error) => {
      console.error('Error al reproducir mensaje enviado:', error);
    });
  },
};
