<script>
import ProductCard from './ProductCard.vue'
import { onMounted, ref } from 'vue'
export default{
    setup(){
        let data = ref()
        let error = ref()
        onMounted(()=>{
        fetch('http://localhost:4000/featured/products',{
        }).then((res) => res.json())
        .then((json) => {
                        data.value = json
                        data.value = data.value.getProducts
                        console.log(data.value)
                        })
        .catch((err) => (error.value = err)) 
        })
        return{
            data,
            error,
        } 
    },components:{
        ProductCard
    }
  
}
</script>

<template>
<div>
    <div class="flex justify-center">
        <div class="text-center mx-8 my-8 px-24 pb-5" style="border-bottom:5px solid lightgray">
        <!-- <p>{{data}}</p> -->
            <p class=" text-4xl font-light">Featured Products</p>
        </div>
    </div>
    
    <div class="products-list flex mx-8 my-10 flex-wrap items-center justify-center">
        <div v-for="product in data" :key="product._id" class="mr-[1vw]">
            <ProductCard :product = 'product'/>
        </div>
    </div>
</div>
  
</template>

<style>

</style>