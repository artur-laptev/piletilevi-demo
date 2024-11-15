<template>
  <div class="flex items-center gap-2 text-sm leading-4 mb-[30px]">
    <div>Back office</div>
    <div> > Codes</div>
    <div class="text-[#9A9A9A]">
      > Discounts
    </div>
  </div>

  <div class="flex justify-between flex-wrap md:flex-nowrap mb-3 gap-2">
    <div class="text-4xl font-mono font-bold leading-[48px]">
      Discounts
    </div>
    <div>
      <VButton
        v-data-test:add-discount-btn
        label="create new discount"
        class="uppercase"
        @click="openDiscountModal()"
      />
    </div>
  </div>

  <Transition
    mode="out-in"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div v-if="isDiscountsLoading">
      <VProgressSpinner class="w-full" />
    </div>
    <div v-else>
      <div class="flex items-center w-full lg:w-3/4 2xl:w-2/4 gap-3 mb-5 flex-wrap md:flex-nowrap">
        <VInputGroup>
          <VInputText
            v-model="filterQuery"
            type="text"
            placeholder="Discount name, code"
            :class="{ 'border-r-0': filterQuery }"
          />
          <VInputGroupAddon
            v-if="filterQuery"
            class="cursor-pointer hover:bg-gray/5"
            @click="filterQuery = ''"
          >
            <CloseIcon />
          </VInputGroupAddon>
          <VInputGroupAddon>
            <SearchIcon />
          </VInputGroupAddon>
        </VInputGroup>

        <VMultiSelect
          v-model="selectedCategories"
          :options="categoryOptions"
          option-label="label"
          option-value="value"
          placeholder="Applies to"
          class="w-full"
        >
          <template #dropdownicon>
            <SelectIcon />
          </template>
        </VMultiSelect>

        <VButton
          label="Clear All"
          variant="text"
          @click="clearFilters"
        />
      </div>

      <VTabs
        v-model:value="selectedTableTab"
        scrollable
        class="mb-5"
      >
        <VTabList>
          <VTab :value="TABLE_TABS.CURRENT">
            Currently active ({{ tableData[TABLE_TABS.CURRENT].length }})
          </VTab>
          <VTab :value="TABLE_TABS.UPCOMING">
            Upcoming ({{ tableData[TABLE_TABS.UPCOMING].length }})
          </VTab>
          <VTab :value="TABLE_TABS.ARCHIVED">
            Archived ({{ tableData[TABLE_TABS.ARCHIVED].length }})
          </VTab>
        </VTabList>
      </VTabs>


      <VDataTable
        v-data-test:discount-table
        :value="tableData[selectedTableTab]"
        striped-rows
        paginator
        :rows="10"
        :row-hover="true"
        paginator-template="PrevPageLink PageLinks NextPageLink"
        @row-click="canEdit && openDiscountModal($event)"
      >
        <VColumn
          field="name"
          header="Name"
          body-class="text-[#3C00E5] font-bold h-[57px]"
        />
        <VColumn
          field="category"
          header="Applies to"
        />
        <VColumn header="Time period">
          <template #body="{ data }">
            {{ getLocalDate(data.startDate) }} - {{ getLocalDate(data.endDate) }}
          </template>
        </VColumn>
        <VColumn
          field="discountAmount"
          header="Discount amount"
          header-class="w-0 text-nowrap"
        />
        <VColumn
          v-if="selectedTableTab !== TABLE_TABS.ARCHIVED"
          header-class="w-0"
          body-class="!py-3"
        >
          <template #body>
            <div class="bg-white border border-gray rounded-md p-[7px]">
              <PencilIcon />
            </div>
          </template>
        </VColumn>

        <template #paginatorprevpagelinkicon>
          <ArrowLeftIcon />
        </template>

        <template #paginatornextpagelinkicon>
          <ArrowRightIcon />
        </template>
      </VDataTable>
    </div>
  </Transition>
</template>

