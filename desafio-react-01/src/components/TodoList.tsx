import { ChangeEvent, FormEvent, useState } from 'react';

import {v4 as uuid} from 'uuid';
import { PlusCircle } from 'phosphor-react';
import { Activity } from './Activity';

import Clipboard from '../assets/Clipboard.png';

import styles from './TodoList.module.css';

interface TodoTaskProps {
  id: string;
  content: string;
  isChecked: true | false;
}

export function TodoList() {
  const [todoList, setTodoList] = useState<TodoTaskProps[]>([]);
  const [todoText, setTodoText] = useState('');

  function handleCreateTodoTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuid(),
      content: todoText,
      isChecked: false
    }

    setTodoList([...todoList, newTask]);

    setTodoText('');
  }

  function handleNewTodoTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setTodoText(event.target.value);
  }

  function deleteTodoTask(id: string) {
    const newTodoList = todoList.filter(todo => {
      return todo.id !== id
    });

    setTodoList(newTodoList);
  }

  function completeTodoTask(id: string) {
    const newTodoList = todoList.map(item => {
      if (item.id === id) {
        return {...item, isChecked: !item.isChecked}
      }
      else return item;
    })

    setTodoList(newTodoList);
  }

  return (
    <div>
      <form onSubmit={handleCreateTodoTask} className={styles.addActivity} action="">
        <input 
          type="text" 
          value={todoText}
          onChange={handleNewTodoTask}
          placeholder='Adicione uma nova tarefa' 
        />
        <button type='submit'>
          Criar
          <PlusCircle size={21}/>
        </button>
      </form>

      <div className={styles.todoContainer}>
        <header className={styles.todoHeader}>
          <div>
            <span>Tarefas criadas</span>
            <strong>{todoList.length}</strong>
          </div>

          <div>
            <span>Concluídas</span>
            <strong>{todoList.filter(item => item.isChecked).length} de {todoList.length}</strong>
          </div>
        </header>

        {todoList.length !== 0
          ? 
          todoList.map(todoItem => {
            return (
              <Activity 
                id={todoItem.id}
                content={todoItem.content} 
                isChecked={todoItem.isChecked}
                onDeleteTodoTask={deleteTodoTask}
                onCompleteTodoTask={completeTodoTask}
              />
            )
          })
          :
            <div className={styles.emptyList}>
              <img src={Clipboard} alt=""/>

              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          }
      </div>
    </div>
  )
}