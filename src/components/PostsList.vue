<script>
import axios from "axios";

const endpoint = "http://localhost:3000/posts";
const imagesEndpoint = "http://127.0.0.1:3000/images/";

export default {
    name: "PostsList",
    data: ()=> ({
        posts: []
    }),
    methods: {
        async fetchPosts(){
            try {
                const res = await axios.get(endpoint);
                this.posts = res.data.data;
            } catch (err){
                console.error(err)
            }
        },
        async fetchImage(imageName, slug){
            try {
                const res = await axios.get(`${imagesEndpoint}${imageName}`, { responseType: 'blob' });
                //const image = res.data
                const image = URL.createObjectURL(res.data)
                console.log('URL dell\'immagine:', image)

                const imgElement = document.getElementById(slug);
                imgElement.src = image
            } catch (err){
                console.error(err)
            }
        }
    },
    created (){
        this.fetchPosts()
    }
}
</script>

<template>
    <ul>
        <li v-for="post in posts" :key="post.id" class="card p-3 my-3">
            <h4>{{ post.title }}</h4>
            <p>{{ post.content }}</p>
            <img :src="fetchImage(post.image, post.slug)" :alt="post.title" :id="post.slug">
            <div><strong>Categoria: </strong><span>{{ post.category.name }}</span></div>
            <div><strong>Tags:</strong>
                <span v-for="(tag,index) in post.tags" :key="index">
                    {{ tag.name }}<span v-if="index != (post.tags.length - 1)">, </span>
                </span>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>

 ul {
    list-style-type: none;

 }

</style>