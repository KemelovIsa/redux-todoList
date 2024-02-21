import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  removeAllTodos,
  editTodo,
  toggleCompleted,
} from "../redux/tools/todoSlice";
import { useAppSelector } from "../redux/store";
import scss from "./TodoList.module.scss";

const TodoList: FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [img, setImg] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState(0);
  const [editImg, setEditImg] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const todo = useAppSelector((state) => state.todoReducer.data);
  const dispatch = useDispatch();

  const saveEdit = () => {
    const editedTodo = {
      name: editName,
      age: editAge,
      img: editImg,
    };

    if (editId !== null) {
      dispatch(editTodo({ id: editId, ...editedTodo }));
      setEditId(null);

      setEditName("");
      setEditAge(0);
      setEditImg("");
    }
  };

  const addTodoItem = () => {
    const todoItem = {
      name,
      age,
      img,
      completed: false,
    };

    if (editId !== null) {
      saveEdit();
    } else {
      dispatch(addTodo(todoItem));

      setName("");
      setAge(0);
      setImg("");
    }
  };

  const removeTodoItem = (id: number) => {
    dispatch(removeTodo(id));
  };

  const editTodoItem = (id: number) => {
    const todoToEdit = todo.find((item) => item.id === id);
    if (todoToEdit) {
      setEditId(id);
      setEditName(todoToEdit.name);
      setEditAge(todoToEdit.age);
      setEditImg(todoToEdit.img);
    }
  };

  const toggleCompletedHandler = (id: number) => {
    dispatch(toggleCompleted(id));
  };

  const removeAllTodosHandler = () => {
    dispatch(removeAllTodos());
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task name"
        />
        <input
          type="url"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Task img"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Math.max(0, +e.target.value))}
          placeholder="Task age"
        />
        <button onClick={addTodoItem}>AddTodo</button>
        <button onClick={removeAllTodosHandler}>Delete All</button>

        <div className={scss.container}>
          {todo.map((item) => (
            <div key={item.id}>
              <div className={item.completed ? scss.completed : ""}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleCompletedHandler(item.id)}
                />
                <h1>{item.name}</h1>
                <h1>{item.age}</h1>
                <img src={item.img} alt={item.name} />
                <button onClick={() => editTodoItem(item.id)}>Edit</button>
                <button onClick={() => removeTodoItem(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {editId !== null && (
          <div>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Edit Task name"
            />
            <input
              type="url"
              value={editImg}
              onChange={(e) => setEditImg(e.target.value)}
              placeholder="Edit Task img"
            />
            <input
              type="number"
              value={editAge}
              onChange={(e) => setEditAge(Math.max(0, +e.target.value))}
              placeholder="Edit Task age"
            />
            <button onClick={saveEdit}>Save Edit</button>
            <button onClick={() => setEditId(null)}>Cancel</button>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoList;
