<template>
    <div class="pages-view">
        <banner></banner>
        <router-view></router-view>
    </div>
</template>

<script>
    import banner from '../components/nav.vue'    
    export default {
        name:'pages-view',
        components:{banner},
        data () {
            return {
            }
        },
    }
</script>

<style>
</style>