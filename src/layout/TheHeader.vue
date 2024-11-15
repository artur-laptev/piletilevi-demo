<template>
  <header>
    <nav class="w-full bg-white shadow-pl overflow-auto no-scrollbar">
      <div class="px-10 h-[80px]">
        <div class="flex items-center justify-between h-full">
          <div class="flex items-center h-full">
            <div class="block shrink-0 mt-[30px] my-auto">
              <img
                src="@/assets/images/logo.svg?url"
                alt="logo"
              >
            </div>
            <div class="block ml-14 mt-[30px]">
              <ul
                class="flex text-nowrap text-lg leading-6 font-bold text-center"
                role="tablist"
              >
                <li
                  class="me-11"
                  role="presentation"
                >
                  <button
                    class="active-item text-primary pb-[26px]"
                    type="button"
                    role="tab"
                  >
                    Back office
                  </button>
                </li>
                <li
                  class="me-11"
                  role="presentation"
                >
                  <button
                    class="text-lg leading-6 font-bold"
                    type="button"
                    role="tab"
                  >
                    Reports
                  </button>
                </li>
                <li
                  class="me-11"
                  role="presentation"
                >
                  <button
                    class="text-lg leading-6 font-bold"
                    type="button"
                    role="tab"
                  >
                    Help
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex items-center ml-[100px] h-[26px]">
            <div class="flex items-center mr-[30px]">
              EN
              <SelectIcon class="ml-1" />
            </div>
            <div>
              Name Surname
            </div>
            <div class="h-full bg-gray w-[1px] mx-2.5" />
            <div class="flex items-center">
              Noorsooteater
              <SelectIcon class="ml-2.5" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import SelectIcon from '@/assets/icons/select-arrow.svg';

export default {
  components: {
    SelectIcon,
  }
}
</script>

<style lang="scss" scoped>
.active-item {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 4px;
    background-color: currentColor;
    border-radius: 10px;
  }
}
</style>