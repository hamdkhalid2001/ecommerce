<template>
  <div>
    <div class="bg-gray-900">
      <nav
        class="
          container
          px-5
          py-5
          mx-auto
          md:flex md:justify-between md:items-center
        "
      >
        <div class="flex items-center justify-between">
          <router-link
            to="/"
            class="
              text-xl
              font-bold
              text-red-600
              md:text-2xl
              hover:text-blue-400
              cursor
            "
            >ECOMMERCE
          </router-link>
          <!-- Mobile menu button -->
          <div @click="showMenu = !showMenu" class="flex md:hidden">
            <button
              type="button"
              class="
               text-red-600
                hover:text-gray-400
                focus:outline-none focus:text-gray-400
              "
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>


        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <ul
          :class="showMenu ? 'flex' : 'hidden'"
          class="
            flex-col
            mt-8
            space-y-4
            md:flex
            md:space-y-0
            md:flex-row
            md:items-center
            md:space-x-10
            md:mt-0
          "
        >
        <router-link to="/">
          <li class="text-sm font-bold text-white hover:text-blue-400 cursor-pointer">
            Home
          </li>
        </router-link> 
        <router-link to="/products">
          <li class="text-sm font-bold text-white hover:text-blue-400 cursor-pointer">
            Products
          </li>
        </router-link>
        <router-link to="/contact">
          <li class="text-sm font-bold text-white hover:text-blue-400 cursor-pointer">
            Contact
          </li>
        </router-link> 
        <router-link to="/about">
          <li class="text-sm font-bold text-white hover:text-blue-400 cursor-pointer">
            About
          </li>
        </router-link>
        </ul>
      </nav>
    </div>
    <router-view /> 
  </div>
  
</template>
<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>