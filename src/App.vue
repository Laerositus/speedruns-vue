<template>
  <header>   

    <el-affix class="header-item">
      <RouterLink to="/">Home</RouterLink>
    </el-affix>
    <el-affix class="header-item">
      <RouterLink to="/games">Games</RouterLink>
    </el-affix>
    <el-affix class="header-item">
      <RouterLink to="/platforms">Platforms</RouterLink>
    </el-affix>
    <el-affix class="header-item">
      <RouterLink to="/about">About</RouterLink>
    </el-affix>
    <el-button class="header-item" v-if="!$store.state.loggedIn" type="primary" @click="showEntry = true" plain>
      Log In
    </el-button>
    <el-affix class="header-item" v-if="$store.state.loggedIn">
      <RouterLink :to="{ name: 'gamedetail', params: { id: user._id } }"> {{ user.playername }}</RouterLink>
    </el-affix>
    
  </header>
  <div class="flex">
    <el-dialog v-model="showEntry" title="Register or Log In" >
      <Entry @toggleLoginStatus="toggleLoggedIn"/>
    </el-dialog>
    <RouterView @loggedIn="setUser"/>
  </div>

</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElAffix, ElButton } from 'element-plus'
import type { Player } from './models/player'
import { PLAYERS } from './mock-data'
import Entry from './components/Entry.vue'

export default {
  data() {
    return {
      user: PLAYERS[0],
      loggedIn: false,
      showEntry: false
    }
  },
  components: {
    Entry
  },
  methods: {
    toggleLoggedIn(){
      this.showEntry = false;
      this.loggedIn = !this.loggedIn;
      console.log("Toggled logged in to " +this.loggedIn);
    },

    setUser(player: Player){
      this.user = player;
    },

    async fetchGames(){
      console.log("Fetching games");
      let res = await this.$axios.get('/game');
      let games = res.data.data;
      console.log("Fetched games: ")
      console.log(games);

      this.$store.commit("setGames", games);
    },

    async fetchPlatforms(){
      console.log("Fetching platforms");
      let res = await this.$axios.get('/platform');
      let platforms = res.data.data;

      console.log("Fetched platforms: ")
      console.log(platforms);

      this.$store.commit("setPlatforms", platforms);
    },

  },
  beforeCreate() {
    console.log("beforeCreate App.vue");

  },
  async created() {
    console.log("created App.vue");
    await this.fetchGames();
    await this.fetchPlatforms();
  }
}

</script>

<style>

header {
  display: flex;
  margin: 0;
  padding: 0.5rem;
  width: 100%;
}

.header-item {
  margin-left: 0.1rem;
  margin-right: 0.1rem;
}

</style>