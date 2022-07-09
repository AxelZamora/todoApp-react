import { useState } from 'react'

export default function Todo({ todos, onUpdate, onDelete }) {
	const [isEdit, setIsEdit] = useState(false)

	function FormEdit() {
		const [newValue, setNewValue] = useState(todos.title)

		function handleSubmit(e) {
			e.preventDefault()
		}

		function handleChange(e) {
			const value = e.target.value
			setNewValue(value)
		}

		function handleClickUpdateTodo() {
			onUpdate(todos.id, newValue)
			setIsEdit(false)
		}

		return (
			<form className="todoUpdateForm" onSubmit={handleSubmit}>
				<input type="text" className="todoInput" onChange={handleChange} value={newValue} />
				<button className="button" onClick={handleClickUpdateTodo}>
					update
				</button>
			</form>
		)
	}

	function TodoElement() {
		return (
			<div className="todoInfo">
				<span className="todoTitle">{todos.title}</span>

				<button className="button" onClick={() => setIsEdit(true)}>
					edit
				</button>
				<button className="buttonDelete" onClick={(e) => onDelete(todos.id)}>
					delete
				</button>
			</div>
		)
	}

	return (
		<>
			<div className="todo">{isEdit ? <FormEdit /> : <TodoElement />}</div>
		</>
	)
}
