<template>
    <div :class="{done: todo.done}">
        <span class="x-delete badge badge-danger" v-on:click="remove" >x</span>
        <input type="checkbox" v-model="todo.done" :id="labelId">
        <label :for="labelId"> {{todo.text}} </label>
    </div>
</template>

<script>
    export default {
        props: ['todo'],

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
    }
</script>

<style>
    
</style>