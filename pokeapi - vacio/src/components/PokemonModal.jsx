// TODO: Tarea 6 - PokemonModal Component
// Ver TASKS.md para código de ejemplo

export default function PokemonModal({ pokemon, isOpen, onClose }) {
  if (!isOpen || !pokemon) {
    return null;
  }

  return (
    <dialog className="modal" open>
      {/* Contenido del modal */}
    </dialog>
  );
}
