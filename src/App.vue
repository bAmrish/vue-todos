<template>
  <div id="app" class="container">     
      <div class="row">
        <div class="col"><h1>Todos</h1></div>
      </div>

      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col">
              <div v-if="allDone" class="alert alert-info"> 
                <div v-if="todos.length == 1">
                  {{todos.length}} Todo done!! You may want to add some more!
                </div>
                <div v-else>
                  All {{todos.length}} Todos done!! You may want to add some more!
                </div>
              </div>
              <div v-else>Remaining Todos: {{remainingTodos}}/{{todos.length}}</div>              
            </div>
          </div>

          <div class="row">
            <div class="col">
              <input type="text" id="todo-add" 
                v-model="newTodo" 
                v-on:keyup.enter="addTodo"
                placeholder="New todo">
              <button
                class="btn btn-primary"
                v-on:click="addTodo"
                >New Todo</button>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div v-if="todos.length == 0">
              <div class="alert alert-info">No Todos!<br>Add some todos to get started!</div>
              </div>
              <div v-else>
                <ul class="todos list-group">
                  <li>
                    <transition-group appear name="slide-fade">
                      <todo-item  
                        v-for="todo in todos" 
                        v-bind:todo="todo" 
                        v-bind:key="todo.id"
                        v-on:remove="removeTodo">                   
                      </todo-item>
                    </transition-group>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import TodoItem from './TodoItem.vue'

    export default {
        name: 'app',

        data () {
            return {
                newTodo: ''
            }
        },

        computed: {
            message: function () {
               return this.$store.state.message;
            },

            todos: function(){
              return this.$store.state.todos;
            },

            remainingTodos: function(){
              return this.$store.getters.remainingTodos;
            },

            allDone: function () {
              return this.$store.getters.allDone;
            }
        },

        methods: {
            addTodo: function(){
                this.$store.commit('addTodo', this.newTodo);
                this.newTodo = ''
            },

            removeTodo: function(todo){
               this.$store.commit('removeTodo', todo);
            }
        },

        components: { TodoItem }
    }

</script>

<style>
    body {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    h3 {
        margin-top: 2rem;
    }

    .row {
        margin-bottom: 1rem;
        border-bottom: 1px solid rgba(86,61,124,.2);
    }

    .row .row {
        margin-bottom: 0;
        border-bottom: 0px 
    }

    [class*="col-"] {
        padding-bottom: 1rem;
    }

    .row .row {
        margin-top: 1rem;
        margin-bottom: 0;
    }
    hr {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    ul.todos {
        list-style-type: none;
        margin-left: 0px;
    }

    ul li .done label{
        text-decoration: line-through;
    }

    .x-delete {
        cursor: pointer;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0
    }

    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
      transition: all .3s ease;  
    }

    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for <2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
    }
</style>
