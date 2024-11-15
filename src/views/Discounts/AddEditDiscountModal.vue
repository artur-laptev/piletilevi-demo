<template>
  <div class="flex flex-col gap-4">
    <VInputText
      v-model="form.name"
      v-data-test="{ el: 'discount-name' }"
      type="text"
      placeholder="Discount name"
      class="w-full"
    />
    <div class="flex flex-wrap sm:flex-nowrap gap-4">
      <VSelect
        v-model="form.category"
        v-data-test="{ el: 'discount-category' }"
        :options="dialogRef.data.categoryOptions"
        option-label="label"
        option-value="value"
        placeholder="Applies to"
        class="w-full"
      >
        <template #dropdownicon>
          <SelectIcon />
        </template>
      </VSelect>

      <VButton
        :label="dialogRef.data.isEditMode ? 'edit': 'add'"
        class="uppercase"
      />
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import VInputText from 'primevue/inputtext';
import VButton from 'primevue/button';
import VSelect from 'primevue/select';

import { dataTest } from '@/directives/dataTest';
import SelectIcon from '@/assets/icons/select-arrow.svg';

export default {
  components: {
    VInputText,
    VSelect,
    VButton,
    SelectIcon,
  },
  directives: {
    dataTest,
  },

  setup () {
    const dialogRef = inject('dialogRef');

    const form = ref(dialogRef.value.data.item || {})

    return {
      form,
      dialogRef,
    }
  }
}
</script>