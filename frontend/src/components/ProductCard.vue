<template>
    <div class="anim flex flex-col w-[14vmax] mr-[2%] mb-4 ease-in duration-300 cursor-pointer">
        <img src="https://i.pinimg.com/564x/84/65/59/846559c29d322a0ffb574d0d193e2d1e.jpg" alt="" class="w-[14vmax]">
        <p class="text-3xl productname text-[2vmax]">{{product.name}}</p>
        <p class="text-xl text-red-500 font-semibold text-[1vmax]">Rs.{{product.price}}</p>
        <div class="my-1 flex">
            <div v-for="index in reviewFilledStars" :key="index">
                <span class="fa fa-star checked"></span>
            </div>
            <div v-for="index in reviewEmptyStars" :key="index">
                <span class="fa fa-star"></span>
            </div>
        </div>
        <div class="my-1">
           <p class="text-xl">{{product.reviews.length}} Reviews</p> 
        </div>
        <p class="hidden" id="product-id">{{product._id}}</p>
    <!-- <p>{{product._id}}</p> -->
        

        
    </div>
</template>

<script>
import internal from "stream"
import { computed, ref } from "vue"
export default {
    name:'ProductCard',
    props:['product'],
    setup(props){
        
       const reviewFilledStars = computed(()=>{
            return Math.round(props.product.ratings)   
        }) 
        const reviewEmptyStars = computed(()=>{
            return Math.round((5 - props.product.ratings))  
        })
        return{
            reviewEmptyStars,
            reviewFilledStars
        }
    }

    
    
    
}
</script>

<style scoped>
.checked{
    color:orange
}
.anim:hover{
    box-shadow: 0 0 5px rgba(15,15,15,0.26);
    transform: translateY(-1vmax)
}
.productname{
    font-size: 1.5vmax;
}
</style>

