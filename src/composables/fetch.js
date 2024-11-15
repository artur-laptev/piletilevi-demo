import { ref } from "vue"

import * as api from '@/api';

export const useFetch = (fetchFuncName) => {
  const data = ref(undefined);
  const isLoading = ref(false);

  const fetch = async () => {
    isLoading.value = true;

    data.value = await api[fetchFuncName]()
      .finally(() => {
        isLoading.value = false;
      });
  }

  fetch();

  return {
    data,
    isLoading,
  };
};