import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { setTasks } from "@/redux/kanbanSlice";
import TaskModal from "@/components/taskModal";
import { Button } from "@/components/ui/button";

const KanbanBoard = () => {
  const tasks = useSelector((state) => state.kanban.tasks);
  const dispatch = useDispatch();
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const destinationDroppableId = result.destination.droppableId;

    // Clone the tasks array to avoid direct state mutation
    const updatedTasks = Array.isArray(tasks) ? [...tasks] : [];

    // Find the moved task
    const [movedTask] = updatedTasks.splice(sourceIndex, 1);
    movedTask.status = destinationDroppableId; // Update the status of the moved task

    // Insert the moved task into the new position
    updatedTasks.splice(destinationIndex, 0, movedTask);

    dispatch(setTasks(updatedTasks));
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  const handleSaveTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    dispatch(setTasks(updatedTasks));
    setTaskToEdit(null);
  };

  const handleAddTask = () => {
    setIsAddTaskModalOpen(true);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4">
        {["To Do", "In Progress", "Completed"].map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                className="w-1/3 p-4 bg-gray-100 rounded-lg justify-center"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-md font-bold mb-4">{status}</h2>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="mb-4 p-4 bg-white rounded-lg shadow-md"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onDoubleClick={() => handleEditTask(task)}
                        >
                          <h3 className="text-lg font-md">{task.title}</h3>
                          <p className="text-gray-600">{task.description}</p>
                          <p className="text-gray-400 text-sm">
                            {task.dueDate}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                <Button
                  className="justify-center w-full px-4 rounded mb-4 bg-white hover:bg-white shadow text-gray-600"
                  onClick={handleAddTask}
                >
                  + Add a new Task
                </Button>
              </div>
            )}
          </Droppable>
        ))}
      </div>
      {taskToEdit && (
        <TaskModal
          task={taskToEdit}
          onSave={handleSaveTask}
          onClose={() => setTaskToEdit(null)}
        />
      )}
      {isAddTaskModalOpen && (
        <TaskModal
          task={null}
          onSave={(newTask) => dispatch(setTasks([...tasks, newTask]))}
          onClose={() => setIsAddTaskModalOpen(false)}
        />
      )}
    </DragDropContext>
  );
};

export default KanbanBoard;
