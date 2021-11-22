<template>
  <div class="execute" align="center">
    <v-card class="pa-8 mx-8" max-width="900">
      <v-card-title class="font-weight-bold pt-0">All Bills</v-card-title>
      <v-expansion-panels accordion flat dark>
        <v-expansion-panel v-for="val in values" :key="val.id">
          <v-expansion-panel-header @click="executeByID(val.id)">Letra número - {{ val.id }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form ref="form">
              <v-row>
                <v-col>
                  <v-text-field class="mb-3" dense readonly :value="val.idUsuario.correo"   label="Usuario"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.Fecha_Inicio"        label="Fecha Inicio"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.sumadeCostesIniciales"  label="Suma Costes Iniciales"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.valor_Nominal"  label="Valor Nominal"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.dt"     label="Td"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.descuento"   label="Descuento"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.valor_Neto"     label="Valor Neto"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.lugar_Giro"   label="Lugar de Giro"  outlined  hide-details></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field class="mb-3" dense readonly :value="val.idEf.nombre"   label="Entidad Financiera"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.beneficioEF"     label="Beneficio EF"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.idTasa.capitalizacion"  label="Tasa Capitalización"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.idTasa.tipo_Tasa"  label="Tipo de Tasa"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.idTasa.valor_Tasa"     label="Valor de Tasa"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.idTasa.plazo_Tasa"   label="Plazo de Tasa"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.fecha_Inicio"   label="Fecha Inicio"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.pago_textual"   label="Pago Textual"  outlined  hide-details></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field class="mb-3" dense readonly :value="val.td"        label="Tiempo descuento"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.tcep"     label="Costo Efectivo"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.valor_Recibido"  label="Valor recibido"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.valor_Entregado"  label="Valor entregado"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.idDeudor.nombre"   label="Deudor"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.idDeudor.dinero"   label="Dinero Deudor"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.idAcreedor.nombre"   label="Acreedor"  outlined  hide-details></v-text-field>
                  <v-text-field class="mb-3" dense readonly :value="val.idAcreedor.dinero"   label="Dinero Acreedor"  outlined  hide-details></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
import ExecuteService from '@/execute/services/execute.service'

export default {
  name: "execute",
  data: () => ({
    values: [],
  }),
  updated() {
    this.refreshList();
  },
  mounted() {
    this.getOneBills();
    this.refreshList();
    this.getOneBills();
  },
  created() {
    this.getOneBills();
    this.refreshList();
    this.getOneBills();
  },
  methods: {
    getOneBills(){
      ExecuteService.getAll()
        .then((response) => {
          this.values = response.data;
          this.refreshList();
          console.log("Response: ", response.data)
        })
        .catch( e => {
          console.log(e);
        })
    },
    executeByID(id){
      ExecuteService.executeId(id);
    },
    refreshList(){
      for (var i = 1; i <= this.values.length; i++) {
        this.executeByID(i)
      }
    }
  }
}
</script>

<style scoped>

</style>