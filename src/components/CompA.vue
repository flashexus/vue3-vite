<script setup>
 import CompB from './CompB.vue'
 import { counter } from '../store/countStore'
</script>

<template>
  <h2>CompAコンポーネント</h2>
  <p>CompA Count Store:{{counter.count}}</p>
  <CompB />
</template>