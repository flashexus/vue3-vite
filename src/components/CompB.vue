<script setup>
 import { inject } from 'vue'
 import { counter } from '../store/countStore'

 const { count,addCount } = inject('count')
</script>

<template>
  <h3>CompBコンポーネント</h3>
  <p>CompB Count:{{ count }}</p>
  <button @click="addCount">+</button>
  <br>
  <p>Store Count:{{ counter.count }}</p>
  <button @click="counter.addCount">+</button>

</template>