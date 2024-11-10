import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import * as Dialog from '@radix-ui/react-dialog';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'First Task', description: 'Description of first task', dueDate: '2024-11-30' },
    'task-2': { id: 'task-2', title: 'Second Task', description: 'Description of second task', dueDate: '2024-12-01' },
  },
  columns: {
    'column-1': { id: 'column-1', title: 'To Do', taskIds: ['task-1'] },
    'column-2': { id: 'column-2', title: 'In Progress', taskIds: ['task-2'] },
    'column-3': { id: 'column-3', title: 'Completed', taskIds: [] },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const savedData = localStorage.getItem('kanban-board-data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-board-data', JSON.stringify(data));
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  const addTask = () => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = { id: newTaskId, title: newTaskTitle, description: newTaskDescription, dueDate: newTaskDueDate };

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        'column-1': {
          ...data.columns['column-1'],
          taskIds: [...data.columns['column-1'].taskIds, newTaskId],
        },
      },
    };

    setData(newState);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-100 p-4 rounded-md shadow-md flex flex-col w-1/3"
                  >
                    <h2 className="text-2xl font-bold mb-2">{column.title}</h2>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="bg-white p-4 rounded-md shadow-md mb-2"
                          >
                            <h3 className="text-lg font-bold">{task.title}</h3>
                            <p>{task.description}</p>
                            <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Add Task
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed bg-white p-6 rounded-md shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="text-lg font-bold mb-4">Add Task</Dialog.Title>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className