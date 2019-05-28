<template>
    <div class="pages-view">
        <banner></banner>
        <router-view></router-view>
    </div>
</template>

<script>
    import banner from '../components/nav.vue'
    export default {
        name: 'pages-view',
        components: {
            banner
        },
        data() {
            return {}
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            getUsers() {
                console.log(this.$ajax)
                this.$ajax.get('http://192.168.0.102:8000/api/users')
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style>

</style>