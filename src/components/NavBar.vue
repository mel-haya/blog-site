<template>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" >
        <h1 class="fs-1 navbar-brand text-primary">Tech<span class="text-secondary">News</span></h1></router-link>
        <div class="dropdown ">
          <a class="dropdown-toggle d-flex align-items-center " id="user-dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div id="user-icon" class="rounded-pill" alt=""></div>
            <p class="m-0 d-none d-sm-block text-primary">Mourad</p>
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="user-dropdown">
              <li class="dropdown-item"><router-link to="/dashboard" >Dashboard</router-link></li>
              <li class="dropdown-item"><router-link to="/logout" >Logout</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>


</script>

<style lang="scss" scoped>
    #user-icon{
    width: 50px;
    height: 50px;
    margin-right: 10px;
    background-image: url("@/assets/taiga.jpg");
    background-size: cover;
    background-position: center;
    }

    .dropdown-item{
        cursor: pointer;
    }
</style>