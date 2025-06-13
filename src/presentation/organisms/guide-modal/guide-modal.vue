<template>
  <div class="container">
    <v-dialog
      class="guide-dialog"
      v-model="localDialog"
      persistent
      width="1024"
    >
      <v-card class="guide-card">
        <div>
          <v-card-title>
            <div class="title-card">
              <span class="text-h5">Guia Visual do Sistema</span>
              <v-btn
                icon="$close"
                size="small"
                variant="text"
                @click="closeDialog"
              ></v-btn>
            </div>
          </v-card-title>
          <StepGuide />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import StepGuide from '@/presentation/organisms/step-guide/step-guide.vue';
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  dialog: boolean;
}>();

const emit = defineEmits(['update:dialog']);

// Computed property to handle dialog state
const localDialog = computed({
  get: () => props.dialog,
  set: (value) => emit('update:dialog', value),
});

function closeDialog() {
  emit('update:dialog', false);
}
</script>

<style scoped>
* {
  margin: 50;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.tce-box {
  width: 100%;
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.05);
}

.title1 {
  text-align: left;
  color: #858796;
  font-size: 1.5rem;
  margin-bottom: 1%;
}

.description {
  text-align: left;
  color: #858796;
  font-size: 1.2rem;
  margin-bottom: 1%;
}

.tce-box section {
  height: 80%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  background-color: #f2f2f2;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2%;
}

.buttonTCE {
  display: inline-block;
  padding: 13px 15px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  outline: none;
  color: #fff;
  background-color: #078640;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px #999;
  margin-top: 1%;
}

.button:hover {
  background-color: #3e8e41;
}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(1px);
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 5%;
}

.card1 {
  position: relative;
  width: 400px;
  height: 200px;
  margin: 20px;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.5s ease;
}

.card1 img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.card1:hover {
  transform: scale(1.1);
  z-index: 1;
}

.title-card1 {
  text-align: left;
  color: #ffffff;
  font-size: 18px;
  margin: 0;
}

.carrosel {
  background-color: #078640;
}

.card2 {
  width: 400px;
  height: 200px;
  margin: 20px;
  background-color: white;
  box-shadow: 2px 2px 16px 0px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-card2 {
  width: 65px;
  height: 65px;
  margin-top: 5%;
}

.title-card2 {
  color: #858796;
  font-size: 18px;
  text-align: center;
  margin-top: 5%;
}

.card2:hover {
  transform: scale(1.1);
  z-index: 1;
}

.title-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
  }

  .card,
  .card1 {
    width: 45vh;
  }

  .guide-dialog {
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    height: 55rem;
  }

  .guide-card {
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    height: 100%;
  }
}
</style>
