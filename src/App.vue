<template>
    <div>
        <div class="app">
            <router-view></router-view>
            <router-view name="LoginView"></router-view>
            <router-view name="RegisterView"></router-view>
            <router-view name="ForgetView"></router-view>
        </div>
    </div>
</template>

<script>
    //import homeView from './views/homeView.vue'
    export default {
        name: 'app',
    }
</script>
<style>

</style>