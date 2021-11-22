<template>
  <div class="client" align="center">
    <v-card class="pa-8 mx-8" max-width="900">
      <v-card-title class="font-weight-bold pt-0">Create a Client</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field class="mb-3" dense :rules="rulesDNI" v-model="dni"        label="DNI"  type="number" outlined  clearable hide-details></v-text-field>
        <v-text-field class="mb-3" dense :rules="rules" v-model="dinero"     label="Dinero"  type="number" outlined  clearable hide-details></v-text-field>
        <v-text-field class="mb-3" dense :rules="rules" v-model="domicilio"  label="Dirección de domicilio"  outlined  clearable hide-details></v-text-field>
        <v-text-field class="mb-3" dense :rules="rules" v-model="localidad"  label="Localidad"  outlined  clearable hide-details></v-text-field>
        <v-text-field class="mb-3" dense :rules="rules" v-model="nombre"     label="Nombre y Apellido"  outlined  clearable hide-details></v-text-field>
        <v-text-field class="mb-3" dense :rules="rulesPhone" v-model="telefono"   label="Telefono"  type="number" outlined  clearable hide-details></v-text-field>

        <v-card-title class="font-weight-bold pt-3">Create a Financial Entity</v-card-title>
        <v-text-field class="mb-3" dense :rules="rules" v-model="entidadFinanciera"   label="Entidada Financiera"  outlined  clearable hide-details></v-text-field>
        <v-divider class="mt-5 mb-3"></v-divider>
        <v-card-actions>
          <v-btn outlined color="red" @click="reset">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn outlined color="indigo accent-4" :disabled="!valid" @click="createNewClient">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar"  color="success" dark>
      Cliente & Entidad Financiera creadas exitosamente
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import ClientService from '@/client/services/client.service'
import FinancialEntityService from '@/client/services/financial-entity.service'

export default {
  name: "client",
  data: () => ({
    snackbar: false,
    color: '',
    valid: true,
    text:'',
    dni:      '',
    dinero:   '',
    domicilio:'',
    localidad:'',
    nombre:   '',
    telefono: '',
    entidadFinanciera: '',
    rules: [
      v => !!v || 'This field is required',
    ],
    rulesPhone: [
      v => !!v || 'This field is required',
      v => v <= 999999999 && v >= 900000000 || 'This phone invalid',
    ],
    rulesDNI: [
      v => !!v || 'This field is required',
      v => v <= 99999999 && v >= 10000000 || 'This DNI is invalid',
    ]
  }),
  methods: {
    createNewClient () {
      if(this.$refs.form.validate()) {
        const client = {
          dni:      this.dni,
          dinero:   this.dinero,
          domicilio:this.domicilio,
          localidad:this.localidad,
          nombre:   this.nombre,
          telefono: this.telefono,
        };
        const entity = {
          nombre: this.entidadFinanciera,
        }
        ClientService.createClient(client)
          .then((response) => {
            console.log("new client:", response.data);
          });
        FinancialEntityService.createNewFinancialEntity(entity)
          .then((response) => {
            console.log("new financial entity: ", response.data);
          })
        this.snackbar = true;
        this.reset();
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>

</style>