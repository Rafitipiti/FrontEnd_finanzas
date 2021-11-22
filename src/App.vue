<template>
  <v-app>
    <v-app-bar v-if="val" dark absolute app>
      <v-toolbar-title class="font-weight-bold my-auto"><v-icon class="mr-1 py-1">mdi-account-cash</v-icon>App Finance</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed outlined rounded class="text-capitalize mx-1" @click="logOut">Log out<v-icon class="ml-2">mdi-logout-variant</v-icon></v-btn>
    </v-app-bar>
    <h1 class="mt-6 font-weight-bold mx-auto">APP FINANCE</h1>
    <v-hover v-if="val">
      <template v-slot:default="{ hover }">
        <v-card :class="`elevation-${hover ? 24 : 3}`" class="mx-auto my-5 transition-swing">
          <v-tabs centered background-color="black" dark>
            <v-tab to="/tasa">Tasa</v-tab>
            <v-tab to="/cliente">Cliente</v-tab>
            <v-tab to="/letra">Letra</v-tab>
            <v-tab to="/costes">Costes</v-tab>
            <v-tab to="/pago-letra">Pago de Letra</v-tab>
            <v-tab to="/execute">Execute</v-tab>
          </v-tabs>
        </v-card>
      </template>
    </v-hover>

    <v-main class="mx-6 my-3">
      <router-view/>
    </v-main>

    <v-footer dark padless>
      <v-row>
        <v-col cols="12">
          <v-card flat tile class="theme--dark lighten-1 white--text text-center">
            <v-card-text>
              <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                <v-icon size="24px">{{ icon }}</v-icon>
              </v-btn>
            </v-card-text>

            <v-card-text class="white--text pt-0">

            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
              {{ new Date().getFullYear() }} — <strong>My Startup</strong>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
// @ is an alias to /src
import router from "@/router";
export default {
  name: 'App',
  data: () => ({
    val: true,
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
      'mdi-youtube',
      'mdi-whatsapp',
    ],
  }),
  updated() {
    this.val = this.$store.state.authenticated;
  },
  mounted() {
    if(!localStorage.getItem('user')){
      this.val = false;
      router.push("/sign-up");
    }else
      this.val = true;
  },
  methods: {
    logOut() {
      localStorage.removeItem('user');
      this.$store.dispatch('changeAuthenticatedFalseAction');
      router.push("/log-in")
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Montserrat;
  background-color: #f5f5f5;
}

</style>