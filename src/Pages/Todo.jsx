import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { TODO_URL } from "../constants";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoInput, setEditTodoInput] = useState("");
  const navigate = useNavigate();
  const toHome = () => navigate("/");

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const fetchTodos = async () => {
      try {
        const res = await axios.get(TODO_URL);

        setTodos(res.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      const res = await axios.post(TODO_URL, { todo: input });

      setTodos([...todos, res.data]);
      setInput("");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(TODO_URL + `/${id}`);

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const editTodo = async (id, newTodo, completed) => {
    try {
      const res = await axios.put(TODO_URL + `/${id}`, {
        todo: newTodo,
        isCompleted: completed,
      });

      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return res.data;
        }
        return todo;
      });
      setTodos(newTodos);
      setEditTodoId(null);
      setEditTodoInput("");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <header> 투두리스트 </header>
      <br />
      <input
        data-testid="new-todo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button data-testid="new-todo-add-button" onClick={addTodo}>
        추가
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input
                  data-testid="modify-input"
                  value={editTodoInput}
                  onChange={(e) => setEditTodoInput(e.target.value)}
                />
                <button
                  data-testid="submit-button"
                  onClick={() =>
                    editTodo(todo.id, editTodoInput, todo.isCompleted)
                  }
                >
                  제출
                </button>
                <button
                  data-testid="cancel-button"
                  onClick={() => setEditTodoId(null)}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() =>
                      editTodo(todo.id, todo.todo, !todo.isCompleted)
                    }
                  />
                  <span>{todo.todo}</span>
                </label>
                <button
                  data-testid="modify-button"
                  onClick={() => {
                    setEditTodoId(todo.id);
                    setEditTodoInput(todo.todo);
                  }}
                >
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <br />
      <button onClick={toHome}>돌아가기</button>
    </>
  );
};

export default Todo;
