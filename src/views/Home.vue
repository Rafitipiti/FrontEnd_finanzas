<template>
  <div class="home">
    <v-card>
      <v-card-title>Sample title</v-card-title>
        <v-container>
          <v-row >
            <v-col cols="6">
              <v-card-text>First Column</v-card-text>
            </v-col>
            <v-col cols="6">
              <v-card-text>
                <p>Second Column</p>
                <p>Second Column</p>
                <p>Second Column</p>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
    </v-card>
  </div>
</template>

<script>
import HomeService from '@/views/services/home.service'

export default {
  name: 'Home',
  data: () => ({
    rate: {
      Fecha_Inicio: '',
      Fecha_Fin: '',
      id: '',
      idTasa: '',
      sumadeCostesFinales: '',
      sumadeCostesIniciales: '',
      beneficioEF: '',
      valor_Nominal: '',
      retencion: '',
      lugar_Giro: '',
      fecha_Inicio: '',
      idEf: '',
      pago_textual: '',
      idUsuario: '',
      fecha_Fin: '',
      descuento: '',
      td: '',
      dt: '',
      valor_Neto: '',
      idAcreedor: '',
      tcep: '',
      idDeudor: '',
      valor_Entregado: '',
      valor_Recibido: '',
    }
  }),
  created() {
  },
  methods: {
    selectData(){
      HomeService.getById(3)
        .then((response) => {
          this.rate = response.data;
          console.log(response.data)
        })
        .catch( e =>{
          console.log(e);
        })
    }
  }
}
</script>