<script>
import { computed, ref } from 'vue';
import VInputGroup from 'primevue/inputgroup';
import VInputGroupAddon from 'primevue/inputgroupaddon';
import VInputText from 'primevue/inputtext';
import VButton from 'primevue/button';
import VDataTable from 'primevue/datatable';
import VColumn from 'primevue/column';
import VTabs from 'primevue/tabs';
import VTabList from 'primevue/tablist';
import VTab from 'primevue/tab';
import VProgressSpinner from 'primevue/progressspinner';
import VMultiSelect from 'primevue/multiselect';
import { useDialog } from 'primevue/usedialog';

import CloseIcon from '@/assets/icons/close.svg';
import SearchIcon from '@/assets/icons/search.svg';
import SelectIcon from '@/assets/icons/select-arrow.svg';
import PencilIcon from '@/assets/icons/pencil.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';

import { dataTest } from '@/directives/dataTest';
import { getDate, getLocalDate } from '@/utils';
import { useFetch } from '@/composables/fetch';

import AddEditDiscountModal from './AddEditDiscountModal.vue';

const CATEGORY_OPTIONS = [
  { label: "All events", value: "All events" },
  { label: 'Ticket type', value: 'Ticket type' },
  { label: 'Event', value: 'Event' },
  { label: 'Series', value: 'Series' },
];

const TABLE_TABS = {
  CURRENT: 'current',
  UPCOMING: 'upcoming',
  ARCHIVED: 'archived',
};

export default {
  components: {
    SearchIcon,
    CloseIcon,
    SelectIcon,
    PencilIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    VInputGroup,
    VInputGroupAddon,
    VInputText,
    VButton,
    VDataTable,
    VColumn,
    VTabs,
    VTabList,
    VTab,
    VProgressSpinner,
    VMultiSelect,
  },
  directives: {
    dataTest,
  },

  setup () {
    const filterQuery = ref('');
    const selectedCategories = ref(null);
    const selectedTableTab = ref(TABLE_TABS.CURRENT);

    const { data: discounts, isLoading: isDiscountsLoading } = useFetch('getDiscounts');

    const dialog = useDialog();

    const filteredDiscounts = computed(() => discounts.value?.filter(d => {
      let result = true;

      if (filterQuery.value) {
        result = d.name.toLowerCase().includes(filterQuery.value.toLowerCase());
      }

      if (result && selectedCategories.value?.length) {
        const values = selectedCategories.value;

        result = !values.length || values.map(d => d.toLowerCase()).includes(d.category.toLowerCase());
      }

      return result;
    }) || [])

    const activeDiscounts = computed(
      () => filteredDiscounts.value?.filter(d => getDate(new Date()).isBetween(d.startDate, d.endDate, 'day', '[]'))
    )

    const upcomingDiscounts = computed(
      () => filteredDiscounts.value?.filter(d => getDate(new Date()).isBefore(d.startDate))
    )

    const archivedDiscounts = computed(
      () => filteredDiscounts.value?.filter(d => getDate(new Date()).isAfter(d.endDate))
    )

    const tableData = computed(() => ({
      [TABLE_TABS.CURRENT]: activeDiscounts.value,
      [TABLE_TABS.UPCOMING]: upcomingDiscounts.value,
      [TABLE_TABS.ARCHIVED]: archivedDiscounts.value,
    }));

    const canEdit = computed(() => selectedTableTab.value !== TABLE_TABS.ARCHIVED);

    const clearFilters = () => {
      filterQuery.value = '';
      selectedCategories.value = null;
    }

    const openDiscountModal = ({ data } = {}) => {
      dialog.open(AddEditDiscountModal, {
        props: {
          header: data ? 'Edit discount' : 'Create discount',
          modal: true,
          dismissableMask: true,
          style: {
            width: '50vw',
          },
          breakpoints:{
            '960px': '75vw',
          },
        },
        data: {
          categoryOptions: CATEGORY_OPTIONS,
          item: data,
          isEditMode: !!data,
        }
      });
    }

    return {
      TABLE_TABS,
      getLocalDate,
      filterQuery,
      categoryOptions: CATEGORY_OPTIONS,
      selectedCategories,
      isDiscountsLoading,
      tableData,
      selectedTableTab,
      clearFilters,
      openDiscountModal,
      canEdit,
    }
  }
}
</script>