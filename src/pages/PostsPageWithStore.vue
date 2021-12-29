<template>
    <div>
        <h1>Page of posts</h1>
        <div class="app__btns">
            <div class="app__btns--left">
                <MyButton class="mg-r-1" @click="fetchPosts">Fetch Posts</MyButton>
                <MyButton @click="openModal">Create Post</MyButton>
            </div>
            <MySelect :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
        </div>
        <MyInput v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search..." />

        <hr />

        <MyModal v-model:show="modalVisible">
            <PostForm @createPost="createPost" />
        </MyModal>
        <PostList @removePost="removePost" :posts="sortedAndSeacrchedPosts" v-if="!isPostLoading" />
        <div class="loading-posts" v-else>Loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div ref="observer" class="observer"></div> -->
        <!-- <div class="page-wrapper">
            <div
                v-for="pageNumber in totalPages"
                :key="pageNumber"
                class="page"
                :class="{
                    'current-page': currentPage === pageNumber,
                }"
                @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div> -->
    </div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import axios from 'axios';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    name: 'PostsPage',
    components: {
        PostList,
        PostForm,
    },
    data() {
        return {
            modalVisible: false,
        };
    },
    methods: {
        ...mapMutations({
            setCurrentPage: 'post/setCurrentPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts',
        }),

        createPost(post) {
            this.posts.push(post);
            this.modalVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
        openModal() {
            this.modalVisible = true;
        },

        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },
    },
    computed: {
        ...mapState({
            posts: (state) => state.post.posts,
            isPostLoading: (state) => state.post.isPostLoading,
            selectedSort: (state) => state.post.selectedSort,
            searchQuery: (state) => state.post.searchQuery,
            currentPage: (state) => state.post.currentPage,
            postOnPage: (state) => state.post.postOnPage,
            totalPages: (state) => state.post.totalPages,
            sortOptions: (state) => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPost: 'post/sortedPost',
            sortedAndSeacrchedPosts: 'post/sortedAndSeacrchedPosts',
        }),
    },
    watch: {
        currentPage() {
            this.fetchPosts();
        },
    },
    mounted() {
        this.fetchPosts();
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
