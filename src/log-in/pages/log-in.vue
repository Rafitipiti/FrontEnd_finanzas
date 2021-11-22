<template>
  <div class="log-in mt-15 pt-15">
    <v-container class="mt-5 px-4">
      <v-row>
        <v-col cols="12" align="center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card max-width="400" :class="`elevation-${hover ? 24 : 3}`" class="transition-swing" >
                <v-card-title class="justify-center font-weight-bold mb-2">Log In</v-card-title>

                <v-card-text class="pb-0">
                  <v-form ref="form" lazy-validation>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        placeholder="example@mail.com"
                        required outlined
                    >
                      <template v-slot:append>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-email-outline</v-icon>
                          </template>
                          Write here the email you registered
                        </v-tooltip>
                      </template>
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="Password"
                        placeholder="*******"
                        type="password"
                        required outlined
                    >
                      <template v-slot:append>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-key-outline</v-icon>
                          </template>
                          Your password is not displayed
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn color="error"
                         class="font-weight-bold"
                         text @click="reset">
                    Reset Form
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                         class="font-weight-bold"
                         color="indigo accent-4"
                         text @click="submit">
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    <!--<v-snackbar v-model="snackbar" color="error" dark>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>-->
  </div>
</template>

<script>
import LoginService from '@/log-in/services/log-in.service'
import router from "@/router";

export default {
  name: "log-in",
  data: ()=>({
    email: '',
    password: '',
    found: false,
    usuario: {
      id: '',
      contrasena: '',
      correo: '',
    },
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  created() {
    this.found=false;
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    submit(){
      LoginService.FindByEmail(this.email)
          .then((response) => {
            this.usuario=response.data;
            localStorage.setItem('user', JSON.stringify(this.usuario.id));
            this.$store.dispatch('changeAuthenticatedTrueAction')
            router.push('/')
            console.log(response.data);
          })
          .catch(e=>{
            this.found=false;
            console.log(e);
          })
    }
  }
}
</script>

<style scoped>

</style>