const baseUri = "http://jsonplaceholder.typicode.com/todos"

Vue.createApp({
    data() {
        return {
            posts: [],
            error: null,
            userId: ""
        }
    },
    async created() {
        // created() is a life cycle method, not an ordinary method
        // created() is called automatically when the page is loaded
        console.log("created method called")
        this.helperGetPosts(baseUri)
    },
    methods: {
        cleanList() {
            this.posts = []
            this.error = null
        },
        async getByUserId(uid) {
            if (uid == null || uid == "") {
                this.error = "No user id ...."
                this.posts = []
            } else {
                const uri = baseUri + "?userId=" + uid
                console.log("getByUserId: " + uri)
                this.helperGetPosts(uri)
            }
        },
        async helperGetPosts(uri) {
            try {
                const response = await axios.get(uri)
                this.posts = await response.data
                this.error = null
            } catch (ex) {
                this.posts = []
                this.error = ex.message
            }
        }
    }
}).mount("#app")