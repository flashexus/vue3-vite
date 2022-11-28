<script>
//root要素のdivにclassを適用しないようにする
export default {
  inheritAttrs:false
}
</script>

<script setup>
import { useAttrs } from 'vue';
import { ref,reactive,computed, watch, watchEffect } from 'vue'

import Input from './Input.vue';
import { useStoreCounter } from '../stores/counter'


const attrs = useAttrs()

//コンポーネント動作確認
//Propsの設定(親⇒子へのデータを受け取る)
//Propsにはrequiredで入力必須にすることが可能
//Propsには初期値を設定することが可能
//Propsを計算や判定で使用する場合は親側でバインドしなければらない
const {name, message, price, isAdmin} = defineProps({
    message:{ 
      type:String, required:true },
    name: { 
      type:String, default:'Jane' },
    price:{
      type:Number,
    },
    isAdmin: Boolean,

})

const username = ref(name)
const emit = defineEmits({
  changeNameEvent: (name) =>{
    if (name) return name
    return false
  }
})

const changeName = () => {
  emit('changeNameEvent',username.value)
}

//pinia 
const counter = useStoreCounter()
//patchを使うと直接stateに値を代入できる
const patch = () =>{
  counter.$patch({
    count:100,
    user: {
      name: 'Jane Doe'
    }
  })
} 

//stateを丸ごと置き換えることもできる
const replace = () => {
  counter.$state = { 
    count:100,
    count2:200,
  }

}

</script>

<template>
  <!-- inheritAttrsがtrueの場合、親側で設定されたclass="active"がdivに自動で設定される -->
  <div>
    <h2 class="info">props/emitを使ったコンポーネント</h2>
    <p>{{ name }} {{ message }}</p>
    <!-- priceを計算で使用するためには親側でバインドしなければならない -->
    <p> {{ price + 100}}</p>
    <p v-if="isAdmin">管理者です</p>
    <p v-else>管理者ではありません</p>
      <!-- 親側で設定されたclass="active"がdivに自動で設定される -->
    <p :style="attrs.style" :class="attrs.class">class属性の渡し方確認中</p>
    <Input :model-value="username" disabled/>
    <Input :model-value="username" @update:modalvalue="username = $event"/>
    <button @click="changeName">Appコンポーネントへ通知</button>

    <h2> Hello Pinia</h2>
    <p>カウント：{{ counter.count }}</p>
    <p>ダブルカウント：{{ counter.dobleCount }}</p>
    <button @click="patch">Patch</button>
    <button @click="counter.$reset">カウント クリア</button>
    <button @click="replace">カウント リプレイス</button>
  </div>
</template>