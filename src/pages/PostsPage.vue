<template>
    <div>
        <h1>Page of posts</h1>
        <div class="app__btns">
            <div class="app__btns--left">
                <MyButton class="mg-r-1" @click="fetchPosts">Fetch Posts</MyButton>
                <MyButton @click="openModal">Create Post</MyButton>
            </div>
            <MySelect v-model="selectedSort" :options="sortOptions" />
        </div>
        <MyInput v-focus v-model="searchQuery" placeholder="Search..." />

        <hr />

        <MyModal v-model:show="modalVisible">
            <PostForm @createPost="createPost" />
        </MyModal>
        <PostList @removePost="removePost" :posts="sortedAndSeacrchedPosts" v-if="!isPostLoading" />
        <div class="loading-posts" v-else>Loading...</div>
        <!-- <div v-intersection="loadMorePosts" class="observer"></div> -->
        <!-- <div ref="observer" class="observer"></div> -->
        <div class="page-wrapper">
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
        </div>
    </div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import axios from 'axios';

export default {
    name: 'PostsPage',
    components: {
        PostList,
        PostForm,
    },
    data() {
        return {
            posts: [],
            modalVisible: false,
            isPostLoading: false,
            selectedSort: '',
            sortOptions: [
                { value: 'title', name: 'By Title' },
                { value: 'description', name: 'By Description' },
            ],
            searchQuery: '',
            currentPage: 1,
            postOnPage: 3,
            totalPages: 0,
        };
    },
    methods: {
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
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                this.searchQuery = '';
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.currentPage,
                            _limit: this.postOnPage,
                        },
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.postOnPage);
                    this.posts = response.data;
                    this.isPostLoading = false;
                }, 500);
            } catch (e) {
                alert('Alert!');
            } finally {
                // this.isPostLoading = false;
            }
        },
        // ALL POST LOADING
        // async loadMorePosts() {
        //     try {
        //         this.currentPage += 1;
        //         this.searchQuery = '';
        //         setTimeout(async () => {
        //             const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        //                 params: {
        //                     _page: this.currentPage,
        //                     _limit: this.postOnPage,
        //                 },
        //             });
        //             this.totalPages = Math.ceil(response.headers['x-total-count'] / this.postOnPage);
        //             this.posts = [...this.posts, ...response.data];
        //             this.isPostLoading = false;
        //         }, 500);
        //     } catch (e) {
        //         alert('Alert!');
        //     }
        // },
        // /ALL POST LOADING

        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },
    },
    computed: {
        sortedPost() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
            });
        },
        sortedAndSeacrchedPosts() {
            return this.sortedPost.filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    },
    watch: {
        currentPage() {
            this.fetchPosts();
        },
    },
    mounted() {
        this.fetchPosts();
        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0,
        // };
        // const callback = (entries, observer) => {
        //     if (entries[0].isIntersecting && this.currentPage < this.totalPages) {
        //         this.loadMorePosts();
        //     }
        // };
        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);
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
