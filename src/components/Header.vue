<template>
  <div class="playerInfo">
    <div class="left_list">
      <img class="logo" src="../assets/baccarat/logo.svg">
      <span class="user">{{user}}</span>
      <div class="balance">
        <span>{{ $t("baccarat.balance") }}</span>
        <span class="userBalance">123231</span>
      </div>
    </div>
    <ul class="right_list">
      <li id="language">
        <a href="javascript:void(0);">{{currentLang}}</a>
        <LocaleSwitcher />
      </li>
      <li class="nav">
        <a href="javascript:void(0);"></a>
        <ul class="nav-list">
          <li class="nav-list-item"><a href="javascript:void(0);">{{$t('baccarat.chipSettings')}}</a></li>
          <li class="nav-list-item"><a href="javascript:void(0);">{{$t('baccarat.transReport')}}</a></li>
          <li class="nav-list-item"><a href="javascript:void(0);">{{$t('baccarat.actDetails')}}</a></li>
          <li class="nav-list-item"><a href="javascript:void(0);">{{$t('baccarat.baccaratGuides')}}</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";

export default {
  name: "Header",
  components: {
    LocaleSwitcher,
  },
  props: ['user'],
  data() {
    return {
      langMap: {
          ru: 'Русский',
          en: 'English'
      }
    }
  },
  computed: {
    currentLang() {
      return this.langMap[this.$i18n.locale];
    }
  }
};
</script>

<style scoped lang="scss">
.playerInfo {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1020;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #ff8100;
  width: auto;
  margin: 0 auto;
  background: #000;
  align-items: center;
  height: 46px;
  border-bottom: 1px solid #3e2b0a;
  clear: both;

  ul {
    list-style-type: none;
  }

  .left_list {
    display: flex;

    .logo,
    .user {
      margin-right: 30px;
    }

    .user,
    .balance {
      padding-left: 25px;
    }

    .logo {
      width: 50px;
    }

    .user {
      background: url("../assets/baccarat/ico_top.png") 0 0 no-repeat;
    }

    .balance {
      background: url("../assets/baccarat/ico_top.png") 0 -51px no-repeat;
    }
  }

  .right_list {
    #language, .nav {
      position: relative;
      float: left;
      display: block;
      font-size: 15px;
      color: #000;
    }

    #language {
      &:hover .langSwitcher {
        display: block;
      }

      a {
        display: block;
        width: 160px;
        height: 46px;
        line-height: 46px;
        text-indent: 20px;
        color: #ff8100;
        border-left: 1px solid #5f331c;
        border-right: 1px solid #5f331c;
        background: url("../assets/baccarat/ico_top.png") right -90px no-repeat;
        text-align: left;
        text-decoration: none;
      }
    }

    .nav {
      & > a {
        display: block;
        width: 48px;
        height: 46px;
        background: url("../assets/baccarat/ico_top.png") 14px -130px no-repeat;
        text-indent: -9999px;
      }

      &:hover .nav-list {
        display: block;
      }

      .nav-list {
        display: none;
        position: absolute;
        bottom: -160.5px;
        right: 0;
        position: absolute;
        z-index: 500;
        background: #E26B00;
        width: -webkit-max-content;
        width: max-content;
        padding: 0;

        li {
          float: none;
          border-bottom: 1px solid #CB591D;
          position: relative;
          padding: 0 10px;
          
          &:hover {
            background-image: linear-gradient(-180deg, #000000 50%, #2B0F00 99%);
          }

          a {
            text-decoration: none;
            display: block;
            width: auto;
            height: 39px;
            background: none;
            text-indent: 15px;
            color: #000;
            line-height: 38px;
            background: none;
            text-indent: 0px;

            &:hover {
              color: #E26B00;
            }
          }
        }
      }
    }
  }
}
</style>
