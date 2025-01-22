export function NoteTodos({ info }) {
    return (
        <div className="note-todos">
            <h4>{info.title}</h4>
            <ul>
                {info.todos.map((todo, idx) => (
                    <li key={idx} style={{ textDecoration: todo.doneAt ? 'line-through' : 'none' }}>
                        {todo.txt}
                    </li>
                ))}
            </ul>
        </div>
    )
}
