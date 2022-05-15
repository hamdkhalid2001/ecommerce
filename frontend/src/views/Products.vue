<script>
import ProductCard from '../components/ProductCard.vue'
import { onMounted, ref } from 'vue'
export default {
    setup(){
        console.log("Just checking git")
        let data = ref()
        let error = ref()
        let categories = ref([])
        onMounted(()=>{
        fetch('http://localhost:4000/products',{
        }).then((res) => res.json())
        .then((json) => {
                        data.value = json
                        data.value = data.value.getProducts
                        data.value.forEach((element,index) => {
                          categories.value[index] = element.category
                        });
                        console.log("Categories:  ",categories.value)
                        categories.value = [...new Set(categories.value)]
                        console.log("Set",categories.value)
                        })
        .catch((err) => (error.value = err)) 
        })
        return{
            data,
            error,
            categories,
        } 
    },components:{
        ProductCard
    }
}
</script>

<template>
<div class="flex ">
  <div class="categories w-[20vw] my-20 ml-[2vw]  font-semibold" >
    <p class="text-lg ">Categories</p>
    <div v-for="category in categories" :key="category" class="ml-4 text-sm font-thin">
      {{category}}
    </div>
    <!-- <p >{{category}}</p> -->
    
  </div>
  <div class="products w-[80vw]" >
    <div class="flex justify-center">
        <div class="text-center mx-8 my-8 px-[8vw] pb-5" style="border-bottom:5px solid lightgray">
            <p class=" text-4xl font-light">Products</p>
        </div>
    </div>
    <div class="products-list flex mx-8 my-10 flex-wrap items-center justify-center">
        <div v-for="product in data" :key="product._id" class="mr-[1vw]">
            <ProductCard :product = 'product'/>
        </div>
    </div>
  </div>
</div>
</template>



<style>

</style>