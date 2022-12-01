import { PlusCircle, ListChecks } from "phosphor-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { List } from "../List/List";

import styles from "./TextArea.module.css";

export interface Task {
  id: string;
  title: string;
  isTaskComplete: boolean;
}

export function TextArea() {
  const [Task, setTask] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState("");

  const tasksCompleted = Task.filter((task) => task.isTaskComplete).length;

  const LOCAL_STORAGE_KEY = "todo:savedTasks";

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTask(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function setTasksAndSave(newTaskSaved: Task[]) {
    setTask(newTaskSaved);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTaskSaved));
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    if (Task.length == 0) {
      setTasksAndSave([
        ...Task,
        {
          id: crypto.randomUUID(),
          title: newTask,
          isTaskComplete: false,
        },
      ]);
      console.log(Task.length);
      setNewTask("");
    }

    Task.filter((task) => {
      if (task.title !== newTask) {
        setTasksAndSave([
          ...Task,
          {
            id: crypto.randomUUID(),
            title: newTask,
            isTaskComplete: false,
          },
        ]);
        setNewTask("");
      } else {
        alert("Já possui esta tarefa. Insira outra!");
        setTasksAndSave([...Task]);
        setNewTask("");
      }
    });
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewTask(event.target.value);
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDelete = Task.filter((task) => {
      return task.id !== taskToDelete;
    });
    setTasksAndSave(tasksWithoutDelete);
  }

  function toggleCompletedTask(taskCompleted: string) {
    const newTasks = Task.map((task) => {
      if (task.id === taskCompleted) {
        return {
          ...task,
          isTaskComplete: !task.isTaskComplete,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <form className={styles.TextArea} onSubmit={handleCreateTask}>
        <textarea
          value={newTask}
          onChange={handleNewTaskChange}
          name="tasks"
          required
          className={styles.task}
          maxLength={30}
          placeholder="Adicione uma nova tarefa"
        />

        <button className={styles.button} type="submit">
          Criar <PlusCircle size={22} />
        </button>
      </form>

      <div>
        <div className={styles.list}>
          <div className={styles.header}>
            <div className={styles.create}>
              <p>Tarefas criadas</p>
              <span>{Task.length}</span>
            </div>
            <div className={styles.conclude}>
              <p>Concluidas</p>
              <span>
                {tasksCompleted} de {Task.length}
              </span>
            </div>
          </div>

          <div>
            {Task.map((tasks) => {
              return (
                <List
                  key={tasks.id}
                  task={tasks}
                  onDeleteTask={deleteTask}
                  completedTask={toggleCompletedTask}
                />
              );
            })}

            {Task.length <= 0 && (
              <>
                <div className={styles.emptyTodo}>
                  <ListChecks size={40} />
                  <p>Você ainda nâo tem tarefas cadastradas</p>
                  <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
