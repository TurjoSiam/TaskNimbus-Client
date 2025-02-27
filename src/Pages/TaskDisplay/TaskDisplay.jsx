
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { SortableItem } from "../SortableItem/SortableItem";

const TaskDisplay = () => {

    const [tasks, setTasks] = useState([]);
  const [ws, setWs] = useState(null);

  // Fetch tasks from the server
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // Connect to WebSocket
  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8080");
    setWs(websocket);

    websocket.onmessage = (event) => {
      const change = JSON.parse(event.data);
      if (change.operationType === "update") {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === change.documentKey._id
              ? { ...task, ...change.updateDescription.updatedFields }
              : task
          )
        );
      }
    };

    return () => websocket.close();
  }, []);

  // Handle drag-and-drop
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task._id === active.id);
        const newIndex = tasks.findIndex((task) => task._id === over.id);
        const updatedTasks = arrayMove(tasks, oldIndex, newIndex);

        // Update the server
        fetch("http://localhost:5000/tasks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taskId: active.id,
            category: updatedTasks[newIndex].category,
            position: newIndex,
          }),
        });

        return updatedTasks;
      });
    }
  };

  // Group tasks by category
  const tasksByCategory = {
    Todo: tasks.filter((task) => task.status === "todo"),
    Ongoing: tasks.filter((task) => task.status === "on-process"),
    Completed: tasks.filter((task) => task.status === "completed"),
  };

  // Sensors for drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {Object.entries(tasksByCategory).map(([category, tasks]) => (
          <div
            key={category}
            style={{
              width: "30%",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h2>{category}</h2>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
              {tasks.map((task) => (
                <SortableItem key={task._id} id={task._id} task={task} />
              ))}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default TaskDisplay;