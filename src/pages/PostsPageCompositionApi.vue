<template>
    <div>
        <h1>Page of posts</h1>
        <MyInput v-model="searchQuery" placeholder="Search..." v-focus />
        <div class="app__btns">
            <MyButton>
                Create Post
            </MyButton>
            <MySelect v-model="selectedSort" :options="sortOptions" />
        </div>
        <MyModal v-model:show="dialogVisible">
            <PostForm />
        </MyModal>
        <PostList :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
        <div v-else>Loading...</div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

import { usePosts } from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';
export default {
    components: {
        PostList,
        PostForm,
    },
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                { value: 'title', name: 'By Title' },
                { value: 'body', name: 'By Description' },
            ],
        };
    },
    setup(props) {
        const { posts, totalPages, isPostsLoading } = usePosts(10);
        const { sortedPosts, selectedSort } = useSortedPosts(posts);
        const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);
        return {
            posts,
            totalPages,
            isPostsLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts,
        };
    },
};
</script>

<style>
h1 {
    margin-bottom: 1rem;
}
hr {
    margin-bottom: 0.5rem;
    border: 2px solid teal;
}
.loading-posts {
    color: rgb(175, 36, 36);
    text-align: center;
    font-size: 2rem;
}
.app__btns {
    display: flex;
    justify-content: space-between;
}
.mg-r-1 {
    margin-right: 1rem;
}
.page-wrapper {
    display: flex;
    margin-top: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
}
.page {
    border: 1px solid teal;
    border-radius: 15%;
    padding: 1rem;
    margin: 5px 5px;
    cursor: pointer;
}
.current-page {
    border: 1px solid rgb(0, 75, 75);
    background: teal;
    color: #fff;
}
.observer {
    height: 2rem;
    background: teal;
}
</style>
