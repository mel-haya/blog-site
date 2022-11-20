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
                    <td><router-link :to="`/post/${post.id}`" >{{post.title}}</router-link></td>
                    <td>{{post.createdAt}}</td>
                    <td>
                        <button class="btn btn-warning me-2" @click="editPost(post.id)">Edit</button>
                        <button class="btn btn-danger" @click="deleteConfirm = post.id">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div id="del-confirm-container" v-if="deleteConfirm">
            <div id="del-confirm-body"  class="p-2 text-secondary bg-dark">
                <p>This will delete this post.</p>   
                <div class="d-flex justify-content-end gap-2">
                    <button class="btn btn-danger" @click="deletePost(deleteConfirm)">Delete</button>
                    <button class="btn btn-secondary" @click="deleteConfirm = ''">Cancel</button>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
    import { deletePost } from "@/firebase"
    import { ref } from "vue"

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
                return this.$store.state.posts.map((post) => {
                    return {
                        ...post,
                        createdAt: this.toDate(post.createdAt)
                    }
                });
            }
        },
        methods: {
            editPost(id){
                this.$router.push(`/post/edit/${id}`);
            },
            async deletePost(id){
                await deletePost(id);
                this.deleteConfirm = ''
            },
            toDate(timestamp){
                return new Date(timestamp.seconds * 1000);
            }
        },
        setup(){
            const deleteConfirm = ref(null);
            return {
                deleteConfirm
            }
        }
    }
</script>

<style lang="scss" scoped>
#del-confirm-container{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
}

#del-confirm-body{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    width:300px;
    height:100px;
    border-radius:10px;
    padding:10px;
}

</style>