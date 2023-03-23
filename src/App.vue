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

    <el-affix>
      <el-button class="header-item" v-if="!loggedIn" type="primary" @click="showEntry = true" plain>
        Log In
      </el-button>
    </el-affix>
    <el-affix class="header-item" v-if="loggedIn">
      <!-- TODO Fix Routerlink -->
      <RouterLink :to="{ name: 'player', params: { playername: player.playername } }"> {{ player.playername }}</RouterLink>
    </el-affix>
    
  </header>
  <div class="flex">
    <el-dialog v-model="showEntry" title="Register or Log In" >
      <Entry @dismissEntryDialog="dismissEntryDialog"/>
    </el-dialog>
  </div>
  
  <RouterView />
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElAffix, ElButton } from 'element-plus'
import Entry from './components/Entry.vue'

export default {
  data() {
    return {
      showEntry: false
    }
  },
  computed: {
    player: {
      get() { 
        return this.$store.state.loggedInPlayer;
      },
      set() { console.log("Logged in Player is updated") }
    },
    loggedIn: {
      get() { return this.$store.state.loggedIn },
      set() {},
    }
  },
  components: {
    Entry
  },
  methods: {
    dismissEntryDialog(){
      this.showEntry = false;
    },

    async fetchGames(){
      // console.log("Fetching games");
      let res = await this.$axios.get('/game');
      let games = res.data.data;
      // console.log("Fetched games: ")
      // console.log(games);

      this.$store.commit("setGames", games);
    },

    async fetchPlatforms(){
      // console.log("Fetching platforms");
      let res = await this.$axios.get('/platform');
      let platforms = res.data.data;

      // console.log("Fetched platforms: ")
      // console.log(platforms);

      this.$store.commit("setPlatforms", platforms);
    },

  },
  async created() {
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
  background-color: rgba(0, 0, 0, 0.2);
}

.header-item {
  margin-left: 0.1rem;
  margin-right: 0.1rem;
}

</style>