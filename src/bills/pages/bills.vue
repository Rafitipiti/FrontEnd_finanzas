<template>
  <div class="bills" align="center">
    <v-card class="pa-8 mx-8" max-width="900">
      <v-card-title class="font-weight-bold pt-0">Create a Bills</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-combobox   class="mb-3" :rules="rules" clearable outlined hide-details dense   v-model="acreedor" label="Acreedor" :items="clientes"          ></v-combobox>
        <v-combobox   class="mb-3" :rules="rules" clearable outlined hide-details dense   v-model="deudor" label="Deudor" :items="clientes"            ></v-combobox>
        <v-combobox   class="mb-3" :rules="rules" clearable outlined hide-details dense   v-model="tasa" label="Tasa" :items="tasas"                ></v-combobox>
        <v-combobox   class="mb-3" :rules="rules" clearable outlined hide-details dense   v-model="entidadFinanciera" label="Entidad Financiera" :items="entidadesFinancieras"   ></v-combobox>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="valorNominal" label="Valor Nominal"      ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="td"           label="Td"                 ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense  outlined  clearable hide-details v-model="fechaInicio"  label="Fecha de inicio"    placeholder="2019-02-03T00:00:00"></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="lugarGiro"    label="Lugar de giro"      ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="pagoTextual"  label="Pago textual"       ></v-text-field>
        <v-divider class="mt-5 mb-3"></v-divider>
        <v-card-actions>
          <v-btn outlined color="red" @click="reset">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn outlined color="indigo accent-4" :disabled="!valid" @click="createNewBills">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" color="success" dark>
      Creo letra exitosamente
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import BillsService from '@/bills/services/bills.service'

export default {
  name: "bills",
  data: () => ({
    snackbar: false,
    valid: true,
    acreedor: '',
    deudor: '',
    tasa: null,
    entidadFinanciera: null,
    valorNominal: '',
    td: '',
    fechaInicio: '',
    lugarGiro: '',
    pagoTextual: '',
    clientes: [],
    tasas: [],
    entidadesFinancieras: [],
    rules: [
      v => !!v || 'This field is required',
    ],
  }),
  mounted() {
    this.refreshListDirectors();
    this.refreshListTasas();
    this.refreshListEntidades();
  },
  methods: {
    createNewBills () {
      if(this.$refs.form.validate()) {
          let charAcreedor = this.acreedor[0];
          let charDeudor = this.deudor[0];
          let charTasa = this.tasa[0];
          let charEf = this.entidadFinanciera[0];
          let idLogged = localStorage.getItem('user');
        const Bills = {
          idAcreedor: { id: charAcreedor[0] },
          idDeudor:   { id: charDeudor[0] },
          idTasa:     { id: charTasa[0] },
          idEf:       { id: charEf[0] },
          idUsuario:  { id: idLogged },
          valor_Nominal: this.valorNominal,
          td: this.td,
          Fecha_Inicio: this.fechaInicio,
          lugar_Giro: this.lugarGiro,
          pago_textual: this.pagoTextual,
        };
        BillsService.createNewBills(Bills)
            .then((response) => {
              console.log("new letter:", response.data);
            });
        this.snackbar = true;
        this.reset();
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    refreshListDirectors () {
      BillsService.getAllClients()
          .then((response) => {
            this.clientes = response.data.map(this.displayItemsName)
            console.log(response.data);
            console.log("clientes:",this.clientes);
          })
    },
    displayItemsName(item){
      return [
        `${item.id} - ${item.nombre} - Dinero: ${item.dinero}`
      ]
    },
    refreshListTasas () {
      BillsService.getAllTasas()
          .then((response) => {
            this.tasas = response.data.map(this.displayTasasName)
            console.log(response.data);
            console.log("tasas:",this.tasas);
          })
    },
    displayTasasName(item){
      return [
        `${item.id} - ${item.capitalizacion} - ${item.valor_Tasa} - ${item.tipo_Tasa} - ${item.plazo_Tasa}`
      ]
    },
    refreshListEntidades () {
      BillsService.getAllEntidadesFinancieras()
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
    }
  }
}
</script>

<style scoped>

</style>