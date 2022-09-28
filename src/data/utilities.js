
export function getVisibleTodos(todos, showActive) {
    const activeTodos = todos.filter(todo => !todo.done);
    const visibleTodos = showActive ? activeTodos : todos;
    return visibleTodos;
}

export function createTodo(text, done = false) {
    return {
      text,
      done
    };
  }