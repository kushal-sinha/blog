import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer'
// import jsonServer from '../../api/jsonServer';
const blogReducer = (state, action) => {
    switch (action.type) {
        case 'add_blogpost':
            return [...state, { id: Math.floor(Math.random() * 99999), title: action.payload.title, content: action.payload.content }];
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload);
        case 'edit_blogpost':
            return state.map((blogPost) => {
                if (blogPost.id === action.payload.id) {
                    return action.payload;
                }
                return blogPost;
            })
        case 'get_blogpost':
            return action.payload;


        default:
            return state;
    }
};
const getBlogPost = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogpost');

        dispatch({ type: 'get_blogpost', payload: response.data });
    }
}
const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogpost', { title, content });
        if (callback) {
            callback();
        }
    };
};

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogpost/${id}`);
        dispatch({ type: 'delete_blogpost', payload: id });

    };
};

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogpost/${id}`, { title, content });
        dispatch({ type: 'edit_blogpost', payload: { id, title, content } });
        if (callback) {
            callback();
        }
    };
};



export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
    []
);
