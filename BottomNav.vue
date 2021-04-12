<template>
  <nav>
    <v-bottom-navigation grow color="success" app class="hidden-md-and-up">
      <v-btn to="/">
        <span>home</span>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn to="/about">
        <span>products</span>
        <v-icon>mdi-gift-outline</v-icon>
      </v-btn>
      <v-btn @click="dialog = true">
        <span>search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      
      <v-btn to="/cart" v-if="cart">
        <v-badge small color="success">
          <span small slot="badge"></span>
          <!--slot can be any component-->
          <v-icon>mdi-cart-outline</v-icon>
        </v-badge>
      </v-btn>

      <v-btn fab to="/cart" v-else>
        <span>cart</span>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <!-- vdialog for filtering and searching -->
    <v-row>
      <v-dialog
        v-model="dialog"
        scrollable
        fullscreen
        transition="dialog-bottom-transition"
      >
        <v-card tile>
          <v-app-bar app color="white">
            <v-btn icon @click="dialog = false" color="success">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <!--  <v-spacer></v-spacer> -->
            <v-text-field
              label="search"
              prepend-inner-icon="mdi-magnify"
              class="pt-5 mt-1"
              clearable
              color="success"
              rounded
            ></v-text-field>
            <v-btn color="success" icon>
              <v-icon>mdi-filter-outline</v-icon>
            </v-btn>
          </v-app-bar>
          <v-card-text style="height: 1000px;" class="bg">
            <div style="min-height:200px;padding-top:70px;">
              <!-- searched products go here -->
              <v-card class="card my-2" @click="to">
                he
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      cart: false,
    };
  },
  methods: {
    to() {
      this.dialog = false;
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 0.2rem 0.2rem rgba(116, 115, 115, 0.28) !important;
  border-radius: 4px !important;
}
.bg {
  background-color: rgb(252, 252, 252);
}
.fluid {
  width: 100%;
  height: auto;
}
/* div {
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
}

::-webkit-scrollbar {
  width: 2px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgb(154, 154, 160);
}

.bg {
  background-color: rgb(245, 245, 245) !important;
}

.fluid {
  height: auto;
  width: 100%;
} */
</style>
