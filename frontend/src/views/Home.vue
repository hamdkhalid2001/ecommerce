<script setup>
import FeaturedProducts from '../components/FeaturedProducts.vue';

</script>


<template>
<div>
    <img src="../images/home3.jpg" alt="Home Pic" class="w-[100%] h-auto">
    <div class="featured-products mt-[10vh]">
        <FeaturedProducts/>
    </div>
</div>

</template>
<script>
export default {
    
// http://localhost:4000/featured/products
}
</script>


<style>
p{
    font-size: 2vmax;
}
</style>