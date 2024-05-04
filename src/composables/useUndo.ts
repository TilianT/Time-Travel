import { onMounted, onUnmounted } from 'vue';

export default function (timeTravel: () => void): void {
  /**
   * Calls the timeTravel function when CTRL+Z or Command+Z shortcut was pressed
   *
   * @param {event} event - Standard interface that represents an observable event
   *
   */
  const undoHandler = (event: KeyboardEvent) => {
    if (
      (event.ctrlKey && event.key === 'z') ||
      (event.metaKey && event.key === 'z')
    ) {
      timeTravel();
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', undoHandler);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', undoHandler);
  });
}
