<template>
  <header>   
    <el-affix class="header-item">
      <RouterLink to="/">Home</RouterLink>
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
  <div class="content">
    <RouterView class="routerview"/>
  </div>
  
</template>

<script lang="ts">
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
      let res = await this.$axios.get('/game');
      let games = res.data.data;
      this.$store.commit("setGames", games);
    },

    async fetchPlatforms(){
      let res = await this.$axios.get('/platform');
      let platforms = res.data.data;

      this.$store.commit("setPlatforms", platforms);
    },

    async fetchRuns() {
      let res = await this.$axios.get('/run');
      let runs = res.data.data;

      this.$store.commit("setRuns", runs);
    }

  },
  async created() {
    await this.fetchPlatforms();
    await this.fetchGames();
    await this.fetchRuns();
  }
}

</script>

<style>

header {
  position: fixed;
  z-index: 999;
  display: flex;
  margin: 0;
  padding: 0.5rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.header-item {
  margin-left: 0.1rem;
  margin-right: 0.1rem;
}

.content {
  margin-top: 50px;
}

</style>