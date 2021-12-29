<template>
    <input :value="modelValue" @input="updateInput" type="text" class="input" />
</template>

<script>
export default {
    name: 'MyInput',
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
        },
    },
};
</script>

<style scoped>
.input {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid teal;
    caret-color: teal;
}
</style>
