<template>
  <ul class="langSwitcher">
    <li
      class="lang-item"
      v-for="locale in locales"
      :key="locale"
    >
      <a @click="switchLocale(locale)">{{ langMap[locale] }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "LocaleSwitcher",
  data() {
    return {
      locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(","),
      langMap: {
          ru: 'Русский',
          en: 'English'
      }
    };
  },
  methods: {
    switchLocale(locale) {
      if (this.$i18n.locale !== locale) {
        this.$i18n.locale = locale;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.langSwitcher {
  display: none;
  position: absolute;
  bottom: -92px;
  left: -40px;

  a {
    display: block;
    width: 160px;
    height: 46px;
    line-height: 46px;
    text-indent: 20px;
    color: #ff8100;
    border-left: 1px solid #5f331c;
    border-right: 1px solid #5f331c;
    background: #000;
    text-align: left;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      background-image: linear-gradient(-180deg, #160800 0%, #522605 99%);
    }
  }
}
</style>