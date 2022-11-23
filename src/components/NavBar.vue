<template>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" >
        <h1 class="fs-1 navbar-brand text-primary">Tech<span class="text-secondary">News</span></h1></router-link>
        <div class="dropdown" v-if="user">
          <a class="dropdown-toggle d-flex align-items-center " id="user-dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div id="user-icon" class="rounded-pill" alt="" :style="getImage()"></div>
            <p class="m-0 d-none d-sm-block text-primary">{{user.displayName}}</p>
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="user-dropdown">
              <li class="dropdown-item"><router-link to="/dashboard" >Dashboard</router-link></li>
              <li class="dropdown-item"><div class="text-primary" @click="logoutUser">Logout</div></li>
          </ul>
        </div>
        <div v-else>
          <router-link to="/login" class="btn btn-primary">Login</router-link>
        </div>
      </div>
    </nav>
</template>

<script>

import {logout} from "@/firebase"

export default {
    name: 'NavBar',
    computed: {
        user(){
            return this.$store.getters.getUser;   
        }
    },
    methods: {
        getImage(){
          if(this.user.photoURL){
            return 'background-image: url("' + this.user.photoURL + '")';
          }
          else{
            return 'background-image: url("https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y")';
          }
          
        },
        async logoutUser(){
            await logout();
            this.$store.commit('updateUser')
            this.$router.push('/login')
        }
    }
}

</script>

<style lang="scss" scoped>
    #user-icon{
    width: 50px;
    height: 50px;
    margin-right: 10px;
    background-size: cover;
    background-position: center;
    }

    .dropdown-item{
        cursor: pointer;
    }
</style>