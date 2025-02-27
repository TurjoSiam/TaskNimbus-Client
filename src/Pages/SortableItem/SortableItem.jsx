import PropTypes from 'prop-types';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "8px",
        margin: "8px 0",
        backgroundColor: "#f4f4f4",
        borderRadius: "4px",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {task.name}
        </div>
    );
};

SortableItem.propTypes = {
    id: PropTypes.number,
    task: PropTypes.object
}