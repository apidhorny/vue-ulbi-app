<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'MyButton',
};
</script>

<style scoped>
.btn {
    /* align-self: flex-end; */
    padding: 0.4rem;
    /* margin-bottom: 1rem; */
    background-color: rgb(255, 255, 255);
    border: 1px solid teal;
    color: teal;
    font-size: 16px;
    border-radius: 5%;
}
</style>
