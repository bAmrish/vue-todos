var todoItem = Vue.component('todo-item', {
	props: ['todo'],
	template: '<div :class="{done: todo.done}"><input type=checkbox v-model=todo.done :id=labelId> <label :for=labelId> {{todo.text}} </label></div>',
	computed: {
		labelId: function () {
			return "todo" + this.todo.id;
		}
	}
});

var vm = new Vue({
	el: '#app',
	data: {
		message: 'This is a sample application!',
		todos: [
			{id: 1, text: 'Learn Javascript', done: true},
			{id: 2, text: 'Learn Vue', done: false},
			{id: 3, text: 'Build a todo app', done: false}
		],
		newTodo: ''
	},

	computed: {
		remainingTodos: function(){
			return this.todos.filter(function(todo){return !todo.done}).length;
		}
	},

	methods: {
		addTodo: function(){
			var todos = this.todos;

			if(this.newTodo.trim() == ''){
				return;
			}

			var getNextId =  function() { 
				return (todos.slice(todos.length - 1)[0].id + 1);
			}

			this.todos.push({id: getNextId(), text: this.newTodo, done: false});
			this.newTodo = ''
		}
	},

	components: { todoItem: todoItem }
})