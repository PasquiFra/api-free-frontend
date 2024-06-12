<script>
import axios from "axios";
import {store} from '../data/store.js';

const endpoint = "http://localhost:3000/posts";
const getCatEndpoint = "http://localhost:3000/categories";

export default {
    name: "CreatePostPage",
    data: ()=>({
        post : {
            title: "",
            content: "",
            image: "",
            published: null,
            categoryId: null,
            tags: [],
            userId: 1 
        },
        newTag: "",
        categories: [],
        imageFile: null,
        ...store
    }),
    methods: {
        async submitPost(){
            try {
                const formData = new FormData();
                if (this.imageFile) {
                    formData.append('image', this.imageFile);
                }
                formData.append('title', this.post.title);
                formData.append('content', this.post.content);
                formData.append('published', this.post.published);
                formData.append('categoryId', this.post.categoryId);
                formData.append('userId', this.post.userId);
                this.post.tags.forEach(tag => formData.append('tags[]', tag.name))
                const res = await axios.post(endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                this.$router.push('/')
            }
            catch (err){
                console.error(err)
            }
        },
        async getCategories(){
            try {
                const res = await axios.get(getCatEndpoint);
                this.categories = res.data;
            }
            catch (err){
                console.error(err)
            }
        },
        addTag() {
            const tagToAdd = this.newTag;
            if(tagToAdd.trim() != ''){
                this.post.tags.push({ name: tagToAdd.trim() });
            }
            this.newTag = ''
        },
        handleImageUpload(event) {
            this.imageFile = event.target.files[0];
        }
    },
    computed: {

    },
    created (){
        this.getCategories()
    }
}
</script>

<template>
    <h2 class="text-center">Crea un post</h2>
    <section id="create-post" class="card bg-secondary p-4">
        <form @submit.prevent="submitPost">
            <div class="mb-3">
                <label for="post-title" class="form-label">Title</label>
                <input type="text" class="form-control" id="post-title" placeholder="Inserisci un titolo:" v-model="post.title" required>
            </div>
            <div class="mb-3">
                <label for="post-content" class="form-label">Content</label>
                <input type="text" class="form-control" id="post-content" placeholder="Inserisci una descrizione:" v-model="post.content" required>
            </div>
            <div class="input-group mb-3">
                <input type="file" class="form-control" id="imageUpload" @change="handleImageUpload">
                <label class="input-group-text" for="imageUpload">Carica un'immagine</label>
            </div>
<!-- 
            <div class="mb-3">
                <label for="post-img" class="form-label">Image</label>
                <input type="text" class="form-control" id="post-img" placeholder="Inserisci il nome dell'immagine" v-model="post.image">
            </div> -->
            <div>
                <label for="post-category" class="form-label w-100">Categories</label>
                <select class="form-select" id="post-category" v-model="post.categoryId" required>
                    <option selected>Seleziona una categoria</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.name}}</option>
                </select>
            </div>
            <div class="input-group my-2">
                <label for="tag-field" class="form-label w-100">Tags</label>
                <input type="text" class="form-control" placeholder="Inserisci un tag" id="tag-field" v-model="newTag">
                <button type="button" @click="addTag()">Aggiungi</button>
                <div class="w-100 my-2">
                    <span v-for="(tag, index) in post.tags" :key="index" class="badge m-1">{{ tag.name }}</span>
                </div>
            </div>
            <div class="form-check mt-3">
                <input v-model="post.published" class="form-check-input" type="radio" name="published" id="publish-post" :value="true">
                <label class="form-check-label" for="publish-post">
                    Pubblica
                </label>
            </div>
            <div class="form-check">
                <input v-model="post.published" class="form-check-input" type="radio" name="published" id="publish-post-2" :value="false">
                <label class="form-check-label" for="publish-post-2">
                    Bozza
                </label>
            </div>
            <button type="submit" class="btn btn-success my-3">Invia Post</button>
        </form>
    </section>

</template>

<style lang="scss" scoped>
    .badge{
        background-color: goldenrod;
    }
</style>