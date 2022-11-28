<script setup>
import { ref,reactive,computed, watch, watchEffect,provide } from 'vue'
import Hello from './components/Hello.vue';
import User from './components/User.vue';
import Tokyo from './components/Tokyo.vue';
import Kyoto from './components/Kyoto.vue';
import CompA  from './components/CompA.vue';

const users = [
  { id: 1, name: 'John Doe', email: 'john@test.com', admin: true },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', admin: false },
  { id: 3, name: 'Kevin MacDonald', email: 'kevin@test.com', admin: false },
];

const adminUser =  computed( () => users.filter((user) => user.admin === true))

////////////// reactive変数の使い方 //////////////
// reactive,ref変数を使用することで
const user = reactive({ firstName: 'John', lastName: 'Doe' })


////////////// computedの使い方 //////////////
const cFullName = computed( {
  get(){
  //  return ` ${Math.random()} ${user.firstName} ${user.lastName}`
    return `${user.firstName} ${user.lastName}`
  },
  // computedで値を変更する場合はgetterとは別にsetterを設定する
  set(newValue){
    const names = newValue.split(' ')
    user.firstName = names[0]
    user.lastName = names[names.length-1]
  }
} );

const changeName = () =>{
  //setterを使用してuserを変更
  cFullName.value = 'Jane Doe';
}

//////////// watcher の使い方 ///////////////
const count = ref(0)
watch(count, (count,previusCount) =>{
  console.log('previusCount:',previusCount) 
  console.log('count:',count) 
})

//objectのwatchも可能
const state = reactive({
  count:0
})
watch(
  () => state, 
  (state,previousState) => {
    console.log('state:',state)
    console.log('previusState:',previousState)
  },
  //deep=trueに変更するとオブジェクトの変更を検知,immediate=trueで初期化時に実行
  { deep:true, immediate: true }
)

const count2 = ref(100)

//watchEffectの中に記述した関数で記述されている変数の変更を検知してくれる
watchEffect(() =>console.log(`${count.value}/${count2.value}`))

//コンポーネント渡し用
const name = ref("John")


//コンポーネントからemit受け取り用
const handleEvent = (newName) =>{
  console.log('子コンポーネントからの通知')
  cFullName.value = newName;
}

// Dynamic コンポーネント
const city = ref('Tokyo')

const tabs = {
  Tokyo:Tokyo,
  Kyoto:Kyoto
}
const tab = computed(() => tabs[city.value])

// provide/ inject
//子コンポーネントにデータを提供
//第一引数：key , 第二引数:value
const addCount = () => {
  count.value++
}
provide('count',{ count,addCount } )

</script>

<template>
  <h1>Vue 3 入門</h1>
  <br>
  <ul>
    <User>
      <template v-slot:title><h2>slot機能を使ったコンポーネント</h2></template>
      <template v-slot:default="{ user }">
        <li>{{user.name}}</li>
      </template>
    </User>
  </ul>
  <br>

  <button @click="changeName">Change Name</button>
  <button @click="count++">ref Count:{{ count }}</button>
  <button @click="count2++">ref Count2:{{ count2 }}</button>
  <button @click="state.count++">reactive Count:{{ state.count }}</button>
  <br>

  <!-- computedと関数では同じように使ってもキャッシュの効きが違う -->
  <input v-model="user.firstName" type="text">
  <input v-model="user.lastName" type="text">
  <br>

  <!------------------- コンポーネント呼び出し --------------------------->
  <br>
  <Hello 
    message="Propsの使い方" :name=cFullName :price=1000 :isAdmin=true class="active" id="main" style="color:red" 
    @changeNameEvent="handleEvent"  
  />
  <!-- <Hello  name="John" /> ←警告しか出ない -->

  <!------------------- Dynamicコンポーネント呼び出し --------------------------->
  <br>
  <h1>Dynamicコンポーネント</h1>
  <div>
    <button @click="city= 'Tokyo'">東京</button>
    <button @click="city= 'Kyoto'">京都</button>
  </div>
  <div>
    <keep-alive>
      <Tokyo v-if="city=='Tokyo'"/>
      <Kyoto v-else /> 
    </keep-alive>
    <!-- ↑と等価 keep aliveがあることで子の内部状態が保持される -->
    <!-- <keep-alive><component v-bind:is="tab"></component></keep-alive> -->
  </div>

  <!-- Provide / Inject -->
  <br>
  <h1>Provide/Injectの使い方</h1>
  <CompA />

</template>