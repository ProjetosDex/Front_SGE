<template>
  <div v-if="isSmallScreen">
    <v-bottom-navigation>
      <BottomBarNav></BottomBarNav>
    </v-bottom-navigation>
  </div>

  <div v-else>
    <SidebarMenu></SidebarMenu>
  </div>

  <HeaderLayout />

  <v-main>
    <div id="app-content">
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <v-overlay :model-value="true" class="align-center justify-center">
            <v-progress-circular
              color="#078640"
              size="64"
              indeterminate
            ></v-progress-circular>
          </v-overlay>
        </template>
      </Suspense>
    </div>

    <FooterLayout />
  </v-main>
</template>

<script lang="ts" setup>
import BottomBarNav from '@/components/mobile/bottom-bar-nav.vue';
import SidebarMenu from '@/components/sidebar-menu/sidebar-menu.vue';
import HeaderLayout from '@/components/header-layout/header-layout.vue';
import FooterLayout from '@/components/footer-layout/footer-layout.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isSmallScreen = ref(false);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
