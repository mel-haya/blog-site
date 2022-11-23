
import Vue from 'vue'
import Vuex from 'vuex'
import { postsCollection, getUser } from '@/firebase'
import { onSnapshot, query, where } from 'firebase/firestore'

Vue.use(Vuex)

// Create a new store instance.
export const store = new Vuex.Store({
  state () {
    return {
      posts: [],
	  draft: {
		  title: '',
		  caption: '',
		  contentItems: []
	  },
      unsub : null,
	  user: null
    }
  },
  actions: {
    startListner(context) {
		let q = query(postsCollection, where("author", "==", getUser().uid));
     context.state.unsubscribe = onSnapshot( q, (snapshot) => {
        context.state.posts = snapshot.docs
		.map(doc => ({id: doc.id, ...doc.data()}));
      })
    },
    stopListner(context) {
        context.state.unsubscribe();
      }
   },
   getters: {
	getPostById: (state) => (id) => {
    	return state.posts.find(post => post.id === id)
	},
	checkDraft: (state) => {
		return !!state.draft.title;
	},
	getUser: (state) => {
		return state.user;
	},
	getPosts: (state) => {
		return state.posts;
	}
   },
   mutations: {
		updateDraft(state, draft) {
			state.draft = draft;
		},
		emptyDraft(state) {
			state.draft = {
				title: '',
				caption: '',
				contentItems: []
			};
		},
		updateUser(state){
			state.user = getUser();
		}
	}
})