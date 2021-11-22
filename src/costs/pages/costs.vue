<template>
  <div class="costs" align="center">
    <v-card class="pa-8 mx-8" max-width="900">
      <v-card-title class="font-weight-bold pt-0">Create a Costs</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="description" label="Descripción"      ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="montoAsociado"           label="Monto Asociado"    type="number"             ></v-text-field>
        <v-text-field class="mb-3" :rules="rules" dense outlined  clearable hide-details  v-model="initOfinal"    label="Inicial o Final" placeholder="[F] o [I]"      ></v-text-field>
        <v-combobox   class="mb-3" :rules="rules" clearable outlined hide-details dense   v-model="oneBill" label="Letra" :items="bills"                ></v-combobox>
        <v-divider class="mt-5 mb-3"></v-divider>
        <v-card-actions>
          <v-btn outlined color="red" @click="reset">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn outlined color="indigo accent-4" :disabled="!valid" @click="createNewCost">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" color="success" dark>
      Costo creacdo exitosamente
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import CostsService from "@/costs/services/costs.service";

export default {
  name: "costs",
  data: () => ({
    snackbar: false,
    valid: true,
    description: '',
    montoAsociado: '',
    initOfinal: '',
    oneBill: '',
    bills: [],
    rules: [
      v => !!v || 'This field is required',
    ],
  }),
  mounted() {
    this.refreshListLetras();
  },
  methods: {
    createNewCost () {
      if(this.$refs.form.validate()) {
        let charLetra = this.oneBill[0];
        const Costes = {
          description: this.description,
          montoAsociado: this.montoAsociado,
          inicial_o_final: this.initOfinal,
          idLetra: { id: charLetra[0] },
        };
        CostsService.createNewCosts(Costes)
            .then((response) => {
              console.log("new costs:", response.data);
            });

        this.snackbar = true;
        this.reset();
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    refreshListLetras () {
      CostsService.getAllLetras()
        .then((response) => {
          this.bills = response.data.map(this.displayLetras)
          console.log(response.data);
          console.log("Letras: ", this.bills);
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