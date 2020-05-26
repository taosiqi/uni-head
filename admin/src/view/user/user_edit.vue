<template>
    <div>


    </div>
</template>

<script>
    export default {
        name: 'user_edit',
        props: {
            edit_info: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        data() {
            return {
                edit_dialog:false,
            };
        },
        computed: {},
        created() {
        },
        methods: {

        }
    };
</script>

<style scoped>

</style>
