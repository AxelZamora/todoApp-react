import React from 'react'
import { useState } from 'react'
import Todo from './Todo'
import './TodoApp.css'

export default function TodoApp() {
	const [title, setTitle] = useState('')
	const [todos, setTodos] = useState([])

	function handleChange(event) {
		const value = event.target.value // veo el valor que tiene el input cada vez que presiono una tecla
		setTitle(value)
		// cada vez que escriba voy actualizando el estado de title
	}

	function handleSubmit(event) {
		event.preventDefault()
		if (title.trim().length <= 1) return // valido si el todo es menor a 1 caracter
		const newTodo = {
			id: crypto.randomUUID(), // obtengo un id random
			title: title,
			completed: false,
		}

		const temp = [...todos] // creo una copia del arreglo todos
		temp.unshift(newTodo) // agrego el newtodo al comienzo del arreglo con unshift
		setTodos(temp) // ahora seteo con el nuevo arreglo
		setTitle('')
	}
	function handleUpdate(id, value) {
		const temp = [...todos]
		const item = temp.find((item) => item.id === id)
		item.title = value
		setTodos(temp)
	}
	function handleDelete(id) {
		const temp = todos.filter((item) => item.id !== id)
		setTodos(temp)
	}

	return (
		<>
			<div className="todoContainer">
				<form className="todoCreateForm" onSubmit={handleSubmit}>
					<input className="todoInput" value={title} onChange={handleChange} autoFocus placeholder="new todo" />
					<input className="buttonCreate" type="submit" value="create todo" onClick={handleSubmit} />
				</form>

				<div className="todosContainer">
					{todos.map((todos) => (
						<Todo key={todos.id} todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
					))}
				</div>
			</div>
		</>
	)
}
