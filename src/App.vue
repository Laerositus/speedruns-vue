<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import { ElAffix } from 'element-plus';

</script>

<template>
  <header>   

    <el-affix class="Home">
      <RouterLink to="/">Home</RouterLink>
    </el-affix>
    <el-affix class="Games">
      <RouterLink to="/games">Games</RouterLink>
    </el-affix>
    <el-affix class="Platforms">
      <RouterLink to="/platforms">Platforms</RouterLink>
    </el-affix>
    <el-affix class="About">
      <RouterLink to="/about">About</RouterLink>
    </el-affix>
  </header>

  <RouterView />
</template>

<style>
  header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(100px, auto);
  }

  /* .logo {
    grid-column: 1/3;
    width: 100px;
    height: 100px;
    fit: contain;
  } */

  .Home {
    grid-column: 1;
    grid-row: 1;
  }

  .Platforms {
    grid-column: 2;
    grid-row: 1;
  }

  .Games {
    grid-column: 3;
    grid-row: 1;
  }


  .About {
    grid-column: 4;
    grid-row: 1;
  }

</style>