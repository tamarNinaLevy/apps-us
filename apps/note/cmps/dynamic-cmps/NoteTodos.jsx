export function NoteTodos({ info, handleOnToggleTodo }) {

    const onToggleTodo = (idx) => {
        const todo = info.todos[idx]
        if (todo.doneAt) todo.doneAt = null
        else { todo.doneAt = Date.now() }
        handleOnToggleTodo()

    }

    return (
        <div className="note-todos">
            <h4>{info.title}</h4>
            <ul>
                {info.todos.map((todo, idx) => (
                    <li
                        key={idx}
                        style={{ textDecoration: todo.doneAt ? 'line-through' : 'none', cursor: 'pointer' }}
                        onClick={() => { onToggleTodo(idx) }}>
                        {todo.txt}
                    </li>
                ))}
            </ul>
        </div>
    )
}
