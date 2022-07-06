import { CheckCircle, Circle, Trash } from "phosphor-react";

import styles from './Activity.module.css';

interface ActivityProps {
  id: string;
  content: string;
  isChecked: boolean;
  onDeleteTodoTask: (id: string) => void;
  onCompleteTodoTask: (id: string) => void;
}

export function Activity({id, isChecked, content, onDeleteTodoTask, onCompleteTodoTask}: ActivityProps) {
  function deleteTodoTask() {
    onDeleteTodoTask(id);
  }

  function completeTodoTask() {
    onCompleteTodoTask(id);
  }

  return (
    <div className={styles.todoList}>
      {
        isChecked ? 
        <button 
          onClick={completeTodoTask}
          title="Concluir atividade"
        >
          <CheckCircle size={20} weight="fill"/>
        </button>
        :
        <button 
          onClick={completeTodoTask}
          title="Concluir atividade"
        >
          <Circle size={20}/>
        </button>
      }

      {
        isChecked ?
        <p className={styles.checkedActivity}>{content}</p>
        :
        <p>{content}</p>
      } 

      <button 
        onClick={deleteTodoTask}
        title="Remover atividade"
      >
        <Trash size={20}/>
      </button>
    </div> 
  )
}