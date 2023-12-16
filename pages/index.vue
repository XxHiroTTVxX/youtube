<script lang="ts" setup>
import "./assets/css/main.css"

const { data: cards } = await useFetch('/api/popular')

</script>

<template>
    <Header />
    <div class="identifier">
        <h1 class="Identifier">Popular</h1>
    </div>     
    <div class="container">
        <div v-for="card in cards" class="card">
            <img :src="card.thumbnail" alt="card.title" />
            <div class="card-info">
                <h3>{{ card.title }}</h3>
                <p>{{ card.author }}</p>
                <p>{{ card.views }} views • {{ card.time }}</p>
                <p>{{ card.duration }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
