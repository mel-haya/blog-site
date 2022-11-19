<template>
    <div class="h-100">
        <h1 class="text-secondary my-3 ">Dashboard</h1>
        <router-link to="/post/create" class="btn p-4 bg-success text-light">
            Create new post
        </router-link>
        <table class="table">
            <thead class="text-primary">
                <tr>
                    <th>Title</th>
                    <th>Created at</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="text-secondary">
                <tr v-for="post in posts" :key="post.id">
                    <td>{{post.title}}</td>
                    <td>{{post.created_at}}</td>
                    <td>
                        <button class="btn btn-warning me-2" @click="editPost(post.id)">Edit</button>
                        <button class="btn btn-danger" @click="deletePost(post.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { deletePost } from "@/firebase"

    export default {
        name: 'DashboardView',
        mounted: function() {
            this.$store.dispatch('startListner');
        },
        destroyed: function() {
            this.$store.dispatch('stopListner');
        },
        computed:{
            posts(){
                return this.$store.state.posts
            }
        },
        methods: {
            editPost(id){
                this.$router.push(`/post/edit/${id}`);
            },
            async deletePost(id){
                await deletePost(id);
            }
        }
    }
</script>

<style lang="scss" scoped>


</style>