<template>
    <div>
        <form class="form" @submit.prevent>
            <h3>Create Post</h3>
            <MyInput v-focus v-model.trim="post.title" type="text" placeholder="Title" />
            <MyInput v-model.trim="post.description" type="text" placeholder="Description" />

            <MyButton @click="createPost">Create</MyButton>
        </form>
    </div>
</template>

<script>
export default {
    name: 'PostForm',

    data() {
        return {
            post: {
                title: '',
                description: '',
            },
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('createPost', this.post);
            this.post = {
                title: '',
                description: '',
            };
        },
    },
};
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
}
</style>
