<template>
  <div class="sign-up">
    <v-container class="mt-5 px-4">
      <v-row>
        <v-col cols="12" align="center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card max-width="400" :class="`elevation-${hover ? 24 : 3}`" class="transition-swing" >
                <v-card-title class="justify-center font-weight-bold mb-2">Sign Up</v-card-title>

                <v-card-text class="pb-0">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        class="mb-2"
                        hide-details="auto"
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        placeholder="example@mail.com"
                        required outlined
                    >
                      <template v-slot:append>
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-email-outline</v-icon>
                          </template>
                          Write here the email you registered
                        </v-tooltip>
                      </template>
                    </v-text-field>

                    <v-text-field
                        class="mb-2"
                        hide-details="auto"
                        v-model="password"
                        :rules="passwordRules"
                        label="Password"
                        placeholder="*******"
                        type="password"
                        required outlined
                    >
                      <template v-slot:append>
                        <v-tooltip right>
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
                  <v-btn class="font-weight-bold"
                         color="indigo accent-4"
                         text @click="submit">
                    Create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card max-width="400" :class="`elevation-${hover ? 24 : 3}`" class="transition-swing mt-5 flex">
                <v-card-actions class="pl-5">
                  Login here
                  <v-spacer></v-spacer>
                  <v-btn text class="font-weight-bold"
                         color="indigo accent-4" to="/log-in">Here</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SignupService from '@/sign-up/services/sign-up.service'
import router from "@/router";
export default {
  name: "sign-up",
  data: () => ({
    valid: true,
    email: '',
    password: '',
    usuario: {
      contrasena: '',
      correo: ''
    },
    passwordRules: [ v => !!v || 'Password is required'],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  mounted() {
    this.$store.dispatch('changeAuthenticatedFalseAction')
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    submit() {
      if(this.$refs.form.validate()) {
        this.usuario.correo = this.email;
        this.usuario.contrasena = this.password;
        SignupService.CreateUserEmail(this.usuario)
        .then(response => {
          console.log(response.data);
          router.push("log-in");
        })
      }
    }
  }
}
</script>

<style scoped>

</style>