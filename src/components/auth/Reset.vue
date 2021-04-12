<template>
  <div>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex sm8 offset-sm2>
          <v-form @submit.prevent="" class="form">
            <img src="../../assets/1.jpeg" class="avatar" alt="" />
            <v-subheader class="center">RESET PASSWORD</v-subheader>
            <v-text-field
              label="email"
              prepend-inner-icon="mdi-email-outline"
              color="grey"
              v-model="email"
            ></v-text-field>

            <v-btn
              class="my-purple mt-5"
              block
              large
              @click="login"
              :loading="loading"
            >
              <span left class="white--text">LOGIN</span>
              <v-icon small right color="white">mdi-lock-outline</v-icon>
            </v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
