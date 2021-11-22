<template>
  <div class="tasa" align="center">
    <v-card class="pa-8 mx-8" max-width="900">
      <v-card-title class="font-weight-bold pt-0">Create a Rate</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field class="mb-3" :rules="rules" dense v-model="plazoTasa"  label="Plazo Tasa"  outlined  clearable hide-details></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense v-model="tipoTasa"  label="Tipo Tasa"  outlined  clearable hide-details></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense v-model="valorTasa"  label="Valor Tasa" type="number" outlined  clearable hide-details></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense v-model="capitalizacion"  label="Capitalización"  outlined  clearable hide-details></v-text-field>
        <v-divider class="mt-5 mb-3"></v-divider>
        <v-card-actions>
          <v-btn outlined color="red" @click="reset">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn outlined color="indigo accent-4" :disabled="!valid" @click="createNewTasa">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" color="success"  dark>
      ¡Tasa creada correctamente!
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

import TasaService from '@/views/services/tasa.service';

export default {
  name: 'tasa',
  data: () => ({
    snackbar: false,
    valid: true,
    plazoTasa: '' ,
    tipoTasa: '',
    valorTasa: '',
    capitalizacion: '',
    rules: [
      v => !!v || 'This field is required',
    ]
  }),
  methods: {
    createNewTasa () {
      if(this.$refs.form.validate()){
        const tasa = {
          plazo_Tasa: this.plazoTasa,
          tipo_Tasa: this.tipoTasa,
          valor_Tasa: this.valorTasa,
          capitalizacion: this.capitalizacion,
        };
        TasaService.createTasa(tasa)
            .then((response) => {
              this.snackbar = true;
              console.log(response.data);
            });
        this.reset();
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}

</script>