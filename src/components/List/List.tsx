import { Trash } from "phosphor-react";
import { Task } from "../TextArea/TextArea";

import styles from "./List.module.css";

interface ListProps {
  task: Task;
  completedTask: (taskCompleted: string) => void;
  onDeleteTask: (taskToDelete: string) => void;
}

export function List({ completedTask, task, onDeleteTask }: ListProps) {
  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  function handleTaskComplete() {
    completedTask(task.id);
  }

  return (
    <div className={styles.todo}>
      {task.isTaskComplete ? (
        <>
          <button
            type="button"
            onClick={handleTaskComplete}
            title="Tarefa completa"
            className={styles.buttonCheck}
          />
          <p className={styles.complete}>{task.title}</p>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={handleTaskComplete}
            title="Tarefa completa"
            className={styles.buttonUncheck}
          />
          <p className={styles.incomplete}>{task.title}</p>
        </>
      )}
      <button
        type="button"
        onClick={handleDeleteTask}
        title="Deletar tarefa"
        className={styles.deleteCheck}
      >
        <Trash size={22} />
      </button>
    </div>
  );
}
