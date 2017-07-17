var todoItem = Vue.component('todo-item', {
	props: ['todo'],

	template: '\
		<div :class="{done: todo.done}">\
			<span class="x-delete badge badge-danger" v-on:click="remove" >x</span>\
			<input type=checkbox v-model=todo.done :id=labelId>\
			<label :for=labelId> {{todo.text}} </label>\
		</div>\
	',
	
	computed: {
		labelId: function () {
			return "todo" + this.todo.id;
		}
	},

	methods: {
		remove: function(){
			this.$emit('remove', this.todo)	
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
		},

		allDone: function () {
			
			if(this.todos.length){
				return this.todos.every(function(todo){return todo.done}) 
			}

			return false;
		}
	},

	methods: {
		addTodo: function(){
			var todos = this.todos;

			if(this.newTodo.trim() == ''){
				return;
			}


			var getNextId =  function() { 
				if(todos.length == 0) {
					return 1;
				}

				return (todos.slice(todos.length - 1)[0].id + 1);
			}

			this.todos.push({id: getNextId(), text: this.newTodo, done: false});
			this.newTodo = ''
		},

		removeTodo: function(todo){
			var index = this.todos.indexOf(todo);
			this.todos.splice(index, 1);
		}
	},

	components: { todoItem: todoItem }
})