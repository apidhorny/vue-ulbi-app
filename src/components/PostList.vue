<template>
    <div v-if="posts.length">
        <h3>Post List</h3>
        <transition-group name="post-list">
            <PostItem
                @removePost="$emit('removePost', post)"
                class="post-item"
                v-for="post in posts"
                :key="post.id"
                :post="post"
            />
        </transition-group>
    </div>
    <div v-else class="no-posts">No New Posts!</div>
</template>

<script>
import PostItem from '@/components/PostItem.vue';

export default {
    name: 'PostList',
    components: {
        PostItem,
    },
    props: {
        posts: {
            type: Array,
            default: () => ({}),
            required: true,
        },
    },
};
</script>

<style scoped>
.post-item {
    margin-top: 0.5rem;
}
.no-posts {
    color: rgb(175, 36, 36);
    text-align: center;
    font-size: 2rem;
}
.post-list-item {
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.4s;
}
.post-list-enter,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.post-list-move {
    transition: transform 0.4s;
}
</style>
