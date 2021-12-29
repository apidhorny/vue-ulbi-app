import axios from 'axios';

export const postModule = {
    state() {
        return {
            posts: [],
            isPostLoading: false,
            selectedSort: '',
            sortOptions: [
                { value: 'title', name: 'By Title' },
                { value: 'description', name: 'By Description' },
            ],
            searchQuery: '',
            currentPage: 0,
            postOnPage: 10,
            totalPages: 0,
        };
    },
    getters: {
        sortedPost(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]);
            });
        },
        sortedAndSeacrchedPosts(state, getters) {
            return getters.sortedPost.filter((post) =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostLoading = bool;
        },
        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
    },
    actions: {
        async fetchPosts({ state, commit }) {
            try {
                commit('setLoading', true);
                state.searchQuery = '';
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.currentPage,
                            _limit: state.postOnPage,
                        },
                    });
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.postOnPage));
                    commit('setPosts', response.data);
                    commit('setLoading', false);
                }, 500);
            } catch (e) {
                console.log(e);
            }
        },

        async loadMorePosts({ state, commit }) {
            try {
                commit('setCurrentPage', state.currentPage + 1);
                commit('setSearchQuery', '');
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.currentPage,
                            _limit: state.postOnPage,
                        },
                    });
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.postOnPage));
                    commit('setPosts', [...state.posts, ...response.data]);
                    commit('setLoading', false);
                }, 500);
            } catch (e) {
                console.log(e);
            }
        },
    },
    namespaced: true,
};
