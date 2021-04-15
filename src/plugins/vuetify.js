import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // dark: true ,

    // themes: {
    //   light: {
    //     primary: colors.primary,
    //     white: "#ffffff",
    //   },
    //   dark: {
    //     white: "#1E1E1E",
    //     black: "#ffffff",
    //   },
    // },
    theme: {
      themes: {
        light: {
          primary: colors.primary,
          white: "#ffffff",
          // secondary: colors.grey.darken1,
          // accent: colors.shades.black,
          // error: colors.red.accent3,
          // background: colors.indigo.lighten5,
        },
        dark: {
          // primary: colors.blue.lighten3,
          // background: colors.indigo.base,
          white: "#1E1E1E",
          black: "#ffffff",
        },
      },
    },
  },
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
});
