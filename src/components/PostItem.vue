<template>
    <div class="post">
        <div>
            <div><strong>Id: </strong>{{ post.id }}</div>
            <div><strong>Title: </strong>{{ post.title }}</div>
            <div><strong>Description: </strong> {{ post.description }}</div>
        </div>
        <div class="post__btns">
            <MyButton class="mg-r-1" @click="$router.push(`/posts/${post.id}`)">Open</MyButton>
            <MyButton @click="$emit('removePost', post)">Delete</MyButton>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostItem',

    props: {
        post: {
            type: Object,
            default: () => ({}),
            required: true,
        },
    },
};
</script>

<style scoped>
.post {
    padding: 1rem;
    border: 2px solid teal;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__btns {
    display: flex;
}
.mg-r-1 {
    margin-right: 1rem;
}
</style>
