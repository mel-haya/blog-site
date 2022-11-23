
import Vue from 'vue'
import Vuex from 'vuex'
import { postsCollection } from '@/firebase'
import { onSnapshot } from 'firebase/firestore'

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
      unsub : null
    }
  },
  actions: {
    startListner(context) {
     context.state.unsubscribe = onSnapshot( postsCollection, (snapshot) => {
        context.state.posts = snapshot.docs
		.filter(doc => doc.id !== 'draft')
		.map(doc => ({id: doc.id, ...doc.data()}));
      })
    },
    stopListner(context) {
        context.state.unsubscribe();
      },
   },
   getters: {
	getPostById: (state) => (id) => {
    	return state.posts.find(post => post.id === id)
	},
	checkDraft: (state) => {
		return !!state.draft.title;
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
		}
	}
})