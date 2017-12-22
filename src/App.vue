<template>

  <div id="taskApp">

      <h1>Todo Task List App</h1>



      <div class="panel panel-default">
          <h2 class="text-center">Add New Task</h2>

          <form v-on:submit = 'addTask'>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="tasks.name">
              </div>
              <div class="col-sm-4">
                <input type="submit" value="Add" class="btn btn-primary btn-block">
              </div>
          </form>
        &nbsp;
      </div>



      <table class="table">
        <thead>
          <th>Id</th>
          <th>Checkmark Done</th>
          <th>Status</th>
          <th>Task Name</th>
          <th>Delete</th>
        </thead>
        <tbody>
          <tr v-for="task in tasks">
            <td > {{task.id}} </td>
            <td><input type="checkbox" v-model="task.done"></td>
            <select v-model="task.status" v-on:change = "onStatusChanged(task)">
              <option value="new" selected>Новый</option>
              <option value="active">Активен</option>
              <option value="completed">Выполнен</option>
            </select>
            <td><span :class="{taskDone: task.done, statusActive: task.status==='active' }"> {{ task.name }} </span></td>
            <td><button class="btn btn-danger btn-block" v-on:click="deleteTask(task)">Delete</button></td>
          </tr>
        </tbody>
      </table>

  </div>

</template>

<script>
import axios from 'axios'
export default {
//  name: 'taskApp',
  data () {
    return {
        nextId: 5,
        tasks: []
//        tasks: [
//            {id: 1, name: "gotta do this task first", done: false, status: "new"},
//            {id: 2, name: "buy some cat food", done: false, status: "new"},
//            {id: 3, name: "look out of the window", done: false, status: "new"},
//            {id: 4, name: "install fish tank in living room", done: false, status: "new"}
//        ]

    }
  },
    created(){
        this.getTasks();
    },

    methods: {
      addTask: function (e) {
          e.preventDefault();
          if(this.tasks.name)
            {
                this.tasks.push({
                    id: this.nextId++,
                    name: this.tasks.name,
                    done: false,
                    status: "new"
                })
//                axios.post("tasks.json", this.tasks)
//                    .then(function (response) {
//                        console.log("!! POST SUCCESS!! ");
//                    })
                this.tasks.name = '';
            }
      },
       deleteTask: function(task) {
          this.tasks.splice(this.tasks.indexOf(task),1)

       },
        onStatusChanged: function(task){

          switch(task.status){
              case "new": task.done = false; break;
              case "completed": task.done = true; break;
          }

        },
        getTasks: function(){
            let that = this;
            axios.get("tasks.json") // json всегда должен содержать только ОБЪЕКТ !! : {...}
                .then(function (response) {
                    console.log("SUCCESS!!");
                    that.tasks = response.data.tasks;
                    return response.data;
                })
        }
    }
}
</script>

<style lang="sass">
span
  //background: lightgreen

.taskDone
  text-decoration: line-through
  background: yellow
.statusActive
  background: lightgreen


#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: blue
  margin-top: 60px

h1, h2
  font-weight: normal

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a
  color: #42b983

</style>
