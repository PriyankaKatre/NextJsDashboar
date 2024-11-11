import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "@/redux/kanbanSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/kanbanSlice";

const TaskModal = ({ task, onSave, onClose }) => {
  const [taskData, setTaskData] = useState(
    task || { title: "", description: "", dueDate: "", status: "To Do" }
  );
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.kanban.tasks);

  useEffect(() => {
    setTaskData(
      task || { title: "", description: "", dueDate: "", status: "To Do" }
    );
  }, [task]);

  const handleSubmit = () => {
    const updatedTasks = task
      ? tasks.map((t) => (t.id === task.id ? { ...t, ...taskData } : t))
      : [...tasks, { ...taskData, id: Date.now().toString() }];

    dispatch(setTasks(updatedTasks));
    onSave(taskData);
    onClose();
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Content className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-md relative w-full max-w-md mx-auto">
          <Dialog.Close className="absolute top-2 right-2 text-white rounded-full p-1">
            X
          </Dialog.Close>
          <h2 className="text-2xl font-bold mb-2">
            {task ? "Edit Task" : "Add New Task"}
          </h2>
          <p className="text-sm mb-4 text-gray-400">
            {task
              ? "Update details for task below"
              : "Please enter the details for the new task below"}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex items-center mb-4">
              <Label className="w-1/3 font-medium">Title</Label>
              <Input
                type="text"
                value={taskData.title}
                onChange={(e) =>
                  setTaskData({ ...taskData, title: e.target.value })
                }
                placeholder="Title"
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <Label className="w-1/3 font-medium">Description</Label>
              <Textarea
                value={taskData.description}
                onChange={(e) =>
                  setTaskData({ ...taskData, description: e.target.value })
                }
                placeholder="Description"
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <Label className="w-1/3 font-medium">Due Date</Label>
              <Input
                type="date"
                value={taskData.dueDate}
                onChange={(e) =>
                  setTaskData({ ...taskData, dueDate: e.target.value })
                }
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <Label className="w-1/3 font-medium">Status</Label>
              <select
                value={taskData.status}
                onChange={(e) =>
                  setTaskData({ ...taskData, status: e.target.value })
                }
                className="mb-4 p-2 border border-gray-300 rounded w-full"
                required
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="w-1/2 float-end">
              <div className="flex justify-end gap-2">
                <Dialog.Close>
                  <Button
                    type="button"
                    className="px-4 py-2 rounded w-full bg-transparent hover:bg-transparent text-black"
                  >
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button
                  type="submit"
                  className="text-white px-4 py-2 rounded w-full bg-gray-700"
                >
                  {task ? "Save Task" : "Add Task"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TaskModal;
