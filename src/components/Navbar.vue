<template>
    <div class="navbar">
        <MyButton @click="$router.push('/')">Main</MyButton>
        <div class="navbar__btns">
            <MyButton @click="$router.push('/posts')" class="mg-r-1">Posts</MyButton>
            <MyButton @click="$router.push('/about')" class="mg-r-1">About</MyButton>
            <MyButton @click="$router.push('/store')" class="mg-r-1">Store VUEX</MyButton>
            <MyButton @click="$router.push('/composition')">Composition API</MyButton>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
};
</script>

<style scoped>
.navbar {
    display: flex;
    height: 50px;
    background-color: teal;
    box-shadow: 2px 2px 4px gray;
    align-items: center;
    padding: 0 2rem;
}
.navbar__btns {
    margin-left: auto;
}
.mg-r-1 {
    margin-right: 1rem;
}
</style>
