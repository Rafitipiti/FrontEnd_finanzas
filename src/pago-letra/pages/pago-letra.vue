<template>
  <div class="pago-letra" align="center">
    <v-card class="pa-8 mx-8" max-width="900">
      <v-card-title class="pt-0">
        <strong>Create a Pago Letra</strong>
        <v-spacer></v-spacer>
        <v-switch v-model="mora" inset
                  :label="`Mora: ${mora.toString()}`"
                  color="indigo accent-4"
                  class="mt-0 pt-0"
                  hide-details
        ></v-switch>
      </v-card-title>
      <v-form ref="form"  v-model="valid" lazy-validation>
        <v-combobox   class="mb-3" :rules="rules" clearable outlined hide-details dense   v-model="entidadFinanciera" label="Entidad Financiera" :items="entidadesFinancieras"   ></v-combobox>
        <v-combobox   class="mb-3" :rules="rules" clearable outlined hide-details dense   v-model="letra" label="Letra" :items="letras"   ></v-combobox>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="ic" label="Interes Compensatorio" v-if="mora"     ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="im" label="Interes Moratorio"     v-if="mora" ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="tCEPm" label="tCEPm"                               v-if="mora"    ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="valor_Entregado_Mora" label="Valo entregado mora" type="number" v-if="mora"    ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="diasMora" label="Dias de Mora" type="number"     ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="diasTranscurridos" label="Dias transcurridos" type="number"     ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense  outlined  clearable hide-details v-model="fechaPago"  label="Fecha pago"    placeholder="2019-02-03T00:00:00"></v-text-field>
        <v-divider class="mt-5 mb-3"></v-divider>
        <v-card-actions>
          <v-btn outlined color="red" @click="reset">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn outlined color="indigo accent-4" :disabled="!valid" @click="createNewPagoLetra">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" color="success" dark>
      Pago de letra creado exitosamente
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import PagoLetraService from '@/pago-letra/services/pago-letra.service'

export default {
  name: "pago-letra",
  data: () => ({
    valid: true,
    snackbar: false,
    entidadesFinancieras: [],
    letras: [],
    mora: false,
    im: 0,
    ic: 0,
    entidadFinanciera: '',
    letra: '',
    tCEPm: 0,
    valor_Entregado_Mora: 0,
    diasTranscurridos: '',
    diasMora: '',
    fechaPago: '',
    rules: [
      v => !!v || 'This field is required',
    ],
  }),
  mounted() {
    this.refreshListLetras();
    this.refreshListEntidades();
  },
  methods: {
    createNewPagoLetra(){
      if(this.$refs.form.validate()) {
        let charLetra = this.letra[0];
        let charEF = this.entidadFinanciera[0];
        const PagoLetra = {
          ic: this.ic,
          im: this.im,
          mora: this.mora,
          tCEPm:  this.tCEPm,
          valor_Entregado_Mora: this.valor_Entregado_Mora,
          dias_de_mora: this.diasMora,
          dias_transcurridos: this.diasTranscurridos,
          idEf:       { id: charEF[0]},
          idLetra:    { id: charLetra[0]},
          fecha_Pago: null
        };
        PagoLetraService.createNewPagoLetra(PagoLetra)
          .then((response) => {
            console.log("new Pago: ", response.data);
          })
        this.snackbar = true;
        this.reset();
      }

    },
    reset () {
      this.$refs.form.reset()
    },
    refreshListEntidades () {
      PagoLetraService.getAllEntidadesFinancieras()
          .then((response) => {
            this.entidadesFinancieras = response.data.map(this.displayEntidadesName)
            console.log(response.data);
            console.log("entidades:",this.entidadesFinancieras);
          })
    },
    displayEntidadesName(item){
      return [
        `${item.id} - ${item.nombre}`
      ]
    },
    refreshListLetras () {
      PagoLetraService.getAllLetras()
          .then((response) => {
            this.letras = response.data.map(this.displayLetras)
            console.log(response.data);
            console.log("Letras: ", this.letras);
          })
    },
    displayLetras(item){
      return [
        `${item.id} - Letra`
      ]
    }
  }
}
</script>

<style scoped>

</style>