<template>
  <div class="game-hall">
    <Header :user="parent" />
    <div class="hall-conntent">
      <section class="banner">
        <div class="banner-image"></div>
        <div class="video-box">
          <div class="videoDiv">
            <video src="../assets/baccarat/bac.mp4" controls width="400" height="300">

            </video>
          </div>
        </div>
      </section>
      <section class="tables-list">
        <TablePreview v-for="(tables, index) in tablesCount" :key="index" />
      </section>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/baccaratEntry">baccaratEntry</router-link>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import TablePreview from '@/components/TablePreview.vue'

export default {
  name: 'BaccaratEntry',
  components: {
    Header, 
    TablePreview
  },
  data() {
    return {
      parent: this.$options.name,
      tablesCount: 6
    }
  }
}
</script>

<style scoped lang="scss">
.game-hall {
  .hall-conntent {
    .banner {
      width: 100%;
      height: 220px;
      display: flex;

      .banner-image {
        height: 100%;
        background-size: cover;
        background-image: url("../assets/baccarat/banner.jpg");
        flex-grow: 4;
      }

      .video-box {
        height: 220px;
        flex-grow: 1;
        background-color: red;
      }
    }

    .tables-list {
      display: flex;
      flex-wrap: wrap;
      margin: 10px auto;
      justify-content: space-between;
    }
  }
}
</style>
