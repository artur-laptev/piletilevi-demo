<template>
  <TheHeader />
  <main>
    <div class="mx-auto max-w-screen-2xl py-5 px-5">
      <DiscountsPage />
    </div>
  </main>

  <DynamicDialog />
</template>

<script>
import DynamicDialog from 'primevue/dynamicdialog';

import TheHeader from '@/layout/TheHeader.vue';
import DiscountsPage from '@/views/Discounts/DiscountsPage.vue';

export default {
  components: {
    TheHeader,
    DiscountsPage,
    DynamicDialog,
  },
}
</script>