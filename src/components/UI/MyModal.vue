<template>
    <div class="modal" v-if="show" @click="closeModal">
        <div @click.stop class="modal__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyModal',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        closeModal() {
            this.$emit('update:show', false);
        },
    },
};
</script>

<style scoped>
.modal {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
}
.modal__content {
    margin: auto;
    background: white;
    padding: 2rem;
    border-radius: 5%;
    min-height: 60px;
    min-width: 300px;
}
</style>
