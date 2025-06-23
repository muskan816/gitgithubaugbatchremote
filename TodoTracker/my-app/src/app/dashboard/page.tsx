"use client";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiTrash, FiEdit } from "react-icons/fi";
import { CgColorPicker } from "react-icons/cg";
import { RiPushpinLine, RiUnpinLine } from "react-icons/ri";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import Modal from "@/components/Modal";
import EditTask from "@/components/EditTask";
import TodayTasks from "@/components/Today";
import Completed from "@/components/Completed";
import MentorCallModal from "@/components/MentorCallModal";
import MentorCallsTab from "@/components/MentorCalls";
import ColorPicker from "@/components/ColorPicker";
import Zoom from "@/components/Zoom";

export interface Task {
  _id: string;
  taskName: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
  color?: string;
  pinned?: boolean;
}

interface MentorCall {
  id: number;
  dueDate: string;
  description: string;
}

const Page = () => {
  const [sideBar, setSidebar] = useState(false);
  const [activeLink, setActiveLink] = useState("allTasks");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [mentorCalls, setMentorCalls] = useState<MentorCall[]>([]);

  const [newTask, setNewTask] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showMentorCall, setShowMentorCall] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [mentorDescription, setMentorDescription] = useState("");

  const [errors, setErrors] = useState({ taskName: false, priority: false });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  const [colorPicker, setColorPicker] = useState("");
  const [color, setColor] = useState("#172554");
  const colourOptions = [
    "#172554",
    "#4338ca",
    "#0d9488",
    "#334155",
    "#6b21a8",
    "#d97706",
    "#059669",
    "#374151",
    "#e11d48",
  ];

  const [zoom, setZoom] = useState<Task | null>(null);

  const isMentorCallTab = activeLink === "mentorCalls";
  const buttonText = isMentorCallTab ? "Record Call Notes" : "Add New Task";
  const handleAddClick = isMentorCallTab
    ? () => setShowMentorCall(true)
    : () => setNewTask(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        }
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchTasks();
  }, []);

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasError = {
      taskName: taskName.trim() === "",
      priority: priority === "",
    };
    setErrors(hasError);

    if (!hasError.taskName && !hasError.priority) {
      const newTaskObj = {
        taskName: taskName,
        description,
        dueDate,
        priority,
        completed: false,
        color,
      };

      try {
        const res = await fetch("/api/data/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTaskObj),
        });

        if (res.ok) {
          const createdTask = await res.json();
          setTasks((prev) => [...prev, createdTask]);
        } else {
          console.error("Failed to add task");
        }
      } catch (err) {
        console.error("Error adding task:", err);
      }

      setNewTask(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setTaskName("");
    setDescription("");
    setPriority("");
    setDueDate("");
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTaskName(task.taskName);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setIsEditing(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingTask) return;

    await fetch(`/api/tasks/${editingTask._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskName: taskName,
        description,
        dueDate,
        priority,
        color,
      }),
    });

    setTasks((prev) =>
      prev.map((task) =>
        task._id === editingTask._id
          ? { ...task, taskName, description, dueDate, priority }
          : task
      )
    );

    setIsEditing(false);
    setEditingTask(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const getFilteredTasks = () => {
    let result = [...tasks];

    if (search.trim()) {
      result = result.filter((t) =>
        t.taskName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priority) result = result.filter((t) => t.priority === priority);
    if (status) {
      result = result.filter((t) =>
        status === "completed" ? t.completed : !t.completed
      );
    }

    if (sort === "earliest") {
      result.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    } else if (sort === "latest") {
      result.sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      );
    }

    result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    return result;
  };

  const clearCompletedTasks = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const handleColor = (taskId: string) => {
    setColorPicker(taskId === colorPicker ? "" : taskId);
  };

  const handlePin = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, pinned: !task.pinned } : task
      )
    );
  };

  const handleZoom = (taskId: string) => {
    const taskToZoom = tasks.find((t) => t._id === taskId);
    if (taskToZoom) setZoom(taskToZoom);
  };

  return (
    <div className="bg-gray-200 w-full min-h-screen px-2">
      <Header sideBar={sideBar} setSidebar={setSidebar} />
      <Sidebar
        setActiveLink={setActiveLink}
        sideBar={sideBar}
        activeLink={activeLink}
      />

      <div
        className={`${
          sideBar ? "ml-64" : "ml-0"
        } mt-4 transition-all duration-300`}
      >
        <div className="flex justify-between mx-4">
          <h2 className="font-bold text-2xl">
            {activeLink === "allTasks"
              ? "All Tasks"
              : activeLink === "today"
              ? "Today's Tasks"
              : activeLink === "completed"
              ? "Completed Tasks"
              : "Mentor Call Notes"}
          </h2>
          <button
            className="text-white bg-blue-700 py-2 px-4 rounded-xl flex items-center gap-2"
            onClick={handleAddClick}
          >
            <span className="hidden lg:block">{buttonText}</span>
            <FaPlus />
          </button>
        </div>

        {!isMentorCallTab && (
          <Search
            tasks={tasks}
            search={search}
            setSearch={setSearch}
            setFilteredTasks={setTasks} // Pass setTasks or create a filteredTasks state if needed
          />
        )}
        {activeLink === "allTasks" && (
          <Filter
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            sort={sort}
            setSort={setSort}
          />
        )}
      </div>

      <div
        className={`${
          sideBar ? "ml-64" : "ml-0"
        } grid grid-cols-1 mx-2 gap-4 mt-4`}
      >
        {activeLink === "today" ? (
          <TodayTasks
            tasks={tasks}
            toggleComplete={toggleComplete}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ) : activeLink === "completed" ? (
          <Completed
            tasks={tasks}
            toggleComplete={(id: number) => {
              const stringId = String(id);
              toggleComplete(stringId);
            }}
            handleEdit={handleEdit}
            handleDelete={(id: number) => handleDelete(String(id))}
            clearCompletedTasks={clearCompletedTasks}
          />
        ) : isMentorCallTab ? (
          <MentorCallsTab />
        ) : getFilteredTasks().length === 0 ? (
          <div className="flex justify-center mt-16 text-gray-500 italic col-span-full">
            <p>
              Productivity is never an accident. It is always the result of a
              commitment to excellence.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 mt-2 ">
            {getFilteredTasks().map((task) => (
              <div
                key={task._id}
                style={{ background: task.color || "#172554" }}
                className={`${
                  task.completed ? "border-green-400" : "border-red-400"
                } min-w-sm rounded-xl p-4 text-white border-l-4`}
                onClick={() => handleZoom(task._id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleComplete(task._id);
                        }}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <h3
                        className={`${
                          task.completed ? "line-through" : ""
                        } font-semibold text-base`}
                      >
                        {task.taskName}
                      </h3>
                      <span
                        className="cursor-pointer text-gray-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePin(task._id)}}
                      >
                        {task.pinned ? <RiPushpinLine /> : <RiUnpinLine />}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <span
                        className={
                          task.completed ? "text-gray-500" : "text-red-500"
                        }
                      >
                        {task.dueDate}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span
                        className={`px-2 py-0.5 rounded-md font-medium ${
                          task.priority === "Low"
                            ? "text-green-800 bg-green-200"
                            : task.priority === "Medium"
                            ? "text-yellow-800 bg-yellow-200"
                            : "text-red-800 bg-red-200"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-2 max-w-2xs overflow-hidden">
                      {task.description}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-1">
                    <FiEdit
                      className="cursor-pointer text-gray-300 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(task);
                      }}
                    />
                    <FiTrash
                      className="cursor-pointer text-gray-300 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        const confirmDelete = window.confirm("Are you sure you want to delete this task?")
                        if(confirmDelete) handleDelete(task._id);
                      }}
                    />
                    <CgColorPicker
                      className="text-gray-300 hover:text-white cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleColor(task._id);
                      }}
                    />

                    {colorPicker === task._id && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <ColorPicker
                          colorOptions={colourOptions}
                          setColor={(color: string) => {
                            setTasks((prev) =>
                              prev.map((t) =>
                                t._id === task._id ? { ...t, color: color } : t
                              )
                            );
                            setColorPicker("");
                          }}
                          className="absolute ml-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        newTask={newTask}
        setNewTask={setNewTask}
        taskName={taskName}
        setTaskName={setTaskName}
        priority={priority}
        setPriority={setPriority}
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        handleForm={handleForm}
        errors={errors}
      />

      <EditTask
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleEditSubmit={handleEditSubmit}
        taskName={taskName}
        setTaskName={setTaskName}
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDuedate={setDueDate}
        priority={priority}
        setPriority={setPriority}
      />

      {showMentorCall && (
        <MentorCallModal
          calls={mentorCalls}
          setShowMentorCall={setShowMentorCall}
          mentorDescription={mentorDescription}
          setMentorDescription={setMentorDescription}
          setMentorCalls={setMentorCalls}
          dueDate={dueDate}
          setDueDate={setDueDate}
          isEditing={false}
          editingId={null}
          setIsEditing={() => {}}
          setEditingId={() => {}}
        />
      )}

      {zoom && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-60 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-xl shadow-lg max-w-xl w-full p-6 relative border-4"
            style={{ background: zoom.color || "#000000" }}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setZoom(null)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">
              {zoom.taskName}
            </h2>
            <p className="text-gray-200 mb-2 whitespace-pre-wrap break-words">
              {zoom.description}
            </p>
            <div className="flex gap-4 text-sm text-gray-100 mb-2">
              <span>Due: {zoom.dueDate}</span>
              <span>•</span>
              <span>Priority: {zoom.priority}</span>
            </div>
            {zoom.completed && (
              <span className="text-green-300 font-semibold">✓ Completed</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
