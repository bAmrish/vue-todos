import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    
    state: {
        message: 'This is a sample application',
        todos: [
            {id: 1, text: 'Learn Javascript', done: true},
            {id: 2, text: 'Learn Vue', done: false},
            {id: 3, text: 'Build a todo app', done: false}
        ]
    },

    mutations: {
        addTodo: function(store, newTodo){
                var todos = store.todos;

                if(newTodo.trim() == ''){
                    console.warn('Trying to add an empty todo.')
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

            removeTodo: function(store, todo){
                var index = store.todos.indexOf(todo);
                if(index > -1) {
                    store.todos.splice(index, 1);                    
                } else {
                    console.warn('Todo you are trying to remove is not found.');
                }
            }
    }


});