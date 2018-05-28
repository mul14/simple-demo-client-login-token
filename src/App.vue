<template>
  <div>
    <form @submit.prevent="login">
      <input type="text" v-model="form.username">
      <input type="password" v-model="form.password">
      <button v-if="!loggedin" type="submit">Login</button>
      <button v-if="!loggedin" type="button" @click="register">Register</button>
      <button v-if="loggedin" type="button" @click="logout">Logout</button>
    </form>
    <button @click="fetchArticles()">Get All Articles</button>
    <button @click="fetchArticles(1)">Get article 1</button>
    <button @click="fetchArticles(2)">Get article 2</button>
  </div>
</template>

<script>
  import axios from "axios"
  import Cookies from "js-cookie"

  export default {
    data() {
      return {
        loggedin: false,
        form: {
          username: 'mul14',
          password: '123',
        }
      }
    },

    mounted() {
      this.loggedin = !!axios.defaults.headers.common['Authorization']
    },

    methods: {

      logout() {
        delete axios.defaults.headers.common['Authorization']
        Cookies.remove('token')
        this.loggedin = false
      },

      login() {
        axios.post('auth/login', {
          username: this.form.username,
          password: this.form.password,
        }).then(res => {
          if (res.data.token) {
            Cookies.set('token', res.data.token)
            axios.defaults.headers.common['Authorization'] = Cookies.get('token')
            this.loggedin = true
          }
        })
      },

      register() {
        axios.post('auth/register', {
          username: this.form.username,
          password: this.form.password,
        }).then(res => {
          if (res.data.token) {
            Cookies.set('token', res.data.token)
            axios.defaults.headers.common['Authorization'] = Cookies.get('token')
          }
        })
      },

      fetchArticles(id) {
        if (id) {
          axios.get('articles/' + id)
        } else {
          axios.get('articles')
        }
      }

    }
  }
</script>
