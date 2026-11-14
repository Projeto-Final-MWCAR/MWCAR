import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortablePhoto({ photo, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`addcar-photo-thumb${isDragging ? " addcar-photo-dragging" : ""}`}
      {...attributes}
      {...listeners}
    >
      <img src={photo.preview} alt="Prévia do veículo" draggable={false} />
      <button
        type="button"
        className="addcar-photo-remove"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={() => onRemove(photo.id)}
        aria-label="Remover foto"
      >
        ×
      </button>
    </div>
  );
}