import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { loadTasksFromStorage, saveTasksToStorage, initialTasks } from '../storage/asyncStorage';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const stored = await loadTasksFromStorage();
        setTasks(stored);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchTasks();
  }, []);

  const persistTasks = async (newTasks) => {
    setTasks(newTasks);
    await saveTasksToStorage(newTasks);
  };

  const addTask = async ({ title, description, priority }) => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'Moyenne',
      status: 'À faire',
      createdAt: formattedDate,
    };

    const updated = [newTask, ...tasks];
    await persistTasks(updated);
    return newTask;
  };

  const updateTask = async (id, updatedFields) => {
    const updated = tasks.map((t) =>
      String(t.id) === String(id) ? { ...t, ...updatedFields } : t
    );
    await persistTasks(updated);
  };

  const deleteTask = async (id) => {
    const updated = tasks.filter((t) => String(t.id) !== String(id));
    await persistTasks(updated);
  };

  const getTask = (id) => {
    return tasks.find((t) => String(t.id) === String(id));
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Terminée' || t.status === 'Terminées').length;
    const pending = tasks.filter((t) => t.status === 'À faire').length;
    return { total, completed, pending };
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        stats,
        addTask,
        updateTask,
        deleteTask,
        getTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
